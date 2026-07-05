import React, { useState } from 'react';
import { Check, Shield, Sparkles } from 'lucide-react';

export default function Pricing() {
  const [freeTrialActive, setFreeTrialActive] = useState(false);

  const startFreeTrial = () => {
    setFreeTrialActive(true);
    setTimeout(() => {
      alert("Mock Speech Recognition Trial Started! Your local desktop simulator is now active for a 30-minute session.");
    }, 100);
  };

  return (
    <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="pricing-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
            Simple Transparent Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Flexible Plans for All Media Types
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-slate-300 sm:text-lg">
            Choose our local free trial or support offline development with our exactly $1/Month complete premium plan.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
          
          {/* Trial Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 dark:border-white/5 dark:bg-white/5 shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Free Evaluation</span>
                {freeTrialActive && (
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-bold text-sky-800 dark:bg-sky-950/50 dark:text-sky-300 animate-pulse">
                    Session Active
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">30-Minute Trial</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Perfect for inspecting local Vosk accuracy and testing subtitle sync with VLC on your machine.
              </p>
              
              {/* Price */}
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$0</span>
                <span className="ml-1 text-sm text-gray-400">/ forever</span>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-4">
                {[
                  "30 minutes of voice tracking per session",
                  "VLC & MPV IPC playhead sync",
                  "Local English Vosk acoustic model",
                  "Standard subtitle placement overlays",
                  "No credit card required"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-slate-300">
                    <Check className="h-4 w-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={startFreeTrial}
                className="block w-full rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-100 py-3.5 text-center text-sm font-semibold transition-all focus:outline-none"
                id="start-trial-button"
              >
                {freeTrialActive ? "Running Trial Session..." : "Activate Free Trial"}
              </button>
            </div>
          </div>

          {/* Premium Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-sky-400 dark:border-sky-500 bg-white p-8 dark:bg-slate-900 shadow-xl" id="premium-pricing-card">
            {/* Top badge */}
            <div className="absolute top-0 right-0 rounded-bl-xl accent-gradient px-4 py-1 text-xs font-bold text-white tracking-wide uppercase">
              POPULAR
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-sky-600 uppercase tracking-wider dark:text-sky-400 flex items-center gap-1">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Premium Sub
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">Premium Monthly</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Unlock continuous, unrestricted local machine subtitle translating, and support independent software.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$1</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">.00</span>
                <span className="ml-1 text-sm text-gray-400">/ Month</span>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-4">
                {[
                  "Unlimited voice tracking continuous playback",
                  "VLC & MPV synchronized integration",
                  "Full multi-language translation models",
                  "Removes trial watermark overlays",
                  "Commercial use licensing authorization",
                  "24/7 Premium technical email support"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-slate-300">
                    <Check className="h-4 w-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-900 dark:text-slate-100">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {/* Paystack button */}
              <a
                href="https://paystack.shop/pay/zyug4tg203"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-4 text-center text-sm font-bold transition-all shadow-md focus:outline-none"
                id="paystack-button"
              >
                Subscribe via Paystack ($1/Mo)
              </a>

              {/* Gumroad button */}
              <a
                href="https://tukurmuhammed.gumroad.com/l/zcjsys"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-[#e45b5b] hover:opacity-90 text-white py-4 text-center text-sm font-bold transition-all shadow-md focus:outline-none"
                id="gumroad-button"
              >
                Subscribe via Gumroad ($1/Mo)
              </a>

              <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-1">
                Both options cost $1/month · Cancel anytime
              </p>
            </div>
          </div>

        </div>

        {/* Support context & refund badge */}
        <div className="mt-12 text-center max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-slate-500 font-mono">
            <Shield className="h-4 w-4 text-sky-500" />
            <span>Secure payments via Paystack & Gumroad · tukurmuhammed902@gmail.com</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            After payment, you'll receive a license key by email. Paste it into the app to activate unlimited captions instantly.
          </p>
        </div>

      </div>
    </section>
  );
}
