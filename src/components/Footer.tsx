import React from 'react';
import { RoutePath } from '../types';
import { Subtitles, ShieldCheck, Mail, Laptop, Heart, Download } from 'lucide-react';

interface FooterProps {
  navigateTo: (path: RoutePath) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  
  const handleNavClick = (path: RoutePath, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300 py-16 transition-colors duration-300 border-t border-white/5" id="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand Info (4 Columns) */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="#/" 
              onClick={(e) => { e.preventDefault(); navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 focus:outline-none"
              id="footer-logo-link"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg accent-gradient text-white shadow shadow-sky-500/20">
                <Subtitles className="h-5 w-5" />
              </div>
              <span className="font-display text-base font-bold tracking-tight text-white">
                Premium Live <span className="text-sky-400">Caption Player</span>
              </span>
            </a>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              The professional offline subtitle engine built with Python PySide6, integrating the high-performance local Vosk recognition model and dual-VLC playbackTiming controllers.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <Laptop className="h-3.5 w-3.5 text-sky-400" />
              <span>Tested on Win11, macOS Sequoia, Ubuntu LTS</span>
            </div>
          </div>

          {/* Navigational Links - Direct router access (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Product Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#/" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home');
                    setTimeout(() => {
                      const featuresSec = document.getElementById('features-section');
                      if (featuresSec) featuresSec.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  Core Features
                </a>
              </li>
              <li>
                <a 
                  href="#/pricing" 
                  onClick={(e) => handleNavClick('pricing', e)}
                  className="hover:text-sky-400 transition-colors font-semibold"
                  id="footer-link-pricing"
                >
                  Pricing Plan ($1/Mo)
                </a>
              </li>
              <li>
                <a 
                  href="#download-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home');
                    setTimeout(() => {
                      const dlSec = document.getElementById('download-section');
                      if (dlSec) dlSec.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Download Installer
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Policies - Direct router access (4 Columns) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Paddle Merchant Compliance Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#/terms" 
                  onClick={(e) => handleNavClick('terms', e)}
                  className="hover:text-sky-400 transition-colors"
                  id="footer-link-terms"
                >
                  Terms of Service (ToS)
                </a>
              </li>
              <li>
                <a 
                  href="#/privacy" 
                  onClick={(e) => handleNavClick('privacy', e)}
                  className="hover:text-sky-400 transition-colors"
                  id="footer-link-privacy"
                >
                  Privacy Policy & Offline Guarantee
                </a>
              </li>
              <li>
                <a 
                  href="#/refunds" 
                  onClick={(e) => handleNavClick('refunds', e)}
                  className="hover:text-sky-400 transition-colors"
                  id="footer-link-refunds"
                >
                  Refund & Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Metadata Panel - Vital for Paddle Auditor approval */}
        <div className="mt-12 space-y-6">
          
          {/* Merchant Account Details Card */}
          <div className="rounded-xl bg-[#0F172A]/80 p-6 border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-8 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>OFFICIAL MERCHANT COMPLIANCE STATEMENT</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-normal">
                "Premium Live Caption Player" is proudly operated and managed by our developer merchant account at <span className="text-white font-semibold">abbaaminub@gmail.com</span>. Subscriptions are billed on a monthly recurring schedule at exactly $1.00 USD. Checkouts, invoice drafting, and subscription state webhooks are routed securely through Paddle. No credit card details are ever stored locally.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col md:items-end gap-1.5 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <span className="text-[10px] font-mono text-gray-500 uppercase">Support Mailbox</span>
              <a 
                href="mailto:abbaaminub@gmail.com" 
                className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-bold transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>abbaaminub@gmail.com</span>
              </a>
            </div>

          </div>

          {/* Trademark Footer Line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © {currentYear} Premium Live Caption Player. All Rights Reserved. Not affiliated with VLC Media Player or VideoLAN organization.
            </p>
            <div className="flex items-center gap-1">
              <span>Developed for private speech indexing</span>
              <Heart className="h-3 w-3 text-sky-400 fill-sky-400" />
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
