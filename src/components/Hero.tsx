import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Languages, MonitorPlay, Zap, ArrowRight, Play, Pause, RefreshCw, Volume2, Maximize2, Cpu } from 'lucide-react';
import { RoutePath } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
  navigateTo: (path: RoutePath) => void;
}

const MOCK_VIDEOS = [
  {
    title: "AI_Speech_Recognition_Demo.mkv",
    speaker: "Dr. Elena Vance (Speech Tech Lead)",
    duration: "02:45",
    speechLines: [
      { text: "Welcome back! Today we are introducing real-time offline transcription.", translation: "¡Bienvenidos de nuevo! Hoy presentamos la transcripción offline en tiempo real.", timestamp: "0:02" },
      { text: "Our application connects speech tracking to VLC with zero audio latency.", translation: "Nuestra aplicación conecta el seguimiento de voz a VLC con cero latencia de audio.", timestamp: "0:08" },
      { text: "All processes run completely locally on your hardware using Vosk models.", translation: "Todos los procesos se ejecutan completamente local en su hardware usando modelos Vosk.", timestamp: "0:14" },
      { text: "No voice logs or media data are ever sent to remote cloud servers.", translation: "Nunca se envían registros de voz ni datos multimedia a servidores remotos.", timestamp: "0:20" },
      { text: "Let's demonstrate translation sync across active PySide6 interfaces now.", translation: "Demostremos ahora la sincronización de traducción en interfaces activas de PySide6.", timestamp: "0:26" }
    ]
  },
  {
    title: "VLC_Subtitles_Sync_Test.avi",
    speaker: "Mark Fletcher (Lead Developer)",
    duration: "01:15",
    speechLines: [
      { text: "Testing VLC playback pipeline for automatic SRT subtitle injection.", translation: "Probando el canal de reproducción VLC para la inyección automática de subtítulos SRT.", timestamp: "0:01" },
      { text: "VLC is now playing. Notice the dual-engine sync tracking the playhead.", translation: "VLC se está reproduciendo. Observe el seguimiento de sincronización del motor dual.", timestamp: "0:06" },
      { text: "Frame accurate offsets can be adjusted dynamically in the PySide6 controller.", translation: "Los desfases precisos de fotogramas se pueden ajustar dinámicamente en el controlador PySide6.", timestamp: "0:11" },
      { text: "This secures offline caption display even during active scrubbing.", translation: "Esto asegura la visualización offline de subtítulos incluso durante el desplazamiento activo.", timestamp: "0:17" }
    ]
  }
];

