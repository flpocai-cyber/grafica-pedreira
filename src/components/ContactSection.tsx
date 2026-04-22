import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { company } from '../data/company'
import { SectionHeading } from './SectionHeading'

const contactCards = [
  { icon: Phone, label: 'Telefone', value: company.phone, href: `tel:${company.phone.replace(/\D/g, '')}` },
  { icon: Mail, label: 'E-mail', value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: 'Endereço', value: company.address, href: 'https://maps.google.com/?q=Rua+Issa+Camasmie,+79+-+Centro+-+Pedreira+-+SP' },
]

const googleMapsUrl =
  'https://maps.google.com/?q=Rua+Issa+Camasmie,+79+-+Centro+-+Pedreira+-+SP'

export const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Etiquetas',
    message: '',
  })

  const handleChange =
    (field: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = `Pedido de orçamento - ${form.service || 'Gráfica Pedreira'}`
    const body = [
      `Nome: ${form.name || '-'}`,
      `Telefone / WhatsApp: ${form.phone || '-'}`,
      `E-mail: ${form.email || '-'}`,
      `Serviço de interesse: ${form.service || '-'}`,
      '',
      'Mensagem:',
      form.message || '-',
    ].join('\n')

    window.location.href = `mailto:${company.purchaseEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contato" className="mx-auto w-[min(1180px,calc(100%-1.5rem))] py-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-soft backdrop-blur-xl">
          <SectionHeading
            eyebrow="contato"
            title="Solicite um orçamento com atendimento próximo e orientação técnica."
            description="A Gráfica Pedreira está pronta para atender empresas, marcas e demandas institucionais com agilidade e capricho."
          />

          <div className="mt-10 grid gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon

              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.label === 'Endereço' ? '_blank' : undefined}
                  rel={card.label === 'Endereço' ? 'noreferrer' : undefined}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-mist/[0.55]">{card.label}</p>
                    <p className="mt-2 text-sm leading-7 text-white">{card.value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-7 shadow-soft backdrop-blur-xl"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-mist/80">Nome</span>
              <input className="form-input" placeholder="Seu nome" value={form.name} onChange={handleChange('name')} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-mist/80">Telefone / WhatsApp</span>
              <input className="form-input" placeholder="(19) 99999-9999" value={form.phone} onChange={handleChange('phone')} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-mist/80">E-mail</span>
              <input className="form-input" type="email" placeholder="voce@empresa.com.br" value={form.email} onChange={handleChange('email')} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-mist/80">Serviço de interesse</span>
              <select className="form-input" value={form.service} onChange={handleChange('service')}>
                <option>Etiquetas</option>
                <option>Embalagens</option>
                <option>Folders e Flyers</option>
                <option>Cartões</option>
                <option>Outro projeto</option>
              </select>
            </label>
          </div>

          <label className="mt-4 grid gap-2">
            <span className="text-sm font-medium text-mist/80">Mensagem</span>
            <textarea
              className="form-input min-h-[160px] resize-none"
              placeholder="Conte um pouco sobre a sua necessidade e o tipo de material desejado."
              value={form.message}
              onChange={handleChange('message')}
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Enviar pedido de orçamento
            </button>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={16} />
              Falar no WhatsApp
            </a>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.05] transition hover:bg-white/[0.08]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-mist/[0.55]">localização</p>
                <p className="mt-2 text-sm font-medium text-white">Abrir no Google Maps</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan">
                <MapPin size={18} />
              </div>
            </div>
            <div className="relative h-56 w-full">
              <iframe
                title="Mapa da Gráfica Pedreira"
                src="https://www.google.com/maps?q=Rua%20Issa%20Camasmie,%2079%20-%20Centro%20-%20Pedreira%20-%20SP&z=17&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,18,0.04),rgba(13,15,18,0.18))]" />
            </div>
          </a>
        </motion.form>
      </div>
    </section>
  )
}
