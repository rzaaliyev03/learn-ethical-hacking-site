import { motion } from 'motion/react';
import { Terminal, ShieldAlert, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { auth } from '../lib/firebase';

interface HeroProps {
  onAuth: () => void;
}

export default function Hero({ onAuth }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 overflow-hidden px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-green/20 blur-[160px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-cyber-green/10 border border-cyber-green/30 px-5 py-2 rounded-xl mb-10 shadow-lg shadow-cyber-green/5">
          <Zap className="text-cyber-green animate-pulse" size={16} />
          <span className="text-cyber-green text-[10px] font-mono font-black uppercase tracking-[0.3em]">SYSTEM_ONLINE // v2.4</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-mono font-bold mb-8 tracking-tighter leading-[0.9] text-white uppercase italic">
          {t('hero.title_top') || 'GƏLƏCƏYİN'}<br />
          <span className="text-cyber-green inline-block mt-4 not-italic">
            {t('hero.title_bottom') || 'HACKERİ OL'}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 leading-relaxed font-medium">
          {t('hero.desc')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={() => {
              const el = document.getElementById('kali');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-cyber-green text-black px-10 py-4 rounded-xl font-black text-lg hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-all flex items-center gap-3 uppercase tracking-tighter"
          >
            {t('hero.cta_learn')}
            <Terminal size={22} />
          </button>
          {!auth.currentUser && (
            <button 
              onClick={onAuth}
              className="group bg-white/5 border border-white/10 px-10 py-4 rounded-xl font-black text-lg transition-all flex items-center gap-3 uppercase tracking-tighter hover:bg-white/[0.08] hover:border-white/20 text-white"
            >
              {t('auth.register')}
              <ShieldAlert size={22} className="group-hover:text-cyber-green transition-colors" />
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="mt-24 w-full max-w-5xl"
      >
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono text-[10px] overflow-hidden whitespace-nowrap backdrop-blur-md">
          <div className="flex gap-10 animate-marquee uppercase font-bold tracking-[0.2em]">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-cyber-green/60">
                <span className="text-white">[{new Date().toLocaleTimeString()}]</span> ACCESS GRANTED... NODE_0{i+1}_LINKED... ENCRYPT_AES_256... AUDITPASS...
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
