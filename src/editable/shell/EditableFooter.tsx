'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Image', '/image'],
    ['Sign in', '/login'],
    ['Sign up', '/signup'],
  ]

  return (
    <footer className="bg-[#12372A] text-[#FBFADA]">
      <div className="mx-auto max-w-[1320px] px-6 py-12">
        <div className="flex flex-col gap-8 border-b border-[#FBFADA]/30 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-20 w-auto max-w-[150px] object-contain" />
            <span className="text-xl font-extrabold">{SITE_CONFIG.name}</span>
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-extrabold text-[#FBFADA]/85 transition hover:text-[#FBFADA]">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-sm font-semibold text-[#FBFADA]/65">© {year} {SITE_CONFIG.name}</p>
          <Link href="/image" className="rounded-full bg-[#FBFADA] px-5 py-2 text-sm font-extrabold text-[#12372A]">Explore images</Link>
        </div>
      </div>
    </footer>
  )
}
