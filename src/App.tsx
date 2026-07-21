import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Legal from './components/Legal';
import Footer from './components/Footer';
import { Cpu, Download, ArrowRight, HelpCircle, Laptop, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ── Download URLs ──────────────────────────────────────────────────────────────
const DIRECT_DOWNLOAD_URL =
  "https://1drv.ms/u/c/a841fdcc94dc137d/IQCW-aZ-20wKSrUH0pBH53llAaucKHp8S3hrACPphkUF51Q?e=JfFnlK&download=1";
// Opens Microsoft Store app directly on Windows; falls back to web store on other OS
const MS_STORE_PROTOCOL  = "ms-windows-store://pdp/?productid=9MWH9VJ9QR2R";
const MS_STORE_WEB_URL   = "https://apps.microsoft.com/detail/9MWH9VJ9QR2R";
// ──────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return true;
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
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

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Try to open the Store app directly; fall back to web store page
  const handleStoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // On Windows, the ms-windows-store:// protocol opens the Store app instantly.
    // On Mac/Linux visiting the web store URL is the right fallback.
    const isWindows = navigator.userAgent.toLowerCase().includes('windows');
    if (isWindows) {
      window.location.href = MS_STORE_PROTOCOL;
      // Fallback to web after 2 s in case the Store app doesn't open
      setTimeout(() => {
        window.open(MS_STORE_WEB_URL, '_blank', 'noopener,noreferrer');
      }, 2000);
    } else {
      window.open(MS_STORE_WEB_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#0F172A] dark:text-gray-100 flex flex-col justify-between">

      <Header currentPath={currentPath} navigateTo={navigateTo} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">

          {currentPath === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

              <Hero navigateTo={navigateTo} />
              <Features />

              {/* Technical Specifications */}
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
                        Premium Live Caption Player operates by spawning a lightweight IPC host on your desktop. When you start VLC, our PySide6 controller hooks the playhead timestamp, translating on-the-fly vocal recordings without using internet bandwidth.
                      </p>
                      <div className="space-y-3 font-mono text-xs text-gray-500 dark:text-slate-400">
                        <div className="flex items-center gap-2.5"><CheckCircle className="h-4 w-4 text-sky-500" /><span>Vosk API offline model (Eng acoustic matrix: ~45MB)</span></div>
                        <div className="flex items-center gap-2.5"><CheckCircle className="h-4 w-4 text-sky-500" /><span>Timing offsets support manual calibration via sliders</span></div>
                        <div className="flex items-center gap-2.5"><CheckCircle className="h-4 w-4 text-sky-500" /><span>No external ports needed beyond local websocket ports</span></div>
                      </div>
                    </div>
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="specs-bento-grid">
                      {[
                        { label: 'Framework',            title: 'PySide6 (Qt6 Python)',  body: 'Provides a native hardware-accelerated desktop interface with responsive slider offsets and transparency controllers.' },
                        { label: 'Acoustic Logic',       title: 'Vosk Audio Model',      body: 'Local speech recognition engine decoding voice tracks directly from your primary speaker output. No API keys needed.' },
                        { label: 'Playback Pipe',        title: 'Dual VLC Sync',         body: 'Auto-captures the current video timeline over active local socket parameters. Works seamlessly with VLC and MPV.' },
                        { label: 'Hardware Compatibility', title: 'x86_64 & ARM64',      body: 'Precompiled native binaries for Windows 10/11, macOS Apple Silicon processors, and major Linux AppImage systems.' },
                      ].map((card) => (
                        <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-white/5">
                          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">{card.label}</span>
                          <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mt-1">{card.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{card.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Download Section ─────────────────────────────────────────── */}
              <section className="bg-white py-16 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="download-section">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                  <div className="mx-auto max-w-3xl">
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                      Install Premium Live Caption Player
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-slate-300">
                      Choose your preferred install method for Windows, or wait for macOS and Linux builds coming soon.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">

                      {/* ── Windows card — two install options ── */}
                      <div className="rounded-2xl border-2 border-sky-400 dark:border-sky-500 bg-white dark:bg-slate-900 p-6 shadow-lg relative">
                        {/* Popular badge */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full accent-gradient px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide shadow">
                          Windows
                        </div>

                        <h3 className="font-bold text-sm text-gray-900 dark:text-white mt-2">Windows 10 & 11 (64-bit)</h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1 mb-4">Two ways to install:</p>

                        {/* Option 1 — Microsoft Store */}
                        <a
                          href={MS_STORE_WEB_URL}
                          onClick={handleStoreClick}
                          className="flex items-center gap-2 w-full rounded-xl bg-[#0067b8] hover:bg-[#005a9e] text-white px-3 py-2.5 text-xs font-bold transition-all mb-2"
                          id="ms-store-button"
                        >
                          {/* Microsoft Store icon (SVG) */}
                          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.5 2H2v9.5h9.5V2zm1 0v9.5H22V2h-9.5zm-1 10.5H2V22h9.5v-9.5zm1 0V22H22v-9.5h-9.5z"/>
                          </svg>
                          <span className="text-left leading-tight">
                            Get it from<br />
                            <span className="text-[11px] font-extrabold">Microsoft Store</span>
                          </span>
                        </a>

                        {/* Divider */}
                        <div className="flex items-center gap-2 my-2">
                          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">or</span>
                          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                        </div>

                        {/* Option 2 — Direct .exe */}
                        <a
                          href={DIRECT_DOWNLOAD_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 w-full rounded-xl border border-sky-400 dark:border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 px-3 py-2.5 text-xs font-bold transition-all"
                          id="direct-download-button"
                        >
                          <Download className="h-4 w-4 shrink-0" />
                          <span className="text-left leading-tight">
                            Direct download<br />
                            <span className="text-[11px] font-extrabold">Setup.exe (79.9 MB)</span>
                          </span>
                        </a>
                      </div>

                      {/* ── macOS card ── */}
                      <div className="rounded-2xl border border-sky-300 bg-sky-50/10 p-6 dark:border-sky-500/30 dark:bg-white/5">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-center gap-1">
                          macOS Package
                          <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[9px] font-bold text-sky-800 dark:bg-white/10 dark:text-sky-300">Apple Silicon</span>
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">For M1 / M2 / M3 / M4 Macs</p>
                        <button disabled className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gray-400 dark:text-slate-500 cursor-not-allowed">
                          <span>Coming Soon</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>

                      {/* ── Linux card ── */}
                      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 dark:border-white/5 dark:bg-white/5">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">Linux AppImage</h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">Portable — no install needed</p>
                        <button disabled className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gray-400 dark:text-slate-500 cursor-not-allowed">
                          <span>Coming Soon</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>

                    </div>

                    {/* Trust note */}
                    <p className="mt-6 text-[11px] text-gray-400 dark:text-slate-500 font-mono">
                      Microsoft Store version is auto-updated · Direct .exe is the same signed build hosted on OneDrive
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="bg-gray-50 py-16 dark:bg-[#0B1120] border-t border-gray-100 dark:border-white/5" id="faqs-section">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <HelpCircle className="h-8 w-8 text-sky-500 mx-auto" />
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Billing & Activation FAQs</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Read about our billing structures, offline support policies, and digital subscription operations.</p>
                  </div>
                  <div className="space-y-6">
                    {[
                      { q: "Why is the Premium plan priced at exactly $1/Month?", a: "We believe offline accessibility and computer privacy should remain accessible. Charging $1/month allows us to cover continuous updates of local dictionary libraries, verify Vosk builds on newer operating systems, and handle support mailboxes, while keeping the app affordable." },
                      { q: "How will my card be charged and managed?", a: "Checkouts are handled securely via Paystack and Paddle. Paddle serves as our Merchant of Record. Your payment information is protected under PCI-DSS standards. You are billed $1.00 USD on a monthly cycle and can cancel at any time by contacting tukurmuhammed902@gmail.com." },
                      { q: "How is speech processed locally using the Vosk API?", a: "All vocal recognition and text transcription is handled on your computer's local CPU threads. The Vosk neural network language models are bundled directly into your application. Your videos, movies, and audio logs are NEVER transmitted to external cloud systems or databases." },
                      { q: "Can I get a refund if the application does not load?", a: "Yes! We operate an audited 14-day refund policy. If your system is unable to process local subtitle models or experiences window rendering issues, simply contact tukurmuhammed902@gmail.com to reverse your $1 payment immediately." },
                      { q: "How do I activate my Premium license key?", a: "After completing payment via Paystack or Paddle, a custom license key is displayed on screen and sent to your email. Open the Premium Live Caption Player app, paste the key into the activation box that appears after the free trial expires, and click Activate Player." },
                    ].map((faq, idx) => (
                      <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-white/5" id={`faq-item-${idx}`}>
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
            <motion.div key="pricing" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Pricing />
            </motion.div>
          )}

          {(currentPath === 'terms' || currentPath === 'privacy' || currentPath === 'refunds') && (
            <motion.div key="legal" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Legal view={currentPath} navigateTo={navigateTo} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
