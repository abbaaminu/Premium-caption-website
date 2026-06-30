import React from 'react';
import { RoutePath } from '../types';
import { FileText, ShieldAlert, Sparkles, Scale, Mail, Info, RefreshCw, AlertCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalProps {
  view: 'terms' | 'privacy' | 'refunds';
  navigateTo: (path: RoutePath) => void;
}

export default function Legal({ view, navigateTo }: LegalProps) {
  
  const handleNavClick = (path: RoutePath, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(path);
  };

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
                  Last Updated: June 30, 2026 • Product: Premium Live Caption Player
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="mt-8 rounded-xl bg-sky-50 p-4 border border-sky-100 dark:bg-white/5 dark:border-white/10 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2.5">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">License Notice:</span> This desktop app utilizes local python modules, PySide6 wrappers, and Vosk audio processing libraries. By deploying the installer, you agree to comply with open-source package licenses where applicable.
                </div>
              </div>

              {/* Legal Terms Sections */}
              <div className="mt-8 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Agreement to Terms</h3>
                <p>
                  By accessing, installing, downloading, or executing the "Premium Live Caption Player" desktop application, you agree to be bound by these Terms of Service. If you do not agree to all terms herein, do not install or use this application. This software is operated by tukurmuhammed902@gmail.com and is subject to Paddle checkout merchant processing requirements.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Software License & Rights</h3>
                <p>
                  We grant you a non-transferable, non-exclusive, revocable, limited license to run and execute the application executable on your personal or commercial computers. 
                  Users on the 30-Minute Free Trial are subject to a standard subtitle trial watermark and active playback limiters. 
                  Users on the $1/Month Premium Tier are licensed for unrestricted local subtitle translation processing, frame offset corrections, and commercial media applications.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Permitted & Prohibited Uses</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You may use the application to process audio streams and transcribe video speech in real-time.</li>
                  <li>You may use downloaded Vosk dictionaries for offline translation configurations.</li>
                  <li>You <span className="font-semibold text-gray-950 dark:text-white">MUST NOT</span> attempt to reverse engineer, decompile, or extract the PySide6 UI controllers to resell or repackage the custom speech sync framework.</li>
                  <li>You must not use this tool to violate any copyright laws on distributed media contents.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">4. Subscriptions & Billing</h3>
                <p>
                  Subscriptions are processed directly via Paddle (our Authorized Merchant). Subscriptions cost exactly $1.00 USD per month and automatically renew until canceled. You are responsible for ensuring your payment method remains valid. You may cancel at any time, which terminates recurring billing cycles for the following period.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">5. Disclaimers of Warranties</h3>
                <p>
                  The application is provided "as is", without warranty of any kind, express or implied. We do not warrant that speech-to-text accuracy will be 100% accurate across all dialects, or that the VLC playback pipeline will remain compatible with all custom video codecs. Local hardware constraints (such as missing microphones or low RAM) may affect decoders performance.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">6. Governing Law & Dispute Resolution</h3>
                <p>
                  These terms shall be governed in accordance with the user's local consumer laws. Any disputes, billing resolutions, or claims regarding subscription renewals must be directed to tukurmuhammed902@gmail.com or via Paddle support ticket workflows.
                </p>
              </div>
            </motion.div>
          )}

          {view === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="prose prose-gray max-w-none dark:prose-invert"
              id="privacy-content"
            >
              {/* Header */}
              <div className="border-b border-gray-100 pb-6 dark:border-white/5">
                <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                  Privacy Policy
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                  Last Updated: June 30, 2026 • Product: Premium Live Caption Player
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="mt-8 rounded-xl bg-emerald-50 p-4 border border-emerald-100 dark:bg-white/5 dark:border-white/10 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Privacy Core:</span> Our architecture enforces a 100% offline rule. We do not maintain remote cloud voice transcribers, analytics telemetry, or audio-scraping channels.
                </div>
              </div>

              {/* Legal Privacy Sections */}
              <div className="mt-8 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Local Speech Processing Guarantee</h3>
                <p>
                  Premium Live Caption Player processes speech audio and generates subtitle translations <span className="font-semibold text-gray-900 dark:text-white">entirely offline locally</span> on your device. 
                  The application integrates the local open-source Vosk API for speech-to-text decoding. 
                  No video packets, raw audio streams, speaking voice logs, transcriptions, or translation text strings are ever captured, compiled, or transmitted to external web servers or databases.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Personal Data Collected & Processed</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-bold text-gray-900 dark:text-white">Media Contents:</span> Absolute zero collection. The desktop application loads files locally and performs IPC socket transfers on your local machine only.</li>
                  <li><span className="font-bold text-gray-900 dark:text-white">Payment Information:</span> We use Paddle as an external merchant. When purchasing the $1/Month subscription, your payment details (credit card number, email, address) are processed securely by Paddle under strict PCI-DSS regulations. Our servers do not store your raw credit card digits.</li>
                  <li><span className="font-bold text-gray-900 dark:text-white">Account Email:</span> We only retain your basic purchase email address for license verification, update broadcasts, and support tickets.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Cookies & Website Analytics</h3>
                <p>
                  Our landing website does not deploy invasive advertising tracking cookies or social-media profiling pixels. We only utilize standard local storage parameters to persist your dark-mode preference (e.g. "darkMode" state) for aesthetic continuity.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">4. Sub-Processors</h3>
                <p>
                  We share transactional email metadata with Paddle for billing subscriptions and verifying merchant eligibility. Paddle operates as our Merchant of Record. You may inspect Paddle's compliance privacy terms directly on their portal.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">5. Your Privacy Rights</h3>
                <p>
                  You have the complete right to request the deletion of your purchase email log, cancel your subscription, or restrict communications. To exercise any data access request, please contact our support desk via email at <span className="font-semibold text-sky-500 dark:text-sky-400">tukurmuhammed902@gmail.com</span>.
                </p>
              </div>
            </motion.div>
          )}

          {view === 'refunds' && (
            <motion.div
              key="refunds"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="prose prose-gray max-w-none dark:prose-invert"
              id="refunds-content"
            >
              {/* Header */}
              <div className="border-b border-gray-100 pb-6 dark:border-white/5">
                <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                  Refund Policy
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                  Last Updated: June 30, 2026 • Product: Premium Live Caption Player
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="mt-8 rounded-xl bg-sky-50 p-4 border border-sky-100 dark:bg-white/5 dark:border-white/10 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Refund Inquiries:</span> Any refund requests must state your license email and be sent to tukurmuhammed902@gmail.com or filed through your Paddle subscription dashboard.
                </div>
              </div>

              {/* Legal Refund Sections */}
              <div className="mt-8 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. 14-Day Money-Back Guarantee</h3>
                <p>
                  We are highly committed to providing reliable local subtitle solutions. Since our Premium Monthly Plan is priced at exactly <span className="font-bold text-gray-900 dark:text-white">$1.00 USD/Month</span>, we want to ensure zero-risk testing. If you experience technical incompatibilities, local microphone access barriers, or PySide6 execution errors during the first 14 days of your initial subscription, we will issue a full 100% refund.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Billing Cycles & Cancellations</h3>
                <p>
                  Subscriptions are billed monthly. You can cancel your subscription at any time. When you cancel, you will maintain full premium access to local transcribing databases, multiple languages models, and VLC synchronizers until the current billing month ends. No further renewals will be drafted on your card.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Processing Rules</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Refunds are processed back to the original payment method (Credit Card/PayPal) used during the Paddle checkout checkout.</li>
                  <li>Approved refunds generally take 3 to 10 business days to clear on your bank statement.</li>
                  <li>Upon refund execution, your Premium License Key (e.g. PLCP-PREM-XXXX) will be automatically revoked, and your local desktop app will fall back to the 30-Minute Trial limitations.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">4. Dispute Resolution & Customer Support</h3>
                <p>
                  Before initiating a bank chargeback, we highly encourage writing to our support mailbox. We respond to all technical billing inquiries within 24 hours. Contact our operator directly at <span className="font-bold text-sky-500 dark:text-sky-400">tukurmuhammed902@gmail.com</span> to resolve any billing disputes immediately.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer legal shortcut link back to pricing */}
        <div className="mt-16 flex justify-center border-t border-gray-100 pt-8 dark:border-white/5">
          <button
            onClick={() => { navigateTo('pricing'); }}
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-4 py-2 text-xs font-bold text-sky-700 hover:bg-sky-100 transition-all dark:bg-white/10 dark:text-sky-300"
            id="legal-back-to-pricing"
          >
            <span>Ready to activate? Upgrade for $1/Month</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
