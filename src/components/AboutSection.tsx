import { ShieldCheck, Sparkles, SwatchBook, Users2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'

const pillars = [
  {
    icon: ShieldCheck,
    iconClassName: 'text-[#00d9ff]',
    title: 'Mais de 50 anos de mercado',
    description: 'Uma história construída com confiança, regularidade e compromisso com cada entrega.',
  },
  {
    icon: Users2,
    iconClassName: 'text-magenta',
    title: 'Atendimento personalizado',
    description: 'Escutamos a necessidade de cada cliente para orientar o melhor material, formato e acabamento.',
  },
  {
    icon: SwatchBook,
    iconClassName: 'text-yellow',
    title: 'Variedade de materiais',
    description: 'Soluções gráficas para apresentação institucional, comunicação promocional e presença comercial.',
  },
  {
    icon: Sparkles,
    iconClassName: 'text-white',
    title: 'Qualidade de impressão',
    description: 'Capricho visual, consistência de cor e acabamento pensado para valorizar sua marca.',
  },
]

export const AboutSection = () => (
  <section id="sobre" className="mx-auto w-[min(1180px,calc(100%-1.5rem))] py-24">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
      <SectionHeading
        eyebrow="sobre a gráfica"
        title="Tradição local com linguagem visual à altura das marcas de hoje."
        description="A Gráfica Pedreira evolui sem perder a essência: proximidade no atendimento, experiência produtiva e materiais que apresentam negócios com mais valor."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon

          return (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-soft backdrop-blur-xl"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ${pillar.iconClassName}`}>
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-mist/75">{pillar.description}</p>
            </motion.article>
          )
        })}
      </div>
    </div>
  </section>
)
