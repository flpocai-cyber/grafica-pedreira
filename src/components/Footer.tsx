import { Link } from 'react-router-dom'
import { company } from '../data/company'

export const Footer = () => (
  <footer className="border-t border-white/10 bg-[#14171b]">
    <div className="mx-auto grid w-[min(1180px,calc(100%-1.5rem))] gap-8 py-10 md:grid-cols-[1.1fr_0.9fr]">
      <div>
        <img
          src="/LOGO TEXTO BRANCO.png"
          alt="Logotipo Gráfica Pedreira"
          className="h-12 w-auto"
        />
        <p className="mt-4 max-w-lg text-sm leading-7 text-mist/[0.72]">
          Tradição, qualidade de impressão e apresentação institucional moderna para empresas e marcas.
        </p>
        <p className="mt-4 text-sm text-mist/[0.72]">{company.address}</p>
      </div>

      <div className="grid gap-3 text-sm text-mist/[0.72] md:justify-self-end md:text-right">
        <a href={`tel:${company.phone.replace(/\D/g, '')}`}>{company.phone}</a>
        <a href={`mailto:${company.email}`}>{company.email}</a>
        <a href="#portfolio">Portfólio</a>
        <a href="#contato">Contato</a>
        <Link to="/admin">Painel administrativo</Link>
      </div>
    </div>
    <div className="border-t border-white/[0.08] py-4 text-center text-xs uppercase tracking-[0.24em] text-mist/[0.45]">
      © {new Date().getFullYear()} Gráfica Pedreira. Todos os direitos reservados.
    </div>
  </footer>
)
