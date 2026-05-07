import { motion } from 'motion/react';
import { Download, Monitor, Settings, HardDrive, Package, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/context';

export default function KaliSection() {
  const { t } = useLanguage();
  const icons = [Download, Monitor, Settings, HardDrive];

  const categories = [
    { name: t('kali.cat_recon') || 'Information Gathering', tools: ['Nmap', 'theHarvester', 'Dmitry', 'Ike-scan'] },
    { name: t('kali.cat_vuln') || 'Vulnerability Analysis', tools: ['Nikto', 'Nmap', 'Unix-privesc-check'] },
    { name: t('kali.cat_web') || 'Web Application Analysis', tools: ['Burp Suite', 'sqlmap', 'WhatWeb', 'WafW00f'] },
    { name: t('kali.cat_exploit') || 'Exploitation Tools', tools: ['Metasploit', 'BeEF', 'Searchsploit'] }
  ];

  return (
    <section id="kali" className="bg-black/20 w-full !max-w-none border-y border-white/5">
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={14} /> Security OS
            </div>
            <h2 className="text-5xl font-mono font-bold mb-8 text-white uppercase tracking-tighter">
              {t('kali.title') || 'KALI LINUX KURSU'}
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium">
              {t('kali.desc')}
            </p>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((step, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyber-green/30 hover:bg-white/[0.07] transition-all group"
                  >
                    <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center text-cyber-green group-hover:scale-110 transition-transform shadow-lg border border-white/5">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 uppercase tracking-tight">KALI STEP {step}</h4>
                      <p className="text-sm text-gray-500 font-medium">{t('kali.step_desc')}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-cyber-green/20 blur-[120px] opacity-20 -z-10 animate-pulse" />
            <div className="bg-cyber-gray border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative shadow-black/50">
              <div className="bg-black/60 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold">KALI-LINUX-OS</span>
              </div>
              
              <div className="p-8 space-y-10">
                {categories.map((cat, i) => (
                  <div key={cat.name} className="animate-in fade-in slide-in-from-bottom" style={{ animationDelay: `${i * 150}ms` }}>
                    <h3 className="text-cyber-green font-mono text-[10px] mb-4 flex items-center gap-2 uppercase tracking-[0.25em] font-black opacity-80">
                      <Package size={14} /> {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {cat.tools.map(tool => (
                        <span key={tool} className="px-4 py-2 rounded-xl bg-black/60 text-gray-400 border border-white/5 text-xs font-mono hover:text-cyber-green hover:border-cyber-green/50 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,65,0.05)]">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 mt-6 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-gray-600 italic bg-black/20 p-3 rounded-lg border border-white/5 font-medium">
                    <span className="text-cyber-green font-bold">[*]</span> {t('kali.warning') || 'Xəbərdarlıq: Yalnız qanuni məqsədlər üçün istifadə edin.'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
