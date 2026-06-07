'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      {/* Skip to main content for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-md focus:text-sm"
      >
        Skip to main content
      </a>

      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:text-blue-500 transition-colors duration-200 cursor-pointer"
          aria-label="Akbota — Home"
        >
          <span className="text-xl font-bold text-blue-500">AB</span>
          <span className="hidden sm:inline text-base tracking-tight">Akbota</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-200 cursor-pointer ${
                  isActive(href)
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: theme + language + mobile menu */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="text-blue-500 font-bold">AB</span>
                  <span className="ml-2">Akbota</span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="mt-6">
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map(({ key, href }) => (
                    <li key={key}>
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2.5 rounded-md text-sm transition-colors duration-200 cursor-pointer ${
                          isActive(href)
                            ? 'text-foreground font-semibold bg-muted'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        aria-current={isActive(href) ? 'page' : undefined}
                      >
                        {t(key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
