import { AlertTriangle, Eye, ImagePlus, Trash2 } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioStore } from '../hooks/usePortfolioStore'
import type { PortfolioCategory, PortfolioItem } from '../types/portfolio'

type CategoryManagerProps = {
  category: PortfolioCategory
  onPreview: (item: PortfolioItem) => void
}

export const CategoryManager = ({ category, onPreview }: CategoryManagerProps) => {
  const { itemsByCategory, addImages, categoryLimit, removeItem, updateItemTitle } = usePortfolioStore()
  const [feedback, setFeedback] = useState<string>('')
  const items = itemsByCategory[category]
  const remaining = Math.max(categoryLimit - items.length, 0)

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) {
      return
    }

    const result = await addImages(category, files)

    if (result.error) {
      setFeedback(result.error)
    } else if (result.added === 0) {
      setFeedback('O limite de 20 imagens ja foi atingido nesta categoria.')
    } else if (result.rejected) {
      setFeedback(`Foram adicionadas ${result.added} imagens. O restante foi bloqueado pelo limite de 20.`)
    } else {
      setFeedback(`${result.added} imagem(ns) adicionada(s) com sucesso.`)
    }

    event.target.value = ''
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-soft backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan">{category}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl font-semibold text-white">{items.length}</span>
            <span className="text-sm text-mist/[0.65]">de {categoryLimit} imagens</span>
          </div>
        </div>

        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
          <ImagePlus size={16} />
          Upload de imagens
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={remaining === 0}
            onChange={handleUpload}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-mist/75">
          Restam {remaining} vagas nesta categoria
        </span>
        {remaining === 0 && (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-amber-200">
            <AlertTriangle size={14} />
            Limite atingido
          </span>
        )}
      </div>

      {feedback && <p className="mt-4 text-sm text-cyan">{feedback}</p>}

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {items.map((item) => (
          <motion.article
            key={item.id}
            layout
            className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#181b20]/90"
          >
            <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
            <div className="p-4">
              <input
                value={item.title}
                onChange={(event) => updateItemTitle(item.id, event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-mist/40 focus:border-cyan/40"
                placeholder="Titulo da imagem"
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => onPreview(item)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white"
                >
                  <Eye size={16} />
                  Visualizar
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-100"
              >
                <Trash2 size={16} />
                Remover
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
