'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-nav-bg': '#ffffff',
    '--editable-nav-text': '#080808',
    '--editable-border': '#e4e7eb',
    '--editable-container': '1840px',
  } as CSSProperties
  const desktopItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Image', href: '/image' },
  ]

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <nav className="mx-auto flex h-[70px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={SITE_CONFIG.name}>
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-auto max-w-[150px] object-contain" />
          <span className="text-xl font-extrabold tracking-[-0.04em]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {desktopItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link key={item.href} href={item.href} className={`inline-flex items-center gap-1.5 text-sm font-semibold transition hover:text-[#0057d9] ${active ? 'text-[#0057d9]' : 'text-black'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="ml-auto hidden h-10 min-w-0 items-center rounded-full border border-[#c9ced6] bg-white pl-4 pr-1 md:flex md:w-[340px] xl:w-[360px]">
          <button type="button" className="inline-flex items-center gap-1.5 border-r border-[#d7dbe1] pr-3 text-sm font-semibold">
            Photos <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <input name="q" type="search" placeholder="Search powered by AI" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-medium text-slate-600 outline-none placeholder:text-slate-500" />
          <button aria-label="Search" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3478f6] text-white">
            <Search className="h-4 w-4" />
          </button>
        </form>

        <div className="hidden items-center gap-5 lg:flex">
          {session ? (
            <>
              <Link href="/create" className="text-sm font-extrabold">Create</Link>
              <button type="button" onClick={logout} className="text-sm font-extrabold">Log out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-extrabold">Sign in</Link>
              <Link href="/signup" className="rounded-full border-2 border-black px-4 py-2 text-sm font-extrabold transition hover:bg-black hover:text-white">Sign up</Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-full border border-[#d7dbe1] p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-full border border-[#c9ced6] px-3 py-2">
            <Search className="mt-0.5 h-4 w-4 opacity-60" />
            <input name="q" type="search" placeholder="Search powered by AI" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[...desktopItems, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl border border-[#e4e7eb] px-4 py-3 text-sm font-bold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
