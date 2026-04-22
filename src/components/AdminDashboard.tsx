import { ImagePlus, LayoutDashboard, LibraryBig, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { company } from '../data/company'
import { usePortfolioStore } from '../hooks/usePortfolioStore'
import type { HeroSlide, PortfolioCategory, PortfolioItem } from '../types/portfolio'
import { CategoryManager } from './CategoryManager'
import { HeroManager } from './HeroManager'
import { LightboxModal } from './LightboxModal'

export const AdminDashboard = () => {
  const { categories, heroSlides, itemsByCategory, categoryLimit, items } = usePortfolioStore()
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'Topo'>('Topo')
  const [previewItem, setPreviewItem] = useState<PortfolioItem | HeroSlide | null>(null)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#0f1114_0%,#171a1f_100%)] px-3 pb-14 pt-28 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Painel do portfólio</p>
              <p className="text-xs uppercase tracking-[0.24em] text-mist/[0.55]">gestão interna</p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">visão geral</p>
            <div className="mt-4 grid gap-4">
              <div>
                <p className="text-4xl font-semibold text-white">{items.length}</p>
                <p className="text-sm text-mist/[0.65]">imagens atualmente no portfólio</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-mist/[0.72]">
                <Sparkles size={16} className="text-gold" />
                Limite de {categoryLimit} imagens por categoria
              </div>
              <div className="flex items-center gap-2 text-sm text-mist/[0.72]">
                <ImagePlus size={16} className="text-white" />
                {heroSlides.length} imagem(ns) na categoria topo
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => setActiveCategory('Topo')}
              className={`w-full rounded-[1.4rem] px-4 py-4 text-left transition ${
                activeCategory === 'Topo'
                  ? 'border border-white/20 bg-white text-ink'
                  : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">Topo</span>
                <span className={`text-sm ${activeCategory === 'Topo' ? 'text-ink/70' : 'text-mist/[0.65]'}`}>
                  {heroSlides.length}/{categoryLimit}
                </span>
              </div>
            </button>
            {categories.map((category) => {
              const isActive = category === activeCategory

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`w-full rounded-[1.4rem] px-4 py-4 text-left transition ${
                    isActive
                      ? 'border border-white/20 bg-white text-ink'
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{category}</span>
                    <span className={`text-sm ${isActive ? 'text-ink/70' : 'text-mist/[0.65]'}`}>
                      {itemsByCategory[category].length}/{categoryLimit}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-mist/[0.72]">
            <p className="font-semibold text-white">{company.name}</p>
            <p className="mt-2">{company.phone}</p>
            <p>{company.email}</p>
          </div>
        </aside>

        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                  <LibraryBig size={14} />
                  categoria ativa
                </p>
                <h1 className="mt-5 font-display text-5xl text-white">{activeCategory}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/75">
                  {activeCategory === 'Topo'
                    ? 'Adicione aqui as imagens que serão exibidas no carrossel da seção hero do site.'
                    : 'Faça upload, ajuste títulos, visualize a imagem ampliada e mantenha a vitrine do site sempre organizada.'}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-mist/[0.55]">ocupação da categoria</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {activeCategory === 'Topo' ? heroSlides.length : itemsByCategory[activeCategory].length}
                  <span className="text-lg text-mist/60"> / {categoryLimit}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {activeCategory === 'Topo' ? (
            <HeroManager onPreview={setPreviewItem} />
          ) : (
            <CategoryManager category={activeCategory} onPreview={setPreviewItem} />
          )}
        </section>
      </div>

      <LightboxModal item={previewItem} onClose={() => setPreviewItem(null)} />
    </main>
  )
}
