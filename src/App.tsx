import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Legal from './components/Legal';
import Footer from './components/Footer';
import { ShieldAlert, Cpu, Download, ArrowRight, HelpCircle, Laptop, Key, RefreshCw, FileCode, CheckCircle, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Direct Download & Store URLs
const UNIFIED_SETUP_DOWNLOAD_URL = "https://github.com/abbaaminu/caption-player/releases/download/v1.0.2/PremiumLiveCaptionPlayer_Setup_v1.1.exe";
const MS_STORE_WEB_URL = "https://apps.microsoft.com/detail/9MWH9VJ9QR2R";
const MS_STORE_DEEP_LINK = "ms-windows-store://pdp/?productid=9MWH9VJ9QR2R";

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/pricing') setCurrentPath('pricing');
      else if (hash === '#/terms') setCurrentPath('terms');
      else if (hash === '#/privacy') setCurrentPath('privacy');
      else if (hash === '#/refunds') setCurrentPath('refunds');
      else setCurrentPath('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: RoutePath) => {
    window.location.hash = `#/${path}`;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#0F172A] dark:text-gray-100 flex flex-col justify-between">
      
      <Header 
        currentPath={currentPath} 
        navigateTo={navigateTo} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPath === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero navigateTo={navigateTo} />
              <Features />

              {/* Technical Specifications Section */}
              <section className="bg-gray-50 py-16 dark:bg-[#0B1120] border-t border-gray-100 dark:border-white/5" id="tech-specs">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-5 space-y-6">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-white/10 dark:text-sky-300">
                        <Laptop className="h-3.5 w-3.5" />
                        <span>PySide6 Desktop Application Core</span>
                      </div>
                      <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        VLC Subtitles Timing Pipe & Offline Models
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                        Premium Live Caption Player operates by spawning a lightweight IPC host on your desktop. When you start VLC, our PySide6 controller hooks the playhead timestamp, translating vocal recordings on the fly.
                      </p>
                      
                      <div className="space-y-3 font-mono text-xs text-gray-500 dark:text-slate-400">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-sky-500" />
                          <span>Vosk API offline model (Eng acoustic matrix: ~45MB)</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-sky-500" />
                          <span>Timing offsets support manual calibration via sliders</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-sky-500" />
                          <span>100% private with no cloud servers</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Framework</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">PySide6 (Qt6 Python)</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Provides a native hardware-accelerated desktop interface with responsive sliders and transparency controllers.
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Acoustic Logic</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">Vosk Audio Model</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Local speech recognition engine decoding voice tracks directly from your primary speaker output.
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Playback Pipe</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">Dual VLC Sync</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Auto-captures current video timeline over local socket parameters. Works seamlessly with VLC and MPV.
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Hardware Compatibility</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">x86_64 & ARM64</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Precompiled native binaries for Windows 10/11 systems.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Dedicated Download Segment */}
              <section className="bg-white py-16 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="download-section">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                  <div className="mx-auto max-w-3xl">
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      Download Desktop Application
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-slate-300">
                      Get the latest build for Windows via direct download or through the Microsoft Store.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      {/* Option 1: Direct Windows Setup */}
                      <div className="rounded-2xl border border-sky-300 bg-sky-50/10 p-6 dark:border-sky-500/30 dark:bg-white/5 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Unified Windows Installer</h3>
                          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">Direct Executable (.exe) setup for Standard & Lifetime plans</p>
                        </div>
                        <a
                          href={UNIFIED_SETUP_DOWNLOAD_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition duration-200 shadow-sm"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Windows Setup (v1.0.2)</span>
                        </a>
                      </div>

                      {/* Option 2: Microsoft Store */}
                      <div className="rounded-2xl border border-emerald-300 bg-emerald-50/10 p-6 dark:border-emerald-500/30 dark:bg-white/5 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Microsoft Store</h3>
                          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">Official Windows Store app listing with automatic background updates</p>
                        </div>
                        <a
                          href={MS_STORE_WEB_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition duration-200 shadow-sm"
                        >
                          <Store className="h-4 w-4" />
                          <span>Get from Microsoft Store</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQs Section */}
              <section className="bg-gray-50 py-16 dark:bg-[#0B1120] border-t border-gray-100 dark:border-white/5" id="faqs-section">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <HelpCircle className="h-8 w-8 text-sky-500 mx-auto" />
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Checkout & Billing FAQs
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        q: "What is the difference between Monthly and Lifetime access?",
                        a: "Monthly access costs $1/month and can be canceled anytime. Lifetime access is a $19 one-time payment that gives you permanent access with no future recurring charges."
                      },
                      {
                        q: "How are payments processed?",
                        a: "Checkouts are handled securely via Paddle (our Merchant of Record). Payment info is strictly protected under PCI-DSS standards."
                      },
                      {
                        q: "How does local speech processing work?",
                        a: "All speech recognition runs locally using Vosk neural network models on your CPU. No audio or media data is ever uploaded to external cloud servers."
                      }
                    ].map((faq, idx) => (
                      <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-white/5">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display">{faq.q}</h4>
                        <p className="mt-2 text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {currentPath === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Pricing />
            </motion.div>
          )}

          {(currentPath === 'terms' || currentPath === 'privacy' || currentPath === 'refunds') && (
            <motion.div
              key="legal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Legal view={currentPath} navigateTo={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
