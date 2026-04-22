import { AlertTriangle, ArrowDown, ArrowUp, Eye, ImagePlus, Trash2 } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import type { HeroSlide } from '../types/portfolio'
import { usePortfolioStore } from '../hooks/usePortfolioStore'

type HeroManagerProps = {
  onPreview: (item: HeroSlide) => void
}

export const HeroManager = ({ onPreview }: HeroManagerProps) => {
  const { addHeroImages, categoryLimit, heroSlides, moveHeroSlide, removeHeroSlide, updateHeroSlideTitle } =
    usePortfolioStore()
  const [feedback, setFeedback] = useState('')
  const remaining = Math.max(categoryLimit - heroSlides.length, 0)

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) {
      return
    }

    const result = await addHeroImages(files)

    if (result.error) {
      setFeedback(result.error)
    } else if (result.added === 0) {
      setFeedback('O limite de 20 imagens do topo ja foi atingido.')
    } else if (result.rejected) {
      setFeedback(`Foram adicionadas ${result.added} imagens. O restante foi bloqueado pelo limite.`)
    } else {
      setFeedback(`${result.added} imagem(ns) adicionada(s) ao topo.`)
    }

    event.target.value = ''
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-soft backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/70">Topo</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl font-semibold text-white">{heroSlides.length}</span>
            <span className="text-sm text-mist/[0.65]">de {categoryLimit} imagens</span>
          </div>
        </div>

        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
          <ImagePlus size={16} />
          Upload para o topo
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
          Restam {remaining} vagas para o hero
        </span>
        {remaining === 0 && (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-amber-200">
            <AlertTriangle size={14} />
            Limite atingido
          </span>
        )}
      </div>

      {feedback && <p className="mt-4 text-sm text-white/80">{feedback}</p>}

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {heroSlides.map((slide, index) => (
          <motion.article
            key={slide.id}
            layout
            className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#181b20]/90"
          >
            <img src={slide.image} alt={slide.title} className="h-52 w-full object-cover" />
            <div className="p-4">
              <input
                value={slide.title}
                onChange={(event) => updateHeroSlideTitle(slide.id, event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-mist/40"
                placeholder="Titulo da imagem"
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => moveHeroSlide(slide.id, 'up')}
                  disabled={index === 0}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Mover imagem para cima"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveHeroSlide(slide.id, 'down')}
                  disabled={index === heroSlides.length - 1}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Mover imagem para baixo"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onPreview(slide)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white"
                >
                  <Eye size={16} />
                  Visualizar
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeHeroSlide(slide.id)}
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
