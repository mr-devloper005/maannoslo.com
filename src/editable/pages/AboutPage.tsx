import Link from 'next/link'
import { Camera, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'
import type { SitePost } from '@/lib/site-connector'

function VisualPostCard({ post, title, href }: { post?: SitePost; title: string; href: string }) {
  const image = post ? getEditablePostImage(post) : '/placeholder.svg?height=900&width=1200'
  const label = post?.title || title
  const excerpt = post ? getEditableExcerpt(post, 96) : 'Explore related visual posts and profile work from the public collection.'

  return (
    <Link href={post?.slug ? `${href}/${post.slug}` : href} className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-slate-100 text-black shadow-[0_3px_18px_rgba(15,23,42,0.12)]">
      <img src={image} alt={label} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <div className="absolute inset-x-5 bottom-5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#2c73d8]">
          <ImageIcon className="h-5 w-5" />
        </div>
        <p className="line-clamp-2 text-2xl font-extrabold tracking-[-0.05em] text-white">{title}</p>
        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white/82">{excerpt}</p>
      </div>
    </Link>
  )
}

export default async function AboutPage() {
  const imagePosts = await fetchTaskPosts('image', 3, { allowMockFallback: true })
  const values = pagesContent.about.values.length ? pagesContent.about.values : [
    { title: 'Visual-first discovery', description: 'A clean place to browse images, profiles, and creative work without getting lost in clutter.' },
    { title: 'Creator profiles', description: 'Portfolio-friendly pages help people understand the person behind the work.' },
    { title: 'Simple publishing', description: 'Every section keeps the same direct rhythm so visitors can move quickly from image to profile.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto max-w-[1760px] px-4 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-10 border-b border-slate-200 pb-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0057d9]"><Camera className="h-4 w-4" /> {pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700">{pagesContent.about.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/image" className="rounded-full bg-black px-6 py-3 text-sm font-extrabold text-white">Explore images</Link>
                
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <VisualPostCard post={imagePosts[0]} title="Image-led browsing" href="/image" />
              <div className="mt-10">
                <VisualPostCard post={imagePosts[1]} title="Related image posts" href="/image" />
              </div>
            </div>
          </div>

          <section className="grid gap-10 py-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.04em]">What this space is for</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">A public visual directory should feel direct, useful, and image-rich. This layout keeps that rhythm across every page.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {values.map((value) => (
                <article key={value.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_3px_16px_rgba(15,23,42,0.08)]">
                  <CheckCircle2 className="h-5 w-5 text-[#2c73d8]" />
                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.04em]">{value.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{value.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-t border-slate-200 pt-10 lg:grid-cols-3">
            {pagesContent.about.paragraphs.slice(0, 3).map((paragraph, index) => (
              <p key={paragraph} className={`text-base font-medium leading-8 text-slate-700 ${index === 0 ? 'lg:col-span-2' : ''}`}>{paragraph}</p>
            ))}
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
