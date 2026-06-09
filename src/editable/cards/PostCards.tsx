import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-md bg-black text-white transition duration-300 hover:-translate-y-1">
      <div className="relative min-h-[440px] p-6 sm:p-8 lg:min-h-[560px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-end lg:min-h-[500px]">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">{label}</span>
          <h3 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.06em] sm:text-5xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-black">
            View photo <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[260px] shrink-0 overflow-hidden rounded-md bg-white transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-slate-100">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="py-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0057d9]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-tight tracking-[-0.04em] text-black">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0 rounded-md border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-xs font-extrabold text-white">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0057d9]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-tight tracking-[-0.04em] text-black">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 overflow-hidden rounded-md border border-slate-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className="relative aspect-[16/12] overflow-hidden rounded-md bg-slate-100 sm:aspect-auto sm:min-h-[190px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0057d9]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-black sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-black">Open article <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
