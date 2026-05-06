import { motion } from 'motion/react';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10 bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-cyber-green p-1.5 rounded-lg">
                <Shield className="text-black" size={24} />
              </div>
              <span className="text-2xl font-mono font-bold tracking-tighter text-white">
                CYBER<span className="text-cyber-green">VAULT</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Bizim məqsədimiz kiber təhlükəsizlik biliklərini hər kəs üçün əlçatan etmək və gələcəyin peşəkar hackerlərini yetişdirməkdir.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyber-green hover:text-cyber-green transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Naviqasiya</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#about" className="hover:text-cyber-green transition-colors">Haqqında</a></li>
              <li><a href="#tools" className="hover:text-cyber-green transition-colors">Alətlər</a></li>
              <li><a href="#commands" className="hover:text-cyber-green transition-colors">Komandalar</a></li>
              <li><a href="#" className="hover:text-cyber-green transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Dəstək</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-cyber-green transition-colors">İstifadə Şərtləri</a></li>
              <li><a href="#" className="hover:text-cyber-green transition-colors">Məxfilik Siyasəti</a></li>
              <li><a href="#" className="hover:text-cyber-green transition-colors">Əlaqə</a></li>
              <li><a href="#" className="hover:text-cyber-green transition-colors">Sual-Cavab</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-600 text-xs font-mono uppercase tracking-widest">
          <p>© 2026 CYBERVAULT ACADEMY. Bütün hüquqlar qorunur.</p>
          <p>Created with passion for Cybersecurity</p>
        </div>
      </div>
    </footer>
  );
}
