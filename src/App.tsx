import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KaliSection from './components/KaliSection';
import ToolsGrid from './components/ToolsGrid';
import CommandsSection from './components/CommandsSection';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-cyber-green/30 selection:text-cyber-green">
      <div className="scan-line" />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyber-green z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar onAuth={() => setIsAuthOpen(true)} onAdmin={() => setIsAdminOpen(true)} />
      
      <main>
        <Hero />
        
        <div className="space-y-32">
          <KaliSection />
          
          <ToolsGrid />
          
          <CommandsSection />

          {/* Educational Call-to-Action */}
          <section className="pb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyber-green/20 to-cyber-blue/10 border border-cyber-green/30 rounded-3xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <ShieldIcon className="w-64 h-64" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 tracking-tight">
                VİRTUAL LABORATORİYAYA QOŞUL
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10">
                Praktiki dərslərimizlə real hücumları təhlükəsiz mühitdə sınaqdan keçir. 
                Sertifikat əldə et və kiber müdafiəçi ol!
              </p>
              
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-cyber-green transition-all hover:scale-105 uppercase tracking-widest"
              >
                İndi Qeydiyyatdan Keç
              </button>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
