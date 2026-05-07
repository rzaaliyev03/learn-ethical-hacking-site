import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Shield, Moon, Sun, Globe, Camera } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { auth, db } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}

export default function ProfileSidebar({ isOpen, onClose, userData }: ProfileSidebarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [newDisplayName, setNewDisplayName] = useState(userData?.displayName || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.displayName) {
      setNewDisplayName(userData.displayName);
    }
  }, [userData]);

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: newDisplayName
      });
      alert(t('profile.save_success') || 'Profil yeniləndi');
    } catch (err) {
      console.error(err);
      alert('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-cyber-gray border-r border-white/5 z-50 p-6 flex flex-col shadow-2xl shadow-cyber-green/5"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-mono font-bold text-cyber-green uppercase tracking-tighter">
                {t('nav.profile')}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center text-cyber-green text-3xl font-bold mb-4 shadow-lg shadow-cyber-green/10">
                  {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button className="absolute bottom-6 right-0 p-2 bg-cyber-green text-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Camera size={16} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{userData?.displayName}</h3>
              <p className="text-gray-500 text-sm font-mono">{userData?.email}</p>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto">
              {/* Profile Edit */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-500 mb-1.5 block">
                    {t('profile.username')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:border-cyber-green outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="w-full bg-cyber-green/20 border border-cyber-green/30 text-cyber-green py-2.5 rounded-lg text-xs font-bold hover:bg-cyber-green hover:text-black transition-all disabled:opacity-50"
                >
                  {loading ? '...' : t('profile.save')}
                </button>
              </div>

              {/* Language Selector */}
              <div className="pt-6 border-t border-white/5">
                <label className="text-[10px] uppercase font-mono text-gray-500 mb-3 block flex items-center gap-2">
                  <Globe size={12} /> {t('nav.language') || 'Dil'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['az', 'en', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`py-2 rounded-lg text-xs font-bold font-mono transition-all uppercase ${
                        language === lang
                          ? 'bg-cyber-green text-black'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appearance */}
              <div className="pt-6 border-t border-white/5">
                <label className="text-[10px] uppercase font-mono text-gray-500 mb-3 block flex items-center gap-2">
                  <Shield size={12} /> {t('nav.settings') || 'Tənzimləmələr'}
                </label>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-sm text-gray-300 flex items-center gap-2">
                     {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                     {isDarkMode ? t('profile.dark_mode') : t('profile.light_mode')}
                  </span>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-cyber-green' : 'bg-gray-700'}`}
                  >
                    <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDarkMode ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
               <div className="bg-cyber-green/5 border border-cyber-green/10 rounded-2xl p-4">
                  <p className="text-[10px] font-mono text-cyber-green leading-relaxed text-center opacity-60">
                    Sistem versiyası: v2.4.0-STABLE<br/>
                    Status: Təhlükəsizlik Auditi Aktiv
                  </p>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
