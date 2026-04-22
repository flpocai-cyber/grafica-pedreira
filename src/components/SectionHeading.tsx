import { motion } from 'framer-motion'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
  >
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan">
      {eyebrow}
    </span>
    <h2 className="mt-6 font-display text-4xl leading-none text-white md:text-5xl">{title}</h2>
    <p className="mt-5 text-base leading-7 text-mist/80 md:text-lg">{description}</p>
  </motion.div>
)
