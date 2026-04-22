import { motion } from 'framer-motion'
import { Box, CreditCard, Package2, Sticker } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const services = [
  {
    icon: Sticker,
    iconClassName: 'text-[#00d9ff]',
    title: 'Etiquetas',
    description: 'Aplicações promocionais, identificação de produtos e materiais com excelente leitura visual.',
  },
  {
    icon: Package2,
    iconClassName: 'text-magenta',
    title: 'Embalagens',
    description: 'Projetos que unem proteção, presença de marca e acabamento para elevar a percepção do produto.',
  },
  {
    icon: Box,
    iconClassName: 'text-yellow',
    title: 'Folders e Flyers',
    description: 'Peças comerciais e institucionais para apresentar ofertas, serviços e diferenciais com clareza.',
  },
  {
    icon: CreditCard,
    iconClassName: 'text-white',
    title: 'Cartões',
    description: 'Cartões de visita com identidade profissional e opções de acabamento para causar boa impressão.',
  },
]

export const ServicesSection = () => (
  <section id="servicos" className="relative py-24">
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.24]"
        style={{ backgroundImage: "url('/maquina1.jpg')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,18,0.78),rgba(13,15,18,0.68))]" />
    </div>
    <div className="absolute inset-x-0 top-12 mx-auto h-px w-[min(1180px,calc(100%-1.5rem))] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    <div className="relative mx-auto w-[min(1180px,calc(100%-1.5rem))]">
      <SectionHeading
        eyebrow="serviços"
        title="Soluções gráficas para empresas que querem comunicar com mais presença."
        description="Organizamos as principais frentes da Gráfica Pedreira em uma vitrine clara, elegante e preparada para crescer junto com o negócio."
        align="center"
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-7 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan/30"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition group-hover:bg-white/[0.16] ${service.iconClassName}`}>
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist/75">{service.description}</p>
            </motion.article>
          )
        })}
      </div>
    </div>
  </section>
)
