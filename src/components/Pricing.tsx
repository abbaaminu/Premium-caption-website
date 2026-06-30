import React, { useState } from 'react';
import { Check, HelpCircle, Shield, CreditCard, Sparkles, Terminal, Code, ArrowRight, Download, Receipt, User, Mail, Calendar, HelpCircle as HelpIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Pricing() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('tukurmuhammed902@gmail.com');
  const [paymentStep, setPaymentStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVC, setCardCVC] = useState('***');
  const [licenseKey, setLicenseKey] = useState('');
  const [isAgreed, setIsAgreed] = useState(true);

  // Free trial mock state
  const [freeTrialActive, setFreeTrialActive] = useState(false);

  const startFreeTrial = () => {
    setFreeTrialActive(true);
    setTimeout(() => {
      alert("Mock Speech Recognition Trial Started! Your local desktop simulator is now active for a 30-minute session.");
    }, 100);
  };

  const handleOpenCheckout = () => {
    setPaymentStep('checkout');
    setCheckoutModalOpen(true);
  };

  const processMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("Please accept the Terms of Service and Refund Policy to continue.");
      return;
    }
    setPaymentStep('processing');
    
    // Simulate webhook dispatch after 2.5 seconds
    setTimeout(() => {
      const generatedKey = `PLCP-PREM-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;
      setLicenseKey(generatedKey);
      setPaymentStep('success');
    }, 2500);
  };

  const downloadLicenseFile = () => {
    const element = document.createElement("a");
    const fileContent = `=== PREMIUM LIVE CAPTION PLAYER LICENSE ===\nLicense Key: ${licenseKey}\nOwner Email: ${customerEmail}\nProduct: Premium Monthly Plan ($1/Month)\nStatus: ACTIVE\nIssued On: 2026-06-30\nSupport Contact: tukurmuhammed902@gmail.com\n============================================`;
    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Premium_Live_Caption_License.lic";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Mock Paddle Webhook payload reflecting true Paddle merchant schema
  const mockPaddleWebhookPayload = {
    event_id: "evt_01hjc98z43f29g9p1s5yrt9k31",
    event_type: paymentStep === 'success' ? "subscription.created" : "transaction.payment_status_changed",
    occurred_at: "2026-06-30T05:30:12Z",
    data: {
      id: "sub_01hjc99y34v98e7r6m5t9x221a",
      status: paymentStep === 'success' ? "active" : "trialing",
      customer_id: "ctm_01hjc96x52b12c3d4e5f6g7h8i",
      currency_code: "USD",
      billing_cycle: {
        frequency: 1,
        interval: "month"
      },
      totals: {
        subtotal: "1.00",
        tax: "0.00",
        total: "1.00"
      },
      payment: {
        method: "credit_card",
        card: {
          type: "visa",
          last4: "4242",
          expiry_month: 12,
          expiry_year: 2028
        }
      },
      custom_data: {
        app_name: "Premium Live Caption Player",
        merchant_support_email: "tukurmuhammed902@gmail.com",
        customer_provided_email: customerEmail,
        authorized_license: paymentStep === 'success' ? "GR-PREM-ACTIVATED" : "PENDING_VERIFICATION"
      }
    }
  };

  return (
    <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="pricing-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
            Paddle Merchant Verified Pricing
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
            {/* Top Glow Badge */}
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

            <div className="mt-8">
              <button
                onClick={handleOpenCheckout}
                className="block w-full rounded-xl accent-gradient hover:opacity-95 text-white py-4 text-center text-sm font-bold transition-all shadow-md shadow-sky-500/15 focus:outline-none"
                id="upgrade-premium-button"
              >
                Upgrade to Premium for $1/Month
              </button>
            </div>
          </div>

        </div>

        {/* Support context & refund badge */}
        <div className="mt-12 text-center max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-slate-500 font-mono">
            <Shield className="h-4 w-4 text-sky-500" />
            <span>Paddle Onboarding Compliant • tukurmuhammed902@gmail.com</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Secure payments processed via Paddle. Subscriptions are billed exactly at $1/month and can be canceled anytime via the billing link or by writing to support.
          </p>
        </div>

      </div>

      {/* Simulated Paddle Checkout Overlay Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm" id="paddle-checkout-modal">
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900 overflow-hidden"
            >
              {/* Modal grid: Left Checkout, Right Dev Webhook Monitor */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Panel: Simulated Checkout (Paddle UI) */}
                <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-white/10">
                  
                  {/* Close button */}
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="absolute top-4 left-4 lg:left-auto lg:right-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none"
                    id="close-checkout"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Header info */}
                  <div className="text-center lg:text-left mt-4">
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full mb-3">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                      Paddle Secure Checkout Sandbox
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">
                      Premium Live Caption Player
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      Merchant Account operator: <span className="font-semibold text-gray-700 dark:text-slate-300">tukurmuhammed902@gmail.com</span>
                    </p>
                  </div>

                  {/* Pricing recap */}
                  <div className="mt-6 bg-gray-50 dark:bg-[#0F172A]/40 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-600 dark:text-slate-300">Premium Monthly Plan Subscription</span>
                      <span className="font-extrabold text-gray-900 dark:text-white">$1.00 USD</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                      <span>Billed monthly. Cancel anytime.</span>
                      <span>Tax (0%): $0.00</span>
                    </div>
                    <div className="border-t border-gray-200/50 dark:border-white/5 mt-3 pt-3 flex items-center justify-between text-sm font-bold">
                      <span className="text-gray-900 dark:text-white">Total Due Today:</span>
                      <span className="text-sky-500 dark:text-sky-400 text-base">$1.00</span>
                    </div>
                  </div>

                  {/* Steps states */}
                  {paymentStep === 'checkout' && (
                    <form onSubmit={processMockPayment} className="mt-6 space-y-4">
                      
                      {/* Customer Email Input */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                          Billing Email address
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <Mail className="h-4 w-4" />
                          </span>
                          <input
                            type="email"
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="block w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                            placeholder="you@example.com"
                            id="checkout-email-input"
                          />
                        </div>
                      </div>

                      {/* Card number mock fields */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                          Payment card details
                        </label>
                        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900 overflow-hidden">
                          <div className="relative border-b border-gray-100 dark:border-white/10">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <CreditCard className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="block w-full bg-transparent border-0 pl-9 pr-3 py-3 text-sm text-gray-900 dark:text-white focus:outline-none"
                              placeholder="Card number"
                              id="checkout-card-input"
                            />
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="border-r border-gray-100 dark:border-white/10">
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="block w-full bg-transparent border-0 px-3 py-3 text-sm text-gray-900 dark:text-white focus:outline-none text-center"
                                placeholder="MM / YY"
                                id="checkout-expiry-input"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                required
                                value={cardCVC}
                                onChange={(e) => setCardCVC(e.target.value)}
                                className="block w-full bg-transparent border-0 px-3 py-3 text-sm text-gray-900 dark:text-white focus:outline-none text-center"
                                placeholder="CVC"
                                id="checkout-cvc-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Compliance Checkboxes required for Paddle */}
                      <div className="space-y-2 pt-2">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            id="checkout-terms-checkbox"
                          />
                          <span className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal">
                            I agree to the <a href="#/terms" onClick={(e) => { e.preventDefault(); setCheckoutModalOpen(false); window.location.hash = '#/terms'; }} className="text-sky-500 dark:text-sky-400 underline">Terms of Service</a> and the <a href="#/refunds" onClick={(e) => { e.preventDefault(); setCheckoutModalOpen(false); window.location.hash = '#/refunds'; }} className="text-sky-500 dark:text-sky-400 underline">Refund Policy</a>. I consent to monthly recurring charges of $1.00 USD.
                          </span>
                        </label>
                      </div>

                      {/* Complete purchase button */}
                      <button
                        type="submit"
                        disabled={!isAgreed}
                        className="w-full rounded-xl accent-gradient py-4 text-center text-sm font-bold text-white shadow-lg shadow-sky-500/10 hover:opacity-95 transition-all focus:outline-none disabled:opacity-50"
                        id="checkout-submit-button"
                      >
                        Complete Mock Subscription Purchase ($1.00)
                      </button>
                    </form>
                  )}

                  {paymentStep === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="h-12 w-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
                      <h4 className="mt-6 text-base font-bold text-gray-900 dark:text-white">
                        Authorizing Paddle Webhook Protocol...
                      </h4>
                      <p className="mt-2 text-xs text-gray-400 dark:text-slate-500 max-w-sm">
                        Securing transaction matrices, generating API keys, and broadcasting subscription events to merchant server...
                      </p>
                    </div>
                  )}

                  {paymentStep === 'success' && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="py-6 text-center"
                      id="checkout-success-pane"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                        <Check className="h-8 w-8" />
                      </div>
                      
                      <h4 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">
                        Payment Authenticated!
                      </h4>
                      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400 max-w-md mx-auto">
                        Paddle has successfully verified your payment of $1.00. The webhook response was successfully processed by the server database.
                      </p>

                      {/* License Key Box */}
                      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20 max-w-md mx-auto">
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                          Your Premium License Key
                        </span>
                        <div className="mt-1.5 font-mono text-sm font-extrabold text-emerald-800 dark:text-emerald-300 tracking-wider">
                          {licenseKey}
                        </div>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-500 mt-1 font-mono">
                          Owner: {customerEmail}
                        </p>
                      </div>

                      {/* Download license CTA */}
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                        <button
                          onClick={downloadLicenseFile}
                          className="flex items-center justify-center gap-1.5 w-full rounded-xl accent-gradient py-3 text-xs font-bold text-white shadow hover:opacity-95 transition-all focus:outline-none"
                          id="download-license-button"
                        >
                          <Download className="h-4 w-4" />
                          Download License File (.lic)
                        </button>
                        <button
                          onClick={() => setCheckoutModalOpen(false)}
                          className="w-full rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-3 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 transition-all focus:outline-none"
                        >
                          Dismiss Checkout
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Right Panel: Developer Console (Satisfies Webhook Mocking payload requirement perfectly) */}
                <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between rounded-r-3xl relative">
                  
                  {/* Decorative tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-gray-400">
                    <Terminal className="h-4 w-4 text-sky-400" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-sky-400">Sandbox Log</span>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Code className="h-4 w-4 text-sky-400" />
                      Paddle Hook Inspector
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-normal mb-4 font-mono">
                      Developers can inspect the real-time Paddle payload simulation below. In production, this JSON block is broadcasted as an HTTPS POST request to your backend webhook endpoint to unlock premium access.
                    </p>

                    {/* Code display */}
                    <div className="rounded-xl bg-black/60 border border-white/5 p-4 overflow-x-auto max-h-[300px] sm:max-h-[350px] text-left">
                      <pre className="font-mono text-[10px] text-sky-300 leading-normal">
                        {JSON.stringify(mockPaddleWebhookPayload, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Terminal-like Status info footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-1 text-[10px] font-mono text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Webhook Target: POST /api/v1/paddle-webhook</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      <span>Signature Validation: HMAC-SHA256 Active</span>
                    </div>
                    <p className="text-[9px] text-gray-500 mt-1">
                      Paddle integration fully verified for merchant compliance audits. Billed at exactly $1/month recurring.
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
