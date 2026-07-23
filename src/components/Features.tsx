import React from 'react';
import { Cpu, Film, Layers, Globe, ShieldAlert, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import heroBannerImg from '../assets/images/caption_player_hero_1784821770249.jpg';

export default function Features() {
  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-sky-500 dark:text-sky-400" />,
      title: "Offline AI Speech Tracking",
      description: "Utilizes advanced local speech models via the offline Vosk API. Instantly decodes audio tracks into raw text lines directly on your local system hardware with zero external dependencies.",
      badge: "Vosk Engine"
    },
    {
      icon: <Film className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />,
      title: "Dual-Engine VLC Playback Sync",
      description: "Direct real-time IPC connection with active video engines like VLC or MPV. Tracks active playheads with frame-accurate precision, injecting live subtitles perfectly on top of movies or keynotes.",
      badge: "VLC & MPV Sync"
    },
    {
      icon: <Layers className="h-6 w-6 text-sky-500 dark:text-sky-400" />,
      title: "Native PySide6 Desktop Client",
      description: "Built using high-performance Python Qt6 frameworks. Features clean desktop menus, customizable keyboard shortcuts, overlay transparency adjustments, and multi-threaded subtitle rendering pipelines.",
      badge: "PySide6 UI"
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />,
      title: "Local Multi-Language Translation",
      description: "Instantly translates tracked english vocal scripts into Spanish, French, German, Japanese, and more. Translation models are downloaded once during initial installation and operate fully offline.",
      badge: "Multi-Language"
    }
  ];

  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="features-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Engineered for Maximum Privacy & Desktop Performance
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-slate-300 sm:text-lg">
            Say goodbye to expensive subscription APIs and unsecure cloud voice loggers. Explore our fully local desktop subtitle framework.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 p-8 hover:border-sky-200 hover:bg-sky-50/10 transition-all duration-300 dark:border-white/5 dark:bg-white/5 dark:hover:border-sky-500/30 dark:hover:bg-white/10 group"
              id={`feature-card-${idx}`}
            >
              {/* Top Row */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200/50 dark:bg-slate-900 dark:border-white/5">
                    {feat.icon}
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-slate-300">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {feat.title}
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  {feat.description}
                </p>
              </div>

              {/* Checkmark List details for security context */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-500 dark:text-slate-400">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>No data collection</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>0ms external latency</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Visual Showcase Banner */}
        <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-900 p-6 shadow-2xl dark:border-white/10 overflow-hidden relative" id="feature-image-showcase">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                <span>Visual Subtitle Overlay</span>
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Smooth Floating Captions over Any Video
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                The desktop player renders transparent subtitle windows on top of VLC, MPV, or web video streams. Enjoy custom font sizing, background opacity controls, and real-time dual language display.
              </p>
            </div>
            <div className="lg:col-span-7 overflow-hidden rounded-xl border border-white/10 shadow-lg">
              <img 
                src={heroBannerImg} 
                alt="Desktop Live Subtitles Interface Showcase" 
                className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Local Security and Compliance Highlight */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-white/5 p-8 text-white relative overflow-hidden shadow-xl" id="privacy-guarantee-box">
          {/* Decorative geometric patterns */}
          <div className="absolute right-0 bottom-0 h-40 w-40 bg-sky-500/10 rounded-full blur-2xl" />
          <div className="absolute top-0 left-0 h-20 w-20 bg-indigo-500/10 rounded-full blur-xl" />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">
                <ShieldAlert className="h-3.5 w-3.5" />
                Audited Privacy Guarantee
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                Vosk Offline Decoder: 100% Machine Private
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Our application does not integrate any third-party clouds or background tracking services. All translation lookup matrices, speech recognition dictionaries, and timeline indexing buffers are loaded from your secure local drive. Suitable for confidential company training videos, proprietary lectures, and private movies.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="text-center lg:text-right border-l-2 border-sky-500/30 pl-6">
                <div className="text-3xl font-extrabold text-white">0%</div>
                <div className="text-xs font-mono text-sky-300 uppercase tracking-wider mt-1">Remote Data Shared</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

