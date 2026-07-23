import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Subtitles, Menu, X, Sun, Moon, Download, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import appLogoImg from '../assets/images/app_logo_icon_1784821784642.jpg';

interface HeaderProps {
  currentPath: RoutePath;
  navigateTo: (path: RoutePath) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ currentPath, navigateTo, darkMode, toggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; path: RoutePath }[] = [
    { label: 'Features', path: 'home' }, // Home contains Features section
    { label: 'Pricing Plan', path: 'pricing' },
    { label: 'Terms of Service', path: 'terms' },
    { label: 'Privacy Policy', path: 'privacy' },
    { label: 'Refund Policy', path: 'refunds' },
  ];

  const handleNavClick = (path: RoutePath, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(path);
    setMobileMenuOpen(false);
    
    // If navigating to home, we might want to scroll to features
    if (path === 'home') {
      setTimeout(() => {
        const featuresSec = document.getElementById('features-section');
        if (featuresSec) {
          featuresSec.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/85 backdrop-blur-md transition-colors duration-300 dark:border-white/5 dark:bg-[#0F172A]/85" id="nav-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a 
          href="#/" 
          onClick={(e) => { e.preventDefault(); navigateTo('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 focus:outline-none group"
          id="logo-link"
        >
          <img 
            src={appLogoImg} 
            alt="Live Caption Pro Logo" 
            className="h-10 w-10 rounded-xl shadow-md shadow-sky-500/10 object-cover ring-1 ring-sky-400/30 group-hover:scale-105 transition-transform" 
            referrerPolicy="no-referrer" 
          />
          <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
            LiveCaption<span className="text-gradient font-medium ml-1 text-sm uppercase tracking-widest">Pro</span>
          </span>
        </a>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={`#/${item.path}`}
                onClick={(e) => handleNavClick(item.path, e)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 dark:bg-white/10 dark:text-sky-400'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
                id={`nav-item-${item.path}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Theme"
            id="theme-toggle-desktop"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Download CTA */}
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
            className="flex items-center gap-1.5 rounded-lg accent-gradient px-4 py-2 text-sm font-semibold text-white transition-all shadow-md shadow-sky-500/10 hover:opacity-95"
            id="download-cta-header"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </a>
        </div>

        {/* Mobile menu toggle & Theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Theme"
            id="theme-toggle-mobile"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-white dark:border-white/5 dark:bg-[#0F172A] px-4 py-4 space-y-2 shadow-inner"
            id="mobile-nav-menu"
          >
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={`#/${item.path}`}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 dark:bg-white/10 dark:text-sky-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                  id={`mobile-nav-item-${item.path}`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5">
              <a
                href="#download-section"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  navigateTo('home');
                  setTimeout(() => {
                    const dlSec = document.getElementById('download-section');
                    if (dlSec) dlSec.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl accent-gradient py-3.5 text-center text-base font-semibold text-white transition-all shadow-md shadow-sky-500/10"
                id="mobile-download-cta"
              >
                <Download className="h-5 w-5" />
                <span>Download Desktop App</span>
              </a>
            </div>
            
            {/* Paddle merchant compliance reminder inside mobile menu */}
            <div className="mt-4 flex items-center justify-center gap-1.5 px-4 text-center text-xs text-gray-400 dark:text-slate-500 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Paddle Merchant Compliant</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
