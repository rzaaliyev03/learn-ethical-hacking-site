import { motion } from 'motion/react';
import { KALI_GUIDE } from '../data/hackingData';
import { Download, Monitor, Settings, HardDrive, Package } from 'lucide-react';

export default function KaliSection() {
  const icons = [Download, Monitor, Settings, HardDrive];

  return (
    <section id="kali" className="bg-black/20 w-full !max-w-none">
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-mono font-bold mb-8">
              KALI <span className="text-cyber-green">LINUX</span> KURSU
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Kali Linux kiber təhlükəsizlik mütəxəssisləri üçün xüsusi olaraq hazırlanmış Debian əsaslı əməliyyat sistemidir. İçərisində 600-dən çox penetrasiya testi aləti var.
            </p>

            <div className="space-y-6">
              {KALI_GUIDE.installation.map((item, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-green/30 transition-all"
                  >
                    <div className="text-cyber-green">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.step}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-cyber-green/20 blur-3xl opacity-50 -z-10 animate-pulse" />
            <div className="bg-cyber-gray border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">kali-terminal</span>
              </div>
              
              <div className="p-8 space-y-8">
                {KALI_GUIDE.categories.map((cat, i) => (
                  <div key={cat.name}>
                    <h3 className="text-cyber-green font-mono text-xs mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Package size={14} /> {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.tools.map(tool => (
                        <span key={tool} className="px-3 py-1.5 rounded-lg bg-black text-gray-300 border border-white/5 text-sm font-mono hover:text-cyber-green hover:border-cyber-green/50 transition-all cursor-crosshair">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 mt-4 border-t border-white/5">
                  <p className="text-xs text-gray-600 italic">
                    * Qeyd: Kali Linux yalnız qanuni və təhsil məqsədləri üçün istifadə edilməlidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
