'use client';

/**
 * FloatingDock Component
 * "Liquid Glass" navigation pill that floats at the bottom of the screen on mobile devices.
 * Primary mobile navigation for Print AA.
 * On desktop, navigation is fully handled by Header.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/config/navigation.config';
import { cn } from '@/shared/utils/cn';
import { motion } from 'framer-motion';
import { Home, Info, Printer, Calculator, FileText } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Beranda', href: ROUTES.home, icon: Home },
    { label: 'Layanan', href: ROUTES.services, icon: Printer },
    { label: 'Kalkulator', href: ROUTES.calculator, icon: Calculator },
    { label: 'Tentang Kami', href: ROUTES.about, icon: Info },
    { label: 'Artikel', href: ROUTES.articles, icon: FileText },
];

export function FloatingDock(): JSX.Element {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden pointer-events-auto">
            <div className="relative group">
                {/* Liquid Glass Container - Optimized for mobile touch readability */}
                <nav
                    aria-label="Navigasi Utama Mobile"
                    className={cn(
                        "flex items-center gap-1 px-3 py-2",
                        "bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-2xl",
                        "rounded-full transition-all duration-300"
                    )}
                    style={{
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.14)',
                    }}
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive =
                            item.href === '/'
                                ? pathname === '/'
                                : pathname === item.href || pathname.startsWith(item.href + '/');
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative touch-manipulation focus:outline-none"
                                aria-label={item.label}
                                title={item.label}
                            >
                                <div
                                    className={cn(
                                        "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 active:scale-95",
                                        isActive ? "text-white" : "text-gray-600 hover:text-primary-600 active:text-primary-700"
                                    )}
                                >
                                    {/* Active Background Pill (Print AA Green Indicator) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary-600 rounded-full shadow-md shadow-primary-600/30"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <div className="relative z-10 flex items-center justify-center">
                                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
