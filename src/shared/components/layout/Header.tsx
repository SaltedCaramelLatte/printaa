'use client';

/**
 * Header Component
 * Modern navigation header with scroll effects
 * Desktop has full navigation, Mobile presents clear brand identity
 */

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { ROUTES } from '@/config/navigation.config';
import { Navigation } from './Navigation';
import { cn } from '@/shared/utils/cn';
import { motion } from 'framer-motion';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-white border-b border-gray-200 shadow-sm'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Name */}
          <Link
            href={ROUTES.home}
            className="flex items-center space-x-3 group"
            aria-label="Print AA - Halaman Utama"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className={cn(
                'w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 shrink-0',
                'group-hover:shadow-xl group-hover:scale-105'
              )}
            >
              <Printer className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-gray-900 tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                Print AA
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                <span className="text-xs text-gray-500 font-medium leading-none">Percetakan & Fotokopi</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