export default function Hero({ navigateTo }: HeroProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [targetLang, setTargetLang] = useState<'es' | 'en'>('es'); // Spanish translation vs original English
  const [selectedOS, setSelectedOS] = useState<'win' | 'mac' | 'linux'>('win');

  const activeVideo = MOCK_VIDEOS[activeVideoIdx];

  // Loop through lines in mockup player
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentLineIdx((prev) => (prev + 1) % activeVideo.speechLines.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, activeVideoIdx, activeVideo.speechLines.length]);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      
      // Reset success notice after 5 seconds
      setTimeout(() => setDownloadSuccess(false), 5000);
      
      // Programmatically trigger a mock file download of the desktop application bundle
      const element = document.createElement("a");
      const file = new Blob(["Mock Premium Live Caption Player Desktop Application Executable - Vosk & VLC Subtitle Sync Pipeline Bundle"], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Premium_Live_Caption_Player_${selectedOS === 'win' ? 'Windows_x64.exe' : selectedOS === 'mac' ? 'macOS_ARM64.dmg' : 'Linux_x86_64.AppImage'}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 transition-colors duration-300 dark:bg-[#0F172A] sm:py-28" id="hero-section">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)] animate-pulse duration-1000" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(156,163,175,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(156,163,175,0.025)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Text Left Column */}
          <div className="text-center lg:col-span-5 lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/50 px-3 py-1 text-xs font-semibold text-sky-700 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-sky-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Offline AI Speech Tracking & Translation</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-5xl lg:leading-[1.15]">
              Real-time Subtitles synced with{' '}
              <span className="text-gradient">
                VLC & MPV
              </span>{' '}
              Offline
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-slate-300 sm:text-lg">
              Premium Live Caption Player tracks speech audio locally using the high-performance Vosk engine and automatically synchronizes translated live subtitles into your native VLC player. Built with PySide6 for local power.
            </p>

            {/* OS selection */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-1">
              <span className="text-xs font-mono text-gray-400 dark:text-slate-400 mr-2">Target OS:</span>
              <button 
                onClick={() => setSelectedOS('win')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedOS === 'win' 
                    ? 'bg-sky-100 text-sky-800 dark:bg-white/10 dark:text-sky-300 ring-1 ring-sky-400/30' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 dark:text-slate-400'
                }`}
              >
                Windows (x64)
              </button>
              <button 
                onClick={() => setSelectedOS('mac')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedOS === 'mac' 
                    ? 'bg-sky-100 text-sky-800 dark:bg-white/10 dark:text-sky-300 ring-1 ring-sky-400/30' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 dark:text-slate-400'
                }`}
              >
                macOS (Apple Silicon)
              </button>
              <button 
                onClick={() => setSelectedOS('linux')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedOS === 'linux' 
                    ? 'bg-sky-100 text-sky-800 dark:bg-white/10 dark:text-sky-300 ring-1 ring-sky-400/30' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 dark:text-slate-400'
                }`}
              >
                Linux (.AppImage)
              </button>
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl accent-gradient px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95 focus:outline-none transition-all disabled:opacity-85"
                id="main-download-button"
              >
                {downloading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Packaging installer...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                    <span>Download App {selectedOS === 'win' ? '.exe' : selectedOS === 'mac' ? '.dmg' : '.AppImage'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTo('pricing')}
                className="flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-all"
                id="hero-view-pricing"
              >
                <span>View $1/Month Premium</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Download Status Notification */}
            {downloadSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400 text-xs font-medium flex items-center gap-2"
                id="download-success-notice"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Success! Your desktop installer package has started downloading. Run the offline wizard to initialize Vosk.</span>
              </motion.div>
            )}

            {/* Compliance Note */}
            <div className="mt-8 flex flex-col gap-2 border-t border-gray-200/85 pt-6 dark:border-white/10">
              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-gray-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 text-sky-400" />
                  100% Offline Speech tracking
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Languages className="h-3.5 w-3.5 text-indigo-400" />
                  No Cloud Data Pipelines
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Right Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-white/5 glow-blue" id="pyside-mockup-container">
              {/* PySide6 Desktop Frame Window Header */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-2.5 dark:border-white/10 dark:bg-[#0F172A]/50 rounded-t-xl">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-2 font-mono text-xs font-medium text-gray-400 dark:text-slate-400">PySide6 Qt6 Interface Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md accent-gradient px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm shadow-sky-500/10">
                    VLC Sync Pipeline Active
                  </span>
                </div>
              </div>

              {/* Simulation Workspace */}
              <div className="bg-gray-950 p-4 rounded-b-xl aspect-video relative overflow-hidden flex flex-col justify-between">
                
                {/* Media Player Header */}
                <div className="flex items-center justify-between z-10 bg-black/45 backdrop-blur-xs p-2 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2">
                    <MonitorPlay className="h-4 w-4 text-sky-400" />
                    <span className="text-xs font-mono font-bold text-white max-w-[200px] truncate">{activeVideo.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setActiveVideoIdx((prev) => (prev + 1) % MOCK_VIDEOS.length);
                        setCurrentLineIdx(0);
                      }}
                      className="text-[10px] bg-white/10 hover:bg-white/20 text-white rounded px-2 py-1 font-mono flex items-center gap-1 transition-all"
                      id="mockup-switch-video"
                    >
                      <RefreshCw className="h-2.5 w-2.5" />
                      Switch File
                    </button>
                    <span className="text-[10px] font-mono text-gray-400">{activeVideo.duration}</span>
                  </div>
                </div>

                {/* Subtitle Visualizer Area */}
                <div className="my-auto flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="text-gray-500 font-mono text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-ping" />
                    Speech Tracked (Speaker: {activeVideo.speaker})
                  </div>
                  
                  {/* Speech waveform graphics */}
                  <div className="h-10 flex items-center justify-center gap-0.5 mb-4">
                    {[10, 40, 20, 60, 80, 50, 90, 70, 30, 85, 95, 45, 10, 60, 40, 75, 20, 80, 15, 30].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={isPlaying ? { height: [`${h*0.3}%`, `${h}%`, `${h*0.3}%`] } : { height: '15%' }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                        className="w-1 rounded-full bg-gradient-to-t from-sky-400 to-indigo-500"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  {/* Dynamic captions box */}
                  <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg max-w-lg w-full transition-all duration-300 min-h-[90px] flex flex-col justify-center">
                    {/* Source English */}
                    <p className="text-sm font-medium text-white mb-2 leading-relaxed">
                      "{activeVideo.speechLines[currentLineIdx].text}"
                    </p>
                    
                    {/* Target Translation */}
                    <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 justify-center">
                      <Languages className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                      <p className="text-xs font-semibold text-sky-300 leading-relaxed">
                        {activeVideo.speechLines[currentLineIdx].translation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media Control Toolbar */}
                <div className="mt-auto bg-black/60 backdrop-blur-xs p-2 rounded-lg border border-white/5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded accent-gradient text-white transition-all focus:outline-none"
                      id="mockup-play-toggle"
                    >
                      {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                    <span className="text-[10px] font-mono text-gray-300">Vosk Offline Speech Tracker v2.4</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-gray-400 mr-1">Subtitle Target:</span>
                      <button 
                        onClick={() => setTargetLang('es')}
                        className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono transition-all ${
                          targetLang === 'es' ? 'bg-sky-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'
                        }`}
                        id="target-es"
                      >
                        ES (Spanish)
                      </button>
                      <button 
                        onClick={() => setTargetLang('en')}
                        className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono transition-all ${
                          targetLang === 'en' ? 'bg-sky-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'
                        }`}
                        id="target-en"
                      >
                        EN (Original)
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                      <Volume2 className="h-3.5 w-3.5" />
                      <div className="w-12 h-1 bg-white/20 rounded">
                        <div className="w-9/12 h-full bg-sky-500 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle Sync Offset Display */}
                <div className="absolute bottom-16 right-4 bg-slate-900/95 backdrop-blur-md rounded border border-sky-500/30 px-2 py-1 flex items-center gap-1.5 z-10 shadow">
                  <Zap className="h-3 w-3 text-yellow-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-sky-200">Sync Offset: -0.05s (Dual-VLC Engine)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
