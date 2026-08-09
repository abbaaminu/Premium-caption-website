import React, { useEffect, useState } from 'react';
import { Check, Shield, Sparkles, CreditCard, ExternalLink } from 'lucide-react';

// Global Window Type for Paddle v2
declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: 'sandbox' | 'production') => void;
      };
      Initialize: (config: { token: string }) => void;
      Checkout: {
        open: (options: {
          items: Array<{ priceId: string; quantity: number }>;
          settings?: {
            displayMode?: 'overlay' | 'inline';
            theme?: 'light' | 'dark';
            locale?: string;
          };
          customer?: {
            email?: string;
          };
        }) => void;
      };
    };
  }
}

// Configuration Constants
const PADDLE_ENVIRONMENT: 'sandbox' | 'production' = 'production'; 
const PADDLE_CLIENT_TOKEN = 'live_722a5747933737e59bb2a41425e'; 

const PADDLE_PRICES = {
  MONTHLY: 'pri_01kwfsfg8m7zf71yznd9c8t0ra',  // $1.00 USD / month
  LIFETIME: 'pri_01kzk5qvnzdnt7grkjwg35vzpn'  // $19.00 USD / one-time
};

const PAYSTACK_MONTHLY_URL = 'https://paystack.shop/pay/zyug4tg203';

export default function Pricing() {
  const [monthlyGateway, setMonthlyGateway] = useState<'paddle' | 'paystack'>('paddle');

  useEffect(() => {
    if (window.Paddle) {
      window.Paddle.Environment.set(PADDLE_ENVIRONMENT);
      window.Paddle.Initialize({ token: PADDLE_CLIENT_TOKEN });
    }
  }, []);

  const handleOpenPaddleCheckout = (priceId: string) => {
    if (!window.Paddle) {
      alert("Paddle SDK failed to load. Please check your network or try again.");
      return;
    }

    window.Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en'
      }
    });
  };

  const handleMonthlyCheckout = () => {
    if (monthlyGateway === 'paystack') {
      window.open(PAYSTACK_MONTHLY_URL, '_blank', 'noopener,noreferrer');
    } else {
      handleOpenPaddleCheckout(PADDLE_PRICES.MONTHLY);
    }
  };

  return (
    <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-[#0F172A] border-t border-gray-100 dark:border-white/5" id="pricing-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
            Flexible Purchase Options
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choose Your Access Level
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-slate-300 sm:text-lg">
            Support continuous local speech recognition development with flexible monthly billing or pay once for lifetime desktop access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
          
          {/* Monthly Plan Card (With Gateway Toggle) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-sky-600 uppercase tracking-wider dark:text-sky-400">
                  Flexible Plan
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">Premium Monthly</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Ideal for light users who want continuous local speech recognition with a low monthly cost.
              </p>
              
              {/* Price Display */}
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$1</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">.00</span>
                <span className="ml-1 text-sm text-gray-400">/ Month</span>
              </div>

              {/* Gateway Selection Tabs for Monthly */}
              <div className="mt-6 rounded-xl bg-gray-100 p-1 dark:bg-white/5">
                <span className="block text-[10px] font-mono font-semibold text-gray-400 uppercase mb-1 px-2">
                  Select Payment Route:
                </span>
                <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setMonthlyGateway('paddle')}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                      monthlyGateway === 'paddle'
                        ? 'bg-white text-sky-600 shadow-sm dark:bg-slate-800 dark:text-sky-400'
                        : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    Paddle (Cards/PayPal)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMonthlyGateway('paystack')}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                      monthlyGateway === 'paystack'
                        ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
                        : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Paystack
                  </button>
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited offline live speech tracking",
                  "VLC & MPV synchronized integration",
                  "Full multi-language translation models",
                  "Watermark-free subtitle overlays",
                  "Cancel subscription anytime"
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
                onClick={handleMonthlyCheckout}
                className={`block w-full rounded-xl py-3.5 text-center text-sm font-bold text-white transition-all shadow-md focus:outline-none ${
                  monthlyGateway === 'paystack'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-sky-500 hover:bg-sky-600'
                }`}
              >
                {monthlyGateway === 'paystack' 
                  ? 'Pay with Paystack ($1/Mo)' 
                  : 'Subscribe via Paddle ($1/Mo)'}
              </button>
            </div>
          </div>

          {/* Lifetime Access Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-emerald-400 dark:border-emerald-500 bg-white p-8 dark:bg-slate-900 shadow-xl">
            <div className="absolute top-0 right-0 rounded-bl-xl bg-emerald-500 px-4 py-1 text-xs font-bold text-white tracking-wide uppercase">
              BEST VALUE
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Lifetime Deal
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">Lifetime Access</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Pay once and keep the full unlocked application forever. All future application updates included.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$19</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">.00</span>
                <span className="ml-1 text-sm text-gray-400">one-time</span>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-3">
                {[
                  "Pay once, keep desktop application forever",
                  "Includes standalone Lifetime Executable (.exe)",
                  "No monthly recurring charges or fees",
                  "Priority email technical support",
                  "Full multi-language translation models"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-slate-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-900 dark:text-slate-100">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleOpenPaddleCheckout(PADDLE_PRICES.LIFETIME)}
                className="block w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-4 text-center text-sm font-bold transition-all shadow-md focus:outline-none"
              >
                Get Lifetime Access ($19)
              </button>
            </div>
          </div>

        </div>

        {/* Support context */}
        <div className="mt-12 text-center max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-slate-500 font-mono">
            <Shield className="h-4 w-4 text-sky-500" />
            <span>Secure Gateways • Paddle & Paystack Verified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
