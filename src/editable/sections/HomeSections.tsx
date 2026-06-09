import Link from 'next/link'
import { ArrowRight, CalendarDays, Heart, Image as ImageIcon, Search, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const sectionShell = 'mx-auto w-full max-w-[1760px] px-4 sm:px-8 lg:px-12'

function imageAt(posts: SitePost[], index: number) {
  return getEditablePostImage(posts[index % Math.max(posts.length, 1)])
}

function hrefFor(task: TaskKey, route: string, post?: SitePost) {
  return post ? postHref(task, post, route) : route
}

function SectionHeader({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold tracking-[-0.04em] text-black">{title}</h2>
        <p className="mt-2 text-sm font-medium text-slate-600">{subtitle}</p>
      </div>
      <Link href={href} className="hidden items-center gap-2 text-base font-extrabold text-[#0057d9] sm:inline-flex">
        View All <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function PhotoTile({ post, href, className = '', overlay = false, tall = false }: { post: SitePost; href: string; className?: string; overlay?: boolean; tall?: boolean }) {
  return (
    <Link href={href} className={`group relative block overflow-hidden rounded-md bg-slate-100 ${tall ? 'aspect-[4/3] sm:aspect-[3/4]' : 'aspect-[16/11]'} ${className}`}>
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      {overlay ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-white">
            <span className="line-clamp-1 text-sm font-extrabold">{post.title}</span>
            <Heart className="h-6 w-6 shrink-0" />
          </div>
        </>
      ) : null}
    </Link>
  )
}

function QuestCard({ post, href, daysLeft }: { post: SitePost; href: string; daysLeft: number }) {
  return (
    <Link href={href} className="group block w-[310px] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.10)] sm:w-[420px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="line-clamp-1 text-base font-extrabold">{post.title}</h3>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700"><CalendarDays className="h-4 w-4" /> {daysLeft} days left</span>
      </div>
      <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-slate-100">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
    </Link>
  )
}

function GalleryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const images = [0, 1, 2, 3].map((offset) => imageAt([post], offset))
  return (
    <Link href={href} className="group block w-[430px] shrink-0 rounded-md border border-slate-200 bg-white p-4 shadow-[0_3px_16px_rgba(15,23,42,0.14)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{getEditableCategory(post)}</h3>
        <span className="inline-flex items-center gap-1 rounded bg-[#4b3f81] px-2 py-1 text-xs font-extrabold text-white"><ImageIcon className="h-3.5 w-3.5" /> {22 + index * 7}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {images.map((image, imgIndex) => <img key={`${image}-${imgIndex}`} src={image} alt="" className="aspect-[4/3] rounded-md object-cover" />)}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold">{post.title}</span>
        <Heart className="h-6 w-6" />
      </div>
    </Link>
  )
}

function StoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group relative block w-[390px] shrink-0 overflow-hidden rounded-md bg-black text-white sm:w-[430px]">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[520px] w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-6 top-8">
        <h3 className="max-w-[330px] text-3xl font-extrabold leading-tight tracking-[-0.05em]">{index === 0 ? 'Monochrome Madness' : index === 1 ? 'Feeling Shady' : index === 2 ? 'Blending In' : 'Explore Mode'}</h3>
        <div className="mt-5 h-1 w-12 rounded bg-white" />
        <p className="mt-4 line-clamp-3 text-sm font-semibold leading-6">{getEditableExcerpt(post, 140) || 'Curated visual collections for creative browsing and portfolio discovery.'}</p>
      </div>
      <Heart className="absolute bottom-8 right-8 h-7 w-7" />
      {index > 0 ? <span className="absolute bottom-8 left-8 rounded bg-white px-3 py-1 text-xs font-extrabold text-[#0086a8]">{35 + index * 19} NEW!</span> : null}
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const hero = posts[0]
  if (!hero) return null
  return (
    <section className={`${sectionShell} pb-14 pt-7`}>
      <div className="relative min-h-[380px] overflow-hidden rounded-2xl bg-black text-white lg:min-h-[430px]">
        <img src={getEditablePostImage(hero)} alt={hero.title} className="absolute inset-0 h-full w-full object-cover opacity-72" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/30 to-transparent" />
        <div className="relative z-10 flex min-h-[380px] max-w-3xl flex-col justify-center px-8 py-10 sm:px-16 lg:min-h-[430px]">
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">The World's Best Photography Is Here</h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-8">Join a global community of visual creators sharing remarkable images and showcasing their best work.</p>
          <Link href="/signup" className="mt-7 inline-flex w-fit rounded-full bg-white px-7 py-3 text-base font-extrabold text-black">Sign up for free</Link>
        </div>
        <span className="absolute bottom-3 right-5 text-xs font-extrabold">Photo by {hero.title}</span>
      </div>
      <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.38fr_0.62fr]">
        <div className="grid h-[324px] grid-cols-3 gap-3 overflow-hidden bg-black p-10">
          {posts.slice(1, 7).map((post, index) => (
            <div key={post.id || post.slug} className={`relative overflow-hidden rounded ${index % 2 ? 'row-span-2' : ''}`}>
              <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
              <span className="absolute bottom-2 left-2 rounded bg-[#00d6d1] px-2 py-1 text-[10px] font-extrabold text-black">$100</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-2xl font-extrabold tracking-[-0.04em]">Why join the world's best photography community?</p>
          <h2 className="mt-6 text-5xl font-extrabold leading-tight tracking-[-0.06em]">Compete & Get Recognized</h2>
          <p className="mt-5 max-w-4xl text-lg font-medium leading-8 text-slate-800">Join contests, take on creative challenges, and showcase your talent. Improve your skills, gain exposure, and connect with people who care about strong visual work.</p>
          <Link href={primaryRoute} className="mt-7 inline-flex rounded-full bg-black px-7 py-3 text-base font-extrabold text-white">Sign up for free</Link>
          <div className="mt-9 flex gap-6 pl-4"><span className="h-1.5 w-4 rounded bg-black" /><span className="h-1.5 w-1.5 rounded-full border border-slate-400" /><span className="h-1.5 w-1.5 rounded-full border border-slate-400" /></div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const popular = posts.slice(0, 12)
  if (!popular.length) return null
  return (
    <section className={`${sectionShell} py-8`}>
      <SectionHeader title="Popular Photos" subtitle="New uploads with the strongest community response" href={primaryRoute} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popular.slice(0, 4).map((post) => <PhotoTile key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {popular.slice(4, 9).map((post) => <PhotoTile key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} overlay />)}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const winners = posts.slice(2, 14)
  if (!winners.length) return null
  return (
    <>
      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Quest Winning Photos" subtitle="Recent winning photos and profile highlights" href={primaryRoute} />
        <div className="flex gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {winners.slice(0, 5).map((post) => <PhotoTile key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} overlay className="w-[360px] shrink-0 sm:w-[420px]" />)}
        </div>
        <div className="mx-auto h-1.5 w-44 rounded-full bg-slate-100"><div className="h-full w-16 rounded-full bg-black" /></div>
      </section>

      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Editors' Choice" subtitle="Photos hand-selected for composition, character, and mood" href={primaryRoute} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {winners.slice(3, 11).map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative block aspect-[16/11] overflow-hidden rounded-md bg-slate-100">
              <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-3 top-3 rounded bg-black/75 p-1.5 text-[#ff9d2e]"><Star className="h-4 w-4 fill-current" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const active = pool.slice(0, 8)
  if (!active.length) return null
  return (
    <>
      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Active Quests" subtitle="Creative challenges currently open for entries" href={primaryRoute} />
        <div className="flex gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active.slice(0, 4).map((post, index) => <QuestCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} daysLeft={22 + index * 3} />)}
        </div>
      </section>

      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Upcoming Photos" subtitle="Photos with an increasing Pulse rating" href={primaryRoute} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {active.slice(0, 4).map((post) => <PhotoTile key={post.id || post.slug} post={post} href={hrefFor(primaryTask, primaryRoute, post)} overlay={post === active[0]} />)}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {active.slice(3, 8).map((post) => <PhotoTile key={post.id || post.slug} post={post} href={hrefFor(primaryTask, primaryRoute, post)} />)}
        </div>
      </section>

      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Featured Galleries" subtitle="Must-see galleries curated by the community" href={primaryRoute} />
        <div className="flex gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active.slice(0, 4).map((post, index) => <GalleryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </section>

      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Top Categories" subtitle="This week's top categories ranked by popularity" href={primaryRoute} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {['Landscapes', 'Animals', 'City and Architecture', 'Nature', 'Black and White', 'Macro', 'People', 'Other'].map((label, index) => (
            <Link key={label} href={`${primaryRoute}?category=${encodeURIComponent(label.toLowerCase())}`} className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md bg-black text-white">
              <img src={imageAt(active, index)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 blur-[0.2px] transition duration-500 group-hover:scale-105" />
              <span className="relative z-10 text-2xl font-extrabold tracking-[-0.05em] drop-shadow">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${sectionShell} py-10`}>
        <SectionHeader title="Featured Photographers" subtitle="Photographers we think you should check out" href="/profile" />
        <div className="flex gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active.slice(0, 5).map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`w-[330px] shrink-0 rounded-md border bg-white p-4 text-center shadow-[0_3px_14px_rgba(15,23,42,0.12)] ${index === 1 ? 'border-[#00d6d1] ring-1 ring-[#00d6d1]' : 'border-slate-200'}`}>
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((offset) => <img key={offset} src={imageAt([post], offset)} alt="" className="aspect-[4/3] rounded-md object-cover" />)}
              </div>
              <img src={getEditablePostImage(post)} alt="" className="mx-auto -mt-8 h-16 w-16 rounded-full border-4 border-white object-cover" />
              <h3 className="mt-4 text-xl font-extrabold">{post.title}</h3>
              <p className="mt-1 line-clamp-1 text-base text-slate-700">{getEditableCategory(post)}</p>
              <span className="mt-6 inline-flex rounded-full bg-[#2c73d8] px-7 py-3 text-base font-extrabold text-white">Follow</span>
            </Link>
          ))}
        </div>
        <div className="mx-auto h-1.5 w-52 rounded-full bg-slate-100"><div className="h-full w-16 rounded-full bg-black" /></div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className={`${sectionShell} py-12`}>
      <SectionHeader title="Mood Galleries" subtitle="Curated content to match your current vibe" href="/image" />
      <div className="flex gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SITE_CONFIG.tasks.slice(0, 4).map((task, index) => (
          <StoryCard key={task.key} post={{ id: task.key, slug: task.key, title: task.label, summary: SITE_CONFIG.description, content: {}, media: [] } as SitePost} href={task.route} index={index} />
        ))}
      </div>
      <form action="/search" className="mx-auto mt-4 flex max-w-xl rounded-full border border-slate-300 bg-white p-1">
        <input name="q" placeholder="Search visual stories" className="min-w-0 flex-1 bg-transparent px-5 text-sm font-medium outline-none" />
        <button className="inline-flex items-center gap-2 rounded-full bg-[#3478f6] px-5 py-3 text-sm font-extrabold text-white"><Search className="h-4 w-4" /> Search</button>
      </form>
    </section>
  )
}
