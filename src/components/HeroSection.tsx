import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { company } from '../data/company'
import { usePortfolioStore } from '../hooks/usePortfolioStore'

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { heroSlides } = usePortfolioStore()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = heroSlides.length > 0 ? heroSlides : [{ id: 'default-hero', title: 'Imagem padrão', image: '/FRENTE.jfif' }]

  useEffect(() => {
    setActiveSlide(0)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative overflow-hidden bg-hero-grid pb-20 pt-36 text-white md:pb-28 md:pt-40"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 origin-center will-change-transform">
        <img
          src="/FRENTE.jfif"
          alt="Fachada da Gráfica Pedreira"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,15,0.84)_0%,rgba(10,12,15,0.72)_34%,rgba(14,16,19,0.5)_62%,rgba(14,16,19,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(143,148,155,0.12),transparent_18%)]" />
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[8%] top-[20%] h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[10%] top-[16%] h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[8%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-[min(1180px,calc(100%-1.5rem))] gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan backdrop-blur-xl">
            Um novo conceito em impressão
          </span>
          <h1 className="mt-7 font-montserrat text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
            Impressos que valorizam sua marca há mais de 50 anos.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-mist/80">
            A Gráfica Pedreira une experiência, acabamento cuidadoso e atendimento
            personalizado para transformar materiais gráficos em presença de marca.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Solicitar orçamento
              <ArrowRight size={16} />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.08] px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              Ver portfólio
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-mist/[0.72]">
            <span>Qualidade de impressão e acabamento</span>
            <span>Materiais para empresas e marcas</span>
            <span>{company.phone}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2.2rem] border border-white/[0.14] bg-white/[0.08] p-5 shadow-glass backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))]">
              <div className="relative aspect-[4/5] md:aspect-[4/4.3]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slides[activeSlide]?.id}
                    src={slides[activeSlide]?.image}
                    alt="Imagem em destaque no topo"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,17,0.08),rgba(12,14,17,0.18))]" />
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-5">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Ver imagem ${index + 1}`}
                      className={`h-2.5 rounded-full transition ${
                        activeSlide === index ? 'w-8 bg-white' : 'w-2.5 bg-white/45'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
