import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Trash2, ShieldCheck, ShieldAlert, X } from 'lucide-react';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: any;
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserProfile[];
      setUsers(usersList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore read error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleAdmin = async (uid: string, currentRole: string) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await updateDoc(doc(db, 'users', uid), { role: nextRole });
    } catch (err) {
      alert("Admin rolunu dəyişmək üçün kifayət qədər icazəniz yoxdur.");
    }
  };

  const deleteUser = async (uid: string) => {
    if (confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch (err) {
        alert("İstifadəçini silmək mümkün olmadı.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-5xl bg-cyber-gray border border-cyber-green/20 rounded-3xl overflow-hidden shadow-2xl h-[80vh] flex flex-col"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
          <div>
            <h2 className="text-3xl font-mono font-bold text-cyber-green">ADMİN PANEL</h2>
            <p className="text-gray-500 text-sm mt-1">Sistemdəki bütün istifadəçilərin idarə olunması</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin text-cyber-green">
                <ShieldCheck size={48} />
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="hidden md:grid grid-cols-4 px-6 text-xs font-mono font-bold text-gray-500 uppercase tracking-widest pb-2 border-b border-white/5">
                <span>İstifadəçi</span>
                <span>Email</span>
                <span>Status</span>
                <span className="text-right">Əməliyyatlar</span>
              </div>

              {users.map((user) => (
                <motion.div
                  key={user.uid}
                  layout
                  className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-0 items-start md:items-center bg-black/30 border border-white/5 rounded-xl p-4 md:p-4 md:px-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyber-green/10 flex items-center justify-center text-cyber-green shrink-0">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold truncate max-w-[150px]">{user.displayName}</span>
                      <span className="text-gray-500 text-xs md:hidden">{user.email}</span>
                    </div>
                  </div>
                  <span className="hidden md:block text-gray-400 text-sm truncate pr-4">{user.email}</span>
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <span className="text-[10px] text-gray-600 font-mono uppercase md:hidden">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      user.role === 'admin' ? 'bg-cyber-green/20 text-cyber-green' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 w-full md:w-auto border-t border-white/5 pt-2 md:border-0 md:pt-0">
                    <button
                      onClick={() => toggleAdmin(user.uid, user.role)}
                      className="flex-1 md:flex-none p-2 bg-white/5 md:bg-transparent hover:bg-cyber-green/10 text-gray-400 hover:text-cyber-green rounded-lg transition-all flex items-center justify-center gap-2"
                      title="Admin statusunu dəyiş"
                    >
                      <span className="md:hidden text-[10px] font-mono uppercase">Rolu Dəyiş</span>
                      {user.role === 'admin' ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                    </button>
                    <button
                      onClick={() => deleteUser(user.uid)}
                      className="flex-1 md:flex-none p-2 bg-red-500/5 md:bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span className="md:hidden text-[10px] font-mono uppercase">Sil</span>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
