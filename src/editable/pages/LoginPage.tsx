import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, Heart, Image as ImageIcon } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#FBFADA] text-[#12372A]">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[1760px] items-center gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[1fr_0.88fr] lg:px-12">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#436850]"><Camera className="h-4 w-4" /> {pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#436850]">{pagesContent.auth.login.description}</p>
            <div className="mt-9 grid max-w-3xl gap-5 sm:grid-cols-3">
              {['Discover', 'Follow', 'Showcase'].map((label, index) => (
                <div key={label} className={`rounded-md p-5 ${index === 1 ? 'bg-[#12372A] text-[#FBFADA]' : 'border border-[#ADBC9F] bg-[#FBFADA] shadow-[0_3px_16px_rgba(18,55,42,0.08)]'}`}>
                  <ImageIcon className="h-5 w-5 text-[#436850]" />
                  <p className="mt-12 text-2xl font-extrabold tracking-[-0.05em]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-md border border-[#ADBC9F] bg-[#f3f2e4] p-5 shadow-[0_3px_18px_rgba(18,55,42,0.10)] sm:p-7">
            <div className="rounded-md bg-[#FBFADA] p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-[-0.04em]">{pagesContent.auth.login.formTitle}</h2>
                <Heart className="h-6 w-6 text-[#436850]" />
              </div>
              <EditableLocalLoginForm />
              <p className="mt-5 text-sm font-medium text-[#436850]">New here? <Link href="/signup" className="font-extrabold text-[#12372A] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            </div>
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
