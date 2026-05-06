import { motion } from 'motion/react';
import { Terminal, ShieldAlert, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-green/30 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-cyber-green/10 border border-cyber-green/30 px-4 py-1.5 rounded-full mb-8">
          <Zap className="text-cyber-green" size={16} />
          <span className="text-cyber-green text-xs font-mono font-bold uppercase tracking-[0.2em]">Sistem Onlayndır</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-mono font-bold mb-6 tracking-tighter leading-none">
          GƏLƏCƏYİN <br />
          <span className="text-cyber-green inline-block mt-2">HACKER OLMAG</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed">
          Kiber təhlükəsizlik dünyasına mükəmməl giriş. Ən müasir alətlər, 
          real hücum ssenariləri və peşəkar komandalarla öz biliyini artır.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#tools"
            className="bg-cyber-green text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 uppercase"
          >
            Alətləri Kəşf Et
            <Terminal size={20} />
          </a>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-2 uppercase">
            Təhlükəsizlik Hesabatı
            <ShieldAlert size={20} />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.8 }}
        className="mt-20 w-full max-w-5xl px-4"
      >
        <div className="bg-black/80 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-hidden whitespace-nowrap">
          <div className="flex gap-4 animate-marquee">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-cyber-green">
                [SYSTEM] Scanning network... Connected to node_0{i+1}... Encryption: AES-256... Status: SECURE
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
