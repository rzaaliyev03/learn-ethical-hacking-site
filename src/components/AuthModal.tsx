import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../i18n/context';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password.length < 6) throw new Error(t('auth.error_weak_pass') || 'Şifrə çox zəifdir');
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName,
          role: 'user',
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (err: any) {
      console.error("Auth process error:", err);
      let localizedError = err.message;
      if (err.code === 'auth/email-already-in-use') localizedError = t('auth.email_exists');
      if (err.code === 'auth/weak-password') localizedError = t('auth.error_weak_pass');
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') localizedError = t('auth.error_invalid');
      
      setError(localizedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-md bg-cyber-gray border border-white/10 p-10 rounded-3xl shadow-2xl shadow-cyber-green/5"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-mono font-bold mb-8 text-cyber-green uppercase tracking-tighter">
              {isLogin ? (t('nav.login') || 'GİRİŞ') : (t('auth.register') || 'QEYDİYYAT')}
            </h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-xs font-mono mb-6 animate-pulse">
                [SYSTEM_ERROR] // {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t('profile.username') || "Username"}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:border-cyber-green outline-none transition-all text-white"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:border-cyber-green outline-none transition-all text-white"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:border-cyber-green outline-none transition-all text-white"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-green text-black font-black py-4 rounded-xl hover:bg-cyber-green/90 transition-all uppercase tracking-widest mt-6 disabled:opacity-50 shadow-lg shadow-cyber-green/10"
              >
                {loading ? t('auth.loading') : (isLogin ? (t('nav.login') || 'Giriş') : (t('auth.register') || 'Qeydiyyat'))}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-gray-500 hover:text-cyber-green transition-colors font-bold uppercase tracking-widest"
              >
                {isLogin
                  ? (t('auth.register') || "Qeydiyyatdan keç")
                  : (t('nav.login') || "Giriş et")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
