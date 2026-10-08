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
                  The application is provided "as is", without warranty of any kind. Speech recognition accuracy depends on audio quality, dialect nuances, and system resources. Hardware constraints (such as missing audio inputs or insufficient RAM) may affect local speech decoding speeds.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">6. Governing Law & Contact</h3>
                <p>
                  These terms shall be governed in accordance with applicable local consumer laws. Any license issues, deal key verification, or dispute resolutions should be directed to <span className="font-semibold text-sky-600 dark:text-sky-400">support@stackbuildco.com</span>.
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
                  Last Updated: October 2026 • Product: Premium Live Caption Player • Developer: StackBuild Co
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="mt-8 rounded-xl bg-emerald-50 p-4 border border-emerald-100 dark:bg-white/5 dark:border-white/10 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Microsoft Store & Offline Privacy Compliant:</span> All media decoding, voice extraction, and caption synthesis take place entirely on your physical computer. We never access, capture, record, or transmit your media.
                </div>
              </div>

              {/* Legal Privacy Sections */}
              <div className="mt-8 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. 100% Offline Local Processing Guarantee</h3>
                <p>
                  <strong>Premium Live Caption Player</strong> is an offline, AI-driven media playback utility. All core operational components—including video parsing, audio extraction, and acoustic decoding via local Vosk neural models—run 100% locally on your computer. An internet connection is never required to stream or transcribe media content.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Zero Collection of Media Files</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Media File Exclusion:</strong> Video and audio files are never collected, logged, cached, indexed, or stored outside your designated local system directories.</li>
                  <li><strong>No Cloud Servers:</strong> The application does not upload or stream media content or caption transcripts to external servers, cloud databases, or third-party APIs.</li>
                  <li><strong>In-Memory Processing:</strong> Subtitle synthesis happens strictly in volatile memory (RAM) and is discarded immediately when playback stops or the player is closed.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Account & License Data Collection</h3>
                <p>
                  Our primary desktop software collects zero telemetry, zero performance logs, and zero tracking metadata.
                </p>
                <p>
                  When purchasing or activating a license (via Paddle or AppSumo redemption):
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Paddle Payments:</strong> Payment details are processed directly by Paddle under PCI-DSS standards. We receive only subscription validation status.</li>
                  <li><strong>AppSumo Redemptions:</strong> AppSumo code redemption stores your email address and generated activation key strictly to validate your lifetime license status and prevent unauthorized duplication.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">4. Data Subject Rights & Contact</h3>
                <p>
                  You retain full rights to request the deletion of your license activation logs or request support on license states. Reach out directly to StackBuild Co support:
                </p>
                <div className="rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 p-4 font-mono text-xs text-gray-700 dark:text-slate-300">
                  <p className="font-bold text-gray-900 dark:text-white">StackBuild Co (Developer & Operator)</p>
                  <p className="mt-1">Email: support@stackbuildco.com</p>
                  <p>Product: Premium Live Caption Player</p>
                  <p>Website: https://scribeswift.stackbuildco.com</p>
                </div>
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
                  Last Updated: October 2026 • Product: Premium Live Caption Player
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="mt-8 rounded-xl bg-sky-50 p-4 border border-sky-100 dark:bg-white/5 dark:border-white/10 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Refund Inquiries:</span> Direct site purchases are handled via <span className="underline">support@stackbuildco.com</span>. AppSumo orders must be refunded directly through your AppSumo customer dashboard within 14 days.
                </div>
              </div>

              {/* Legal Refund Sections */}
              <div className="mt-8 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. 14-Day Money-Back Guarantee</h3>
                <p>
                  We are committed to providing reliable local subtitle solutions. All purchases—whether direct site subscriptions/lifetime plans via Paddle or deals redeemed through <strong>AppSumo</strong>—are covered by our standard <strong>14-Day Money-Back Guarantee</strong>. If you experience technical incompatibilities or execution issues during your first 14 days, you are eligible for a full 100% refund.
                </p>

                <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-5 dark:border-sky-500/20 dark:bg-white/5">
                  <div className="flex items-center gap-2 mb-2 text-sky-900 dark:text-sky-300 font-bold">
                    <Tag className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    <span>AppSumo Purchases (60-Day Window)</span>
                  </div>
                  <p className="text-xs text-sky-800 dark:text-slate-300 leading-relaxed">
                    If you purchased your license through <strong>AppSumo</strong>, refund requests must be initiated directly through your <strong>AppSumo Account Dashboard</strong> under your purchase history within 14 days of purchase. Once processed by AppSumo, your associated license key will be automatically deactivated.
                  </p>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Subscription Billing & Cancellations</h3>
                <p>
                  Monthly subscriptions ($1.00/month) can be canceled at any time through your billing email link or by reaching out to support. Upon cancellation, your premium features remain active until the end of the paid billing period, after which no further charges will occur.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Processing & License Revocation</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Direct site refunds are processed back to your original payment method via Paddle within 3 to 10 business days.</li>
                  <li>AppSumo refunds are disbursed directly by AppSumo according to their customer refund terms.</li>
                  <li>Upon refund execution (direct or AppSumo), your license key will be revoked, and the desktop app will revert to 30-Minute Trial mode.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">4. Dispute Resolution</h3>
                <p>
                  Before initiating payment chargebacks with your bank, please contact us directly at <span className="font-bold text-sky-600 dark:text-sky-400">support@stackbuildco.com</span>. We respond to all technical billing inquiries within 24 hours.
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
            <span>Ready to activate? Upgrade for $1/Month or $19 Lifetime</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
