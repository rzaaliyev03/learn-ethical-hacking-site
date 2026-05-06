import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
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
        // Registration logic
        if (password.length < 6) throw new Error('Şifrə ən azı 6 simvol olmalıdır');
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });

        // Save to Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName,
            role: 'user',
            createdAt: serverTimestamp()
          });
        } catch (fsErr: any) {
          console.error("Firestore Error:", fsErr);
          // If Firestore fails, we still have the user in Auth but the document is missing.
          // This can happen if rules are not deployed or wrong.
          throw new Error("Hesab yaradıldı, lakin profil məlumatları bazaya yazıla bilmədi: " + fsErr.message);
        }
      }
      onClose();
    } catch (err: any) {
      console.error("Auth process error:", err);
      let localizedError = err.message;
      if (err.code === 'auth/email-already-in-use') localizedError = 'Bu email artıq istifadə olunub.';
      if (err.code === 'auth/weak-password') localizedError = 'Şifrə çox zəifdir.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') localizedError = 'Email və ya şifrə yanlışdır.';
      if (err.code === 'auth/operation-not-allowed') localizedError = 'Giriş üsulu aktiv deyil. Firebase-də Email/Password-u aktiv edin.';
      
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-cyber-gray border border-cyber-green/30 p-8 rounded-2xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-mono font-bold mb-6 text-cyber-green uppercase tracking-wider">
              {isLogin ? 'Terminal Giriş' : 'Yeni Hesab'}
            </h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg text-xs font-mono mb-4">
                [ERROR] {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Tam adınız"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-cyber-green outline-none transition-colors font-mono"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ünvanı"
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-cyber-green outline-none transition-colors font-mono"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrə"
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-cyber-green outline-none transition-colors font-mono"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-green text-black font-bold py-3 rounded-lg hover:bg-cyber-green/90 transition-colors uppercase tracking-widest mt-4 disabled:opacity-50"
              >
                {loading ? 'Yüklənir...' : (isLogin ? 'Giriş Et' : 'Qeydiyyatdan Keç')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-400 hover:text-cyber-green transition-colors"
              >
                {isLogin
                  ? "Hesabınız yoxdur? Qeydiyyatdan keçin"
                  : "Artıq hesabınız var? Giriş edin"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
