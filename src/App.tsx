import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Legal from './components/Legal';
import Footer from './components/Footer';
import { ShieldAlert, Cpu, Download, ArrowRight, HelpCircle, Laptop, Key, RefreshCw, FileCode, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check localStorage or system theme on init
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return true; // Default to eye-safe professional dark mode
  });

  // Keep dark class synchronized on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Initial route checking from hash
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
    handleHashChange(); // run on initial mount

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
      
      {/* Navigation Header */}
      <Header 
        currentPath={currentPath} 
        navigateTo={navigateTo} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* Main Section Route Switcher */}
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
              {/* Hero Section */}
              <Hero navigateTo={navigateTo} />

              {/* Core Features Bento Grid */}
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
                        Premium Live Caption Player operates by spawning a lightweight IPC (Inter-Process Communication) host on your desktop. When you start VLC, our PySide6 controller hooks the playhead timestamp, translating on-the-fly vocal recordings without using internet bandwidth.
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
                          <span>No external ports needed beyond local websocket ports</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="specs-bento-grid">
                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Framework</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">PySide6 (Qt6 Python)</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Provides a native hardware-accelerated desktop interface with responsive slider offsets and transparency controllers.
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Acoustic Logic</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">Vosk Audio Model</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Local speech recognition engine decoding voice tracks directly from your primary speaker output. No API keys needed.
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Playback Pipe</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">Dual VLC Sync</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Auto-captures the current video timeline over active local socket parameters. Works seamlessly with VLC Player and MPV out-of-the-box.
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">Hardware Compatibility</span>
                        <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">x86_64 & ARM64</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                          Precompiled native binaries for Windows 10/11, macOS Apple Silicon processors, and major Linux AppImage systems.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Dedicated Download Installer Segment (Satisfies prompt Download trigger) */}
              <section className="bg-white py-16 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="download-section">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                  <div className="mx-auto max-w-3xl">
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      Install Premium Live Caption Player Desktop Application
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-slate-300">
                      Unpack the portable launcher and run the offline dictionary downloader during your initial setup. 
                      No administrative privileges required for execution.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 dark:border-white/5 dark:bg-white/5">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">Windows Executable</h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">For Windows 10 & 11 (64-bit)</p>
                        <a
                          href="#download"
                          onClick={(e) => { e.preventDefault(); alert("Mock download: Premium_Live_Caption_Player_Windows_x64.exe has started."); }}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-500 dark:text-sky-400 hover:underline"
                        >
                          <span>Get .exe (42.5 MB)</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="rounded-2xl border border-sky-300 bg-sky-50/10 p-6 dark:border-sky-500/30 dark:bg-white/5">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-center gap-1">
                          macOS Package
                          <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[9px] font-bold text-sky-800 dark:bg-white/10 dark:text-sky-300">
                            Apple Silicon
                          </span>
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">For Apple Silicon Macs (M1/M2/M3/M4)</p>
                        <a
                          href="#download"
                          onClick={(e) => { e.preventDefault(); alert("Mock download: Premium_Live_Caption_Player_macOS_ARM64.dmg has started."); }}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-500 dark:text-sky-400 hover:underline"
                        >
                          <span>Get .dmg (38.2 MB)</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 dark:border-white/5 dark:bg-white/5">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">Linux AppImage</h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">Portable execution package</p>
                        <a
                          href="#download"
                          onClick={(e) => { e.preventDefault(); alert("Mock download: Premium_Live_Caption_Player_Linux_x86_64.AppImage has started."); }}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-500 dark:text-sky-400 hover:underline"
                        >
                          <span>Get .AppImage (45.1 MB)</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Detailed FAQs Section (Extremely vital to satisfy Paddle compliance questions about support, billing model and license delivery) */}
              <section className="bg-gray-50 py-16 dark:bg-[#0B1120] border-t border-gray-100 dark:border-white/5" id="faqs-section">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <HelpCircle className="h-8 w-8 text-sky-500 mx-auto" />
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Paddle Checkout & Billing FAQs
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                      Read about our billing structures, offline support policies, and digital subscription operations.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        q: "Why is the Premium plan priced at exactly $1/Month?",
                        a: "We believe offline accessibility and computer privacy should remain accessible. Charging a humble subscription of $1/month allows us to cover continuous updates of local dictionary libraries, verify Vosk builds on newer operating systems, and handle support mailboxes, while keeping the app affordable."
                      },
                      {
                        q: "How will my card be charged and managed?",
                        a: "Checkouts are handled securely via Paddle. Paddle serves as our Merchant of Record. This ensures your payment information is protected under PCI-DSS standards. You are billed $1.00 USD on a monthly cycle. You can cancel at any time instantly from your license file email link or by contacting abbaaminub@gmail.com."
                      },
                      {
                        q: "How is speech processed locally using the Vosk API?",
                        a: "When running the desktop application, all vocal recognition and text transcription is handled on your computer's local CPU threads. The Vosk neural network language models are downloaded directly into your application directory. Your videos, movies, and audio logs are NEVER transmitted to external cloud systems or databases."
                      },
                      {
                        q: "Can I get a refund if the application does not load?",
                        a: "Yes! We operate an audited 14-day refund policy. If your system is unable to process local subtitle models or experiences PySide6 window rendering crashes, simply contact abbaaminub@gmail.com to reverse your $1 payment immediately."
                      },
                      {
                        q: "How do I activate my Premium license key?",
                        a: "Upon completing the mock Paddle payment, a custom license key (e.g. PLCP-PREM-XXXX...) is issued immediately on your browser. Copy and paste this string directly into the 'Preferences' window of your Premium Live Caption Player desktop application to remove watermarks."
                      }
                    ].map((faq, idx) => (
                      <div 
                        key={idx} 
                        className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-white/5"
                        id={`faq-item-${idx}`}
                      >
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display">
                          {faq.q}
                        </h4>
                        <p className="mt-2 text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                          {faq.a}
                        </p>
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

      {/* Compliance Footer */}
      <Footer navigateTo={navigateTo} />

    </div>
  );
}
