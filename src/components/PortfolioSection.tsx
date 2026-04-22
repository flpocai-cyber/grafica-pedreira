import { useDeferredValue, useMemo, useState, startTransition } from 'react'
import { Filter } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { usePortfolioStore } from '../hooks/usePortfolioStore'
import { ImageGrid } from './ImageGrid'
import { LightboxModal } from './LightboxModal'
import type { PortfolioCategory, PortfolioItem } from '../types/portfolio'

type PortfolioFilter = 'Todos' | PortfolioCategory

export const PortfolioSection = () => {
  const { items, itemsByCategory, categories, categoryLimit } = usePortfolioStore()
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('Todos')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const deferredFilter = useDeferredValue(activeFilter)

  const filteredItems = useMemo(() => {
    if (deferredFilter === 'Todos') {
      return categories
        .map((category) => items.find((item) => item.category === category))
        .filter((item): item is PortfolioItem => Boolean(item))
    }

    return items.filter((item) => item.category === deferredFilter)
  }, [categories, deferredFilter, items])

  return (
    <section id="portfolio" className="mx-auto w-[min(1180px,calc(100%-1.5rem))] py-24">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="portfolio"
            title="Conheca um pouco do nosso portfolio."
            description="Clique no menu ao lado e veja as categorias dos servicos que produzimos."
          />

          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5 shadow-soft backdrop-blur-xl lg:min-w-[420px]">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Filter size={16} className="text-cyan" />
              Menu de categorias
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {(['Todos', ...categories] as PortfolioFilter[]).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => startTransition(() => setActiveFilter(filter))}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'bg-white text-ink'
                      : 'border border-white/10 bg-white/[0.08] text-mist/[0.78] hover:bg-white/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5 shadow-soft backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-cyan">{category}</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-3xl font-semibold text-white">{itemsByCategory[category].length}</span>
                <span className="text-sm text-mist/[0.65]">/ {categoryLimit} imagens</span>
              </div>
            </article>
          ))}
        </div>

        <ImageGrid items={filteredItems} onSelect={setSelectedItem} />
      </div>

      <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  )
}
