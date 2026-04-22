import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import type { PortfolioItem } from '../types/portfolio'

type ImageGridProps = {
  items: PortfolioItem[]
  onSelect: (item: PortfolioItem) => void
}

export const ImageGrid = ({ items, onSelect }: ImageGridProps) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {items.map((item, index) => (
      <motion.button
        key={item.id}
        type="button"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        onClick={() => onSelect(item)}
        className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.06] text-left shadow-soft"
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06131d] via-[#06131d]/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan">{item.category}</p>
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white">
              <Expand size={16} />
            </span>
          </div>
        </div>
      </motion.button>
    ))}
  </div>
)
