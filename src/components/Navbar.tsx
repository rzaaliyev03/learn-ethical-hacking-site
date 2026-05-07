import { motion, AnimatePresence } from 'motion/react';
import { Shield, Layout, Terminal, Info, User, LogOut, Settings, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../i18n/context';

interface NavbarProps {
  onAuth: () => void;
  onAdmin: () => void;
  onProfile: () => void;
  onNavigate: (view: 'home' | 'tools' | 'commands') => void;
  activeView: string;
}

export default function Navbar({ onAuth, onAdmin, onProfile, onNavigate, activeView }: NavbarProps) {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    let unsubscribeSnapshot: (() => void) | null = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
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
    { id: 'home', label: t('nav.home'), icon: Info },
    { id: 'tools', label: t('nav.tools'), icon: Layout },
    { id: 'commands', label: t('nav.commands'), icon: Terminal },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-cyber-dark/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-cyber-green p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-cyber-green/20">
            <Shield className="text-black" size={24} />
          </div>
          <span className="text-xl font-mono font-bold tracking-tighter text-white">
            CYBER<span className="text-cyber-green">VAULT</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className={`flex items-center gap-2 text-xs font-bold transition-all uppercase tracking-widest ${
                activeView === item.id ? 'text-cyber-green' : 'text-gray-400 hover:text-cyber-green'
              }`}
            >
              <item.icon size={14} />
              {item.label}
              {activeView === item.id && (
                <motion.div layoutId="nav-underline" className="h-0.5 bg-cyber-green absolute -bottom-1 left-0 right-0" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/10">
             {['az', 'en', 'ru'].map(l => (
               <button 
                 key={l}
                 onClick={() => setLanguage(l as any)}
                 className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-all ${language === l ? 'bg-cyber-green text-black' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 {l}
               </button>
             ))}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {userData?.role === 'admin' && (
                <button
                  onClick={onAdmin}
                  className="p-2 text-gray-400 hover:text-cyber-green transition-colors bg-white/5 rounded-lg border border-white/5"
                >
                  <Settings size={18} />
                </button>
              )}
              <button 
                onClick={onProfile}
                className="flex items-center gap-2 px-4 py-2 bg-cyber-green/10 border border-cyber-green/30 rounded-xl hover:bg-cyber-green/20 transition-all group"
              >
                <span className="text-xs font-mono text-cyber-green font-bold">{userData?.displayName || 'USER'}</span>
                <div className="w-6 h-6 rounded bg-cyber-green/20 flex items-center justify-center text-[10px] font-bold text-cyber-green">
                   {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              <button 
                onClick={() => signOut(auth)}
                className="p-2 text-red-500/60 hover:text-red-500 transition-colors"
                title={t('nav.logout') || 'Çıxış'}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuth}
              className="flex items-center gap-2 bg-cyber-green text-black px-6 py-2 rounded-full text-xs font-black transition-all hover:scale-105 uppercase tracking-widest shadow-lg shadow-cyber-green/20"
            >
              <User size={16} />
              {t('nav.login')}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
