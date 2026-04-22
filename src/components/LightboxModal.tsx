import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { HeroSlide, PortfolioItem } from '../types/portfolio'

type LightboxModalProps = {
  item: PortfolioItem | HeroSlide | null
  onClose: () => void
}

export const LightboxModal = ({ item, onClose }: LightboxModalProps) => (
  <AnimatePresence>
    {item && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-[#02080d]/80 px-4 py-10 backdrop-blur-md"
        onClick={onClose}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full items-center justify-center rounded-[2rem] border border-white/10 bg-[rgba(16,18,22,0.96)] p-4 shadow-glass md:p-6"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white"
              aria-label="Fechar imagem"
            >
              <X size={18} />
            </button>

            <img
              src={item.image}
              alt={item.title}
              className="max-h-[82vh] w-auto max-w-full rounded-[1.4rem] object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)
