import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { Tool } from '../data/hackingData';

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export default function ToolDetailModal({ tool, onClose }: ToolDetailModalProps) {
  if (!tool) return null;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-4xl bg-cyber-gray border border-cyber-green/20 rounded-3xl overflow-hidden shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-cyber-green hover:text-black p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto relative">
              <img
                src={`https://picsum.photos/seed/${tool.id}/800/1000`}
                alt={tool.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-gray via-transparent to-transparent lg:hidden" />
            </div>

            <div className="p-8 lg:p-12 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-cyber-green/10 text-cyber-green px-3 py-1 rounded text-xs font-mono font-bold uppercase border border-cyber-green/20">
                  {tool.category}
                </span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">{tool.title}</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-cyber-green font-mono uppercase text-sm mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Haqqında
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-cyber-green font-mono uppercase text-sm mb-3 flex items-center gap-2">
                    <ShieldAlert size={16} /> Necə İstifadə Olunur?
                  </h3>
                  <p className="text-gray-400 leading-relaxed italic">
                    {tool.howToUse}
                  </p>
                </div>

                <div>
                  <h3 className="text-cyber-green font-mono uppercase text-sm mb-3 flex items-center gap-2">
                    <Cpu size={16} /> Lazım Olanlar
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.requirements?.map(req => (
                      <li key={req} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                  <h4 className="text-white font-mono text-sm mb-4">İcra Komandaları:</h4>
                  <div className="space-y-4">
                    {tool.commands.map((cmd, i) => (
                      <div key={i}>
                        <code className="text-cyber-green text-sm">$ {cmd.cmd}</code>
                        <p className="text-xs text-gray-500 mt-1"># {cmd.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
