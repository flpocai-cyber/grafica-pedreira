import { ArrowUpRight, BookOpen } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { company } from '../data/company'

export const CatalogSection = () => {
  return (
    <section id="catalogo" className="mx-auto w-[min(1180px,calc(100%-1.5rem))] py-24">
      <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.05] p-6 shadow-glass backdrop-blur-2xl md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="catalogo digital"
            title="Veja nosso catalogo em destaque."
            description=""
          />

          <a
            href={company.catalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.14]"
          >
            <BookOpen size={16} />
            Abrir catalogo em nova aba
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#101215] p-2 shadow-soft">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-black/30">
            <iframe
              src={company.catalogUrl}
              title="Catalogo digital Grafica Pedreira"
              className="h-[620px] w-full border-0 md:h-[760px]"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
