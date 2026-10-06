import React from 'react';
import { RoutePath } from '../types';
import { ShieldAlert, Scale, Mail, Info, RefreshCw, AlertCircle, ChevronRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalProps {
  view: 'terms' | 'privacy' | 'refunds';
  navigateTo: (path: RoutePath) => void;
}

export default function Legal({ view, navigateTo }: LegalProps) {
  
  return (
    <section className="bg-white py-16 transition-colors duration-300 dark:bg-[#0F172A] sm:py-24" id="legal-pages-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs for Legal Content */}
        <div className="mb-12 flex flex-wrap justify-center gap-2 border-b border-gray-100 pb-4 dark:border-white/5">
          <button
            onClick={() => navigateTo('terms')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none ${
              view === 'terms'
                ? 'bg-sky-100 text-sky-700 dark:bg-white/10 dark:text-sky-300 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
            }`}
            id="legal-tab-terms"
          >
            <Scale className="h-4 w-4" />
            <span>Terms of Service</span>
          </button>
          
          <button
            onClick={() => navigateTo('privacy')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none ${
              view === 'privacy'
                ? 'bg-sky-100 text-sky-700 dark:bg-white/10 dark:text-sky-300 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
            }`}
            id="legal-tab-privacy"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Privacy Policy</span>
          </button>
          
          <button
            onClick={() => navigateTo('refunds')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none ${
              view === 'refunds'
                ? 'bg-sky-100 text-sky-700 dark:bg-white/10 dark:text-sky-300 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
            }`}
            id="legal-tab-refunds"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refund Policy</span>
          </button>
        </div>

        {/* Dynamic Legal Pages Switcher */}
        <AnimatePresence mode="wait">
          {view === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="prose prose-gray max-w-none dark:prose-invert"
              id="terms-content"
            >
              {/* Header */}
              <div className="border-b border-gray-100 pb-6 dark:border-white/5">
                <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                  Terms of Service
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                  Last Updated: October 2026 • Product: Premium Live Caption Player
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="mt-8 rounded-xl bg-sky-50 p-4 border border-sky-100 dark:bg-white/5 dark:border-white/10 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2.5">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">License Notice:</span> This desktop app utilizes local Python modules, PySide6 wrappers, and Vosk audio processing libraries. By deploying the installer, you agree to comply with open-source package licenses where applicable.
                </div>
              </div>

              {/* Legal Terms Sections */}
              <div className="mt-8 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Agreement to Terms</h3>
                <p>
                  By accessing, installing, downloading, or executing the "Premium Live Caption Player" desktop application, you agree to be bound by these Terms of Service. If you do not agree to all terms herein, do not install or use this application. Software operations and licenses are provided by StackBuild Co (<span className="font-semibold text-gray-900 dark:text-white">support@stackbuildco.com</span>) and subject to billing through Paddle (Authorized Merchant of Record) or authorized partners, including AppSumo.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Software License & Tiers</h3>
                <p>
                  We grant you a non-transferable, non-exclusive, revocable, limited license to run and execute the application binary on your personal or commercial desktop devices.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>30-Minute Free Trial:</strong> Subject to a standard subtitle trial watermark and playback runtime limits.</li>
                  <li><strong>Monthly & Direct Lifetime Tiers:</strong> Licensed for unrestricted local speech translation, custom frame offset adjustments, and commercial usage.</li>
                  <li><strong>AppSumo Lifetime License:</strong> Redeemable via valid AppSumo redemption keys. Grants lifetime desktop activation per the specific deal tier redeemed at time of purchase.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Permitted & Prohibited Uses</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You may use the application to process audio streams and transcribe media speech in real-time.</li>
                  <li>You may use downloaded Vosk acoustic model packages for offline playback configuration.</li>
                  <li>You <span className="font-semibold text-gray-950 dark:text-white">MUST NOT</span> attempt to reverse engineer, decompile, or extract PySide6 UI controllers to repackage or resell the custom synchronization engine.</li>
                  <li>You must not use this tool to violate copyright laws or unauthorized redistribution rights on media content.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">4. Billing, Direct Purchases & AppSumo Redemptions</h3>
                <p>
                  Direct online subscriptions ($1.00/month) and Lifetime access ($19.00 single payment) are processed via Paddle. Subscriptions auto-renew monthly until canceled. 
                </p>
                <p className="mt-2">
                  <strong>AppSumo Customers:</strong> Purchases made via AppSumo grant redemption codes that must be activated via our license verification portal. AppSumo keys are non-transferable, single-use keys tied to your registered email account. Reselling, unauthorized license sharing, or key duplication will result in immediate activation voiding.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">5. Disclaimers of Warranties</h3>
                <p>
                  The application is provided "as is", without warranty of any
