import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[1760px] items-center gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[0.88fr_1fr] lg:px-12">
          <section className="order-2 rounded-md border border-slate-200 bg-[#f7f8fa] p-5 shadow-[0_3px_18px_rgba(15,23,42,0.10)] sm:p-7 lg:order-1">
            <div className="rounded-md bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-extrabold tracking-[-0.04em]">{pagesContent.auth.signup.formTitle}</h1>
                <UserPlus className="h-6 w-6 text-[#2c73d8]" />
              </div>
              <EditableLocalSignupForm />
              <p className="mt-5 text-sm font-medium text-slate-600">Already have an account? <Link href="/login" className="font-extrabold text-black underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
          </section>

          <div className="order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0057d9]"><Camera className="h-4 w-4" /> {pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
