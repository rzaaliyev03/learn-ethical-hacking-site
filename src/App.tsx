import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KaliSection from './components/KaliSection';
import ToolsGrid from './components/ToolsGrid';
import CommandsSection from './components/CommandsSection';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import ProfileSidebar from './components/ProfileSidebar';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useLanguage } from './i18n/context';

export default function App() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'home' | 'tools' | 'commands'>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        });
      } else {
        setUserData(null);
        setActiveView('home'); 
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const handleNav = (view: 'home' | 'tools' | 'commands') => {
    if (!user && view !== 'home') {
      setIsAuthOpen(true);
      return;
    }
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen bg-cyber-dark overflow-x-hidden">
      <div className="scan-line" />
      
      <Navbar 
        onAuth={() => setIsAuthOpen(true)} 
        onAdmin={() => setIsAdminOpen(true)} 
        onProfile={() => setIsProfileOpen(true)}
        onNavigate={handleNav}
        activeView={activeView}
      />
      
      <main className="pt-10">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onAuth={() => setIsAuthOpen(true)} />
              <KaliSection />
              
              <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 mb-12">
                   <h2 className="text-3xl font-mono font-bold text-white uppercase tracking-tighter">
                     {t('tools.teaser_title') || 'ALƏTLƏRƏ BAXIŞ'}
                   </h2>
                </div>
                <ToolsGrid user={user} onAuth={() => setIsAuthOpen(true)} limit={3} />
              </div>

              {!user && (
                <section className="pb-32 px-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto bg-gradient-to-r from-cyber-green/10 to-cyber-blue/5 border border-cyber-green/20 rounded-3xl p-12 text-center relative overflow-hidden"
                  >
                    <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 tracking-tight text-white uppercase">
                      {t('hero.cta_title') || 'VİRTUAL LABORATORİYAYA QOŞUL'}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
                      {t('hero.cta_desc') || 'Praktiki dərslərimizlə real hücumları təhlükəsiz mühitdə sınaqdan keçir.'}
                    </p>
                    <button 
                      onClick={() => setIsAuthOpen(true)}
                      className="bg-white text-black px-10 py-4 rounded-xl font-black text-lg hover:bg-cyber-green transition-all hover:scale-105 uppercase tracking-widest"
                    >
                      {t('auth.register')}
                    </button>
                  </motion.div>
                </section>
              )}
            </motion.div>
          )}

          {activeView === 'tools' && user && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-12"
            >
              <ToolsGrid user={user} onAuth={() => {}} />
            </motion.div>
          )}

          {activeView === 'commands' && user && (
            <motion.div
              key="commands"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-12"
            >
              <CommandsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} userData={userData} />
    </div>
  );
}
