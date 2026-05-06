import { motion } from 'motion/react';
import { HACKING_TOOLS, Tool } from '../data/hackingData';
import { Cpu, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ToolDetailModal from './ToolDetailModal';

export default function ToolsGrid() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <section id="tools">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-mono font-bold flex items-center gap-4">
            <span className="text-cyber-green text-2xl">01 //</span>
            HÜCUM ALƏTLƏRİ
          </h2>
          <p className="text-gray-500 mt-2">Ən güclü hacking alətləri və onların istifadə qaydaları.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {HACKING_TOOLS.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="cyber-card group"
          >
            <div className="relative h-52 overflow-hidden">
               <img 
                src={`https://picsum.photos/seed/${tool.id}/800/600`}
                alt={tool.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/80 text-cyber-green px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-widest border border-cyber-green/30">
                  {tool.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {tool.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-cyber-green">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-gray-300">Tələblər</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tool.requirements?.slice(0, 2).map(req => (
                        <span key={req} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 italic">
                          {req}
                        </span>
                      ))}
                      {tool.requirements && tool.requirements.length > 2 && (
                        <span className="text-[10px] text-gray-500">+{tool.requirements.length - 2} daha</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTool(tool)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-cyber-green hover:text-black transition-all rounded-lg font-bold uppercase tracking-wider text-sm border border-white/10 hover:border-cyber-green"
              >
                Təlimatı Gör
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ToolDetailModal 
        tool={selectedTool} 
        onClose={() => setSelectedTool(null)} 
      />
    </section>
  );
}
