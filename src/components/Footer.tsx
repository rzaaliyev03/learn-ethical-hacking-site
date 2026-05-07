import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/context';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 pt-24 pb-12 bg-cyber-dark px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-cyber-green p-2 rounded-xl shadow-lg shadow-cyber-green/20">
                <Shield className="text-black" size={28} />
              </div>
              <span className="text-3xl font-mono font-bold tracking-tighter text-white">
                CYBER<span className="text-cyber-green">VAULT</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm mb-10 leading-relaxed text-lg font-medium">
               {t('footer.desc') || 'Kiber təhlükəsizlik dünyasına mükəmməl giriş. Gələcəyin mütəxəssislərini yetişdiririk.'}
            </p>
            <div className="flex items-center gap-5">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyber-green hover:text-cyber-green transition-all hover:-translate-y-1 shadow-lg"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px] font-mono opacity-60 italic">{t('nav.tools') || 'Alətlər'}</h4>
            <ul className="space-y-5 text-gray-500 text-sm font-bold">
              <li><a href="#kali" className="hover:text-cyber-green transition-colors">Kali Linux</a></li>
              <li><a href="#tools" className="hover:text-cyber-green transition-colors">Pentest Tools</a></li>
              <li><a href="#commands" className="hover:text-cyber-green transition-colors">Bash Terminal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px] font-mono opacity-60 italic">{t('nav.settings') || 'Ayarlar'}</h4>
            <ul className="space-y-5 text-gray-500 text-sm font-bold">
              <li><a href="#" className="hover:text-cyber-green transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-cyber-green transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-cyber-green transition-colors">Security Audit</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-gray-600 text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">
          <p>© 2026 CYBERVAULT ACADEMY. SECURED BY ENCRYPTION.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            STAY SAFE IN THE NET
          </p>
        </div>
      </div>
    </footer>
  );
}
