'use client'

import { Camera, Image as ImageIcon, Mail, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: ImageIcon, title: 'Image submissions', body: 'Share questions about image posts, visual collections, or portfolio presentation.' },
    { icon: Sparkles, title: 'Profile support', body: 'Get help shaping a profile page, creator listing, or professional showcase.' },
    { icon: MessageCircle, title: 'General requests', body: 'Send notes about collaborations, corrections, or public page updates.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto max-w-[1760px] px-4 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0057d9]"><Camera className="h-4 w-4" /> {pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">{pagesContent.contact.title}</h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700">{pagesContent.contact.description}</p>

              <div className="mt-9 grid gap-4">
                {lanes.map((lane) => (
                  <article key={lane.title} className="rounded-md border border-slate-200 bg-white p-5 shadow-[0_3px_16px_rgba(15,23,42,0.08)]">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4ff] text-[#2c73d8]"><lane.icon className="h-5 w-5" /></span>
                      <div>
                        <h2 className="text-xl font-extrabold tracking-[-0.04em]">{lane.title}</h2>
                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{lane.body}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-3 text-sm font-extrabold text-slate-700 sm:grid-cols-2">
                <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-[#2c73d8]" /> Fast response workflow</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#2c73d8]" /> Remote-friendly support</span>
              </div>
            </div>

            <section className="rounded-md border border-slate-200 bg-[#f7f8fa] p-4 shadow-[0_3px_18px_rgba(15,23,42,0.10)] sm:p-6 lg:p-8">
              <h2 className="text-2xl font-extrabold tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">Send a clear note and the team can route it to the right place.</p>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </section>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
