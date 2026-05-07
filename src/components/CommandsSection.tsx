import { motion } from 'motion/react';
import { LINUX_COMMANDS } from '../constants/content';
import { Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/context';

export default function CommandsSection({ limit }: { limit?: number }) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const displayCommands = limit ? LINUX_COMMANDS.slice(0, limit) : LINUX_COMMANDS;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="commands" className="bg-black/30 w-full !max-w-none border-t border-white/5">
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 text-white uppercase tracking-tighter">
            {t('commands.title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t('commands.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCommands.map((cmd, idx) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              viewport={{ once: true }}
              className="bg-cyber-gray border border-white/5 rounded-2xl p-6 hover:border-cyber-green/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(cmd.name)}
                  className="p-2 bg-white/5 hover:bg-cyber-green hover:text-black rounded-lg transition-all border border-white/5"
                >
                  {copied === cmd.name ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-cyber-green/10 rounded-xl flex items-center justify-center text-cyber-green border border-cyber-green/20 shadow-lg shadow-cyber-green/5">
                  <Terminal size={20} />
                </div>
                <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyber-green transition-colors">{cmd.name}</h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                {cmd.description[language as 'az' | 'en' | 'ru']}
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-gray-600 font-bold tracking-widest italic animate-pulse">bash_cmd</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-cyber-green/40"></div>
                  <div className="w-1 h-1 rounded-full bg-cyber-green/20"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
