import { motion } from 'motion/react';
import { COMMON_COMMANDS } from '../data/hackingData';
import { Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CommandsSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="commands" className="bg-black/30 w-full !max-w-none">
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-mono font-bold mb-4">
            ƏN ÇOX İSTİFADƏ OLUNAN <span className="text-cyber-green">KOMANDALAR</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Hacking və sistem idarəçiliyi üçün hər bir mütəxəssis tərəfindən hər gün istifadə olunan əsas terminal kodları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMMON_COMMANDS.map((cmd, idx) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-cyber-gray border border-white/5 rounded-2xl p-8 hover:border-cyber-green/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyber-green/10 rounded-xl flex items-center justify-center text-cyber-green">
                  <Terminal size={24} />
                </div>
                <h3 className="text-2xl font-bold font-mono">{cmd.name}</h3>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {cmd.description}
              </p>

              <div className="relative group">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyToClipboard(cmd.command)}
                    className="p-2 bg-white/10 hover:bg-cyber-green hover:text-black rounded-lg transition-all"
                  >
                    {copied === cmd.command ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <pre className="bg-black/50 p-6 rounded-xl font-mono text-sm text-cyber-green overflow-x-auto border border-white/5">
                  <code>$ {cmd.command}</code>
                </pre>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-gray-500 italic">Nümunə istifadə:</span>
                <code className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">{cmd.example}</code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
