import { motion, AnimatePresence } from 'motion/react';
import { Shield, Layout, Terminal, Info, User, LogOut, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

interface NavbarProps {
  onAuth: () => void;
  onAdmin: () => void;
}

export default function Navbar({ onAuth, onAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // Clean up previous listener if it exists
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Canlı istifadəçi məlumatı yükləndi:", data);
            setUserData(data);
          }
        }, (error) => {
          console.error("Firestore onSnapshot error:", error);
        });
      } else {
        setUserData(null);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const navItems = [
    { label: 'Haqqında', href: '#about', icon: Info },
    { label: 'Kali Linux', href: '#kali', icon: Layout },
    { label: 'Alətlər', href: '#tools', icon: Layout },
    { label: 'Komandalar', href: '#commands', icon: Terminal },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-cyber-dark/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-cyber-green p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Shield className="text-black" size={24} />
          </div>
          <span className="text-xl font-mono font-bold tracking-tighter text-white">
            CYBER<span className="text-cyber-green">VAULT</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyber-green transition-colors uppercase tracking-widest"
            >
              <item.icon size={16} />
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {userData?.role === 'admin' && (
                <button
                  onClick={onAdmin}
                  className="p-2 text-gray-400 hover:text-cyber-green transition-colors"
                  title="Admin Panel"
                >
                  <Settings size={20} />
                </button>
              )}
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="text-xs font-mono text-cyber-green">{user.displayName || 'İstifadəçi'}</span>
                <button 
                  onClick={() => signOut(auth)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onAuth}
              className="flex items-center gap-2 bg-white/5 hover:bg-cyber-green hover:text-black border border-white/10 hover:border-cyber-green px-5 py-2 rounded-full text-sm font-bold transition-all uppercase tracking-widest"
            >
              <User size={16} />
              Giriş
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
