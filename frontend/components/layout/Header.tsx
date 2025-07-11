'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { title: 'Ana Sayfa', href: '/' },
        { title: 'Hakkımızda', href: '/about' },
        { title: 'Projeler', href: '/properties' },
        { title: 'Bize ulaşın', href: '/contact' },
        { title: 'Haberler', href: '/blog' },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                {/* Центрированный логотип и меню в один ряд */}
                <div className="hidden md:flex items-center justify-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/images/logo.png"
                                alt="Silpagar Grup"
                                fill
                                sizes="(max-width: 768px) 120px, 128px"
                                className="object-contain shadow-[0px_6px_10px_-5px_rgba(0,0,0,0.5)] rounded-full"
                            />
                        </div>
                    </Link>

                    {/* Навигация */}
                    <nav className="flex flex-wrap items-center gap-3">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        px-4 py-2 border-black rounded-xl shadow-[0px_6px_10px_-5px_rgba(0,0,0,0.5)] text-sm font-semibold fill-black text-black text-shadow-lg
                                        transition-all bg-[#F6F6F6] border-[1px]
                                        hover:-translate-y-1 hover:shadow-md hover:bg-yellow-400 hover:text-black
                                    `}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Mobile Navigation Button */}
                <div className="md:hidden flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <div className="relative w-16 h-16">
                            <Image
                                src="/images/logo.webp"
                                alt="Silpagar Grup"
                                fill
                                sizes="(max-width: 768px) 120px, 128px"
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    mobileMenuOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16M4 18h16'
                                }
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t flex flex-col items-center gap-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="w-full text-center px-4 py-2 border rounded-md shadow text-sm font-medium text-gray-800 hover:text-gray-900 hover:shadow-md hover:-translate-y-1 transition-all bg-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}
