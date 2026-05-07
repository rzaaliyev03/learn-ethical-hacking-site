import { motion } from 'motion/react';
import { KALI_TOOLS } from '../constants/content';
import { Cpu, ChevronRight, Lock } from 'lucide-react';
import { useState } from 'react';
import ToolDetailModal from './ToolDetailModal';
import { useLanguage } from '../i18n/context';

interface ToolsGridProps {
  user: any;
  onAuth: () => void;
  limit?: number;
}

export default function ToolsGrid({ user, onAuth, limit }: ToolsGridProps) {
  const { t, language } = useLanguage();
  const [selectedTool, setSelectedTool] = useState<any>(null);

  // Filter teaser tools and potentially limit them
  const initialTools = user ? KALI_TOOLS : KALI_TOOLS.filter(t => t.isTeaser);
  const visibleTools = limit ? initialTools.slice(0, limit) : initialTools;

  return (
    <section id="tools" className="px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-mono font-bold flex items-center gap-4 text-white uppercase">
              <span className="text-cyber-green text-2xl">01 //</span>
              {t('tools.teaser_title')}
            </h2>
            <p className="text-gray-500 mt-2">{t('tools.teaser_desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="cyber-card group"
            >
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                 <img 
                  src={`https://picsum.photos/seed/${tool.id}/800/600`}
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-black/60 text-cyber-green px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest border border-cyber-green/20 backdrop-blur-md">
                    {tool.category}
                  </span>
                </div>
              </div>

              <div className="p-6 relative z-20">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyber-green transition-colors">{tool.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-medium">
                  {tool.description[language]}
                </p>

                <button 
                  onClick={() => setSelectedTool(tool)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-cyber-green hover:text-black transition-all rounded-xl font-bold uppercase tracking-wider text-xs border border-white/10 hover:border-cyber-green group-hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]"
                >
                  {t('hero.cta_learn') || 'Təlimatı Gör'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}

          {!user && !limit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cyber-card flex flex-col items-center justify-center p-8 text-center bg-cyber-green/5 border-dashed border-cyber-green/20"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyber-green/10 flex items-center justify-center text-cyber-green mb-6 animate-pulse">
                <Lock size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('tools.more_title') || '+17 Digər Alət'}</h3>
              <p className="text-gray-500 text-sm mb-6">
                {t('tools.more_cta')}
              </p>
              <button 
                onClick={onAuth}
                className="bg-white text-black px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-cyber-green transition-all"
              >
                {t('auth.register')}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <ToolDetailModal 
        tool={selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </section>
  );
}
