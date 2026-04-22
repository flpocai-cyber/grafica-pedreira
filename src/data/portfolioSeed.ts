import { categoryList, type PortfolioCategory, type PortfolioItem } from '../types/portfolio'

const accents: Record<PortfolioCategory, { from: string; to: string; highlight: string }> = {
  Etiquetas: { from: '#10293e', to: '#1f7181', highlight: '#71e3ef' },
  Embalagens: { from: '#132338', to: '#8a6b2d', highlight: '#f2c76b' },
  'Folders e Flyers': { from: '#0e2235', to: '#4067a8', highlight: '#83bef7' },
  Cartoes: { from: '#101f30', to: '#3b4f68', highlight: '#dce7f4' },
  Cintas: { from: '#251a2f', to: '#7a4da1', highlight: '#ee9fff' },
  Fotografia: { from: '#1a2026', to: '#56616d', highlight: '#f5f7fb' },
  Catalogos: { from: '#162127', to: '#2a5d61', highlight: '#a8f1ec' },
  Logotipos: { from: '#241d13', to: '#87612f', highlight: '#ffd98c' },
}

const labels: Record<PortfolioCategory, string[]> = {
  Etiquetas: ['Linha Premium', 'Produto Artesanal'],
  Embalagens: ['Embalagem Institucional', 'Linha de Presente'],
  'Folders e Flyers': ['Campanha Comercial', 'Apresentacao Visual'],
  Cartoes: ['Identidade Profissional', 'Acabamento Especial'],
  Cintas: ['Cinta Promocional', 'Faixa de Produto'],
  Fotografia: ['Ensaio de Produto', 'Imagem Institucional'],
  Catalogos: ['Catalogo Comercial', 'Linha Editorial'],
  Logotipos: ['Marca Institucional', 'Sistema Visual'],
}

const createSvgDataUrl = (category: PortfolioCategory, title: string) => {
  const palette = accents[category]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.from}" />
          <stop offset="100%" stop-color="${palette.to}" />
        </linearGradient>
        <radialGradient id="glow" cx="20%" cy="15%" r="70%">
          <stop offset="0%" stop-color="${palette.highlight}" stop-opacity="0.58" />
          <stop offset="100%" stop-color="${palette.highlight}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="960" height="720" fill="url(#bg)" />
      <rect width="960" height="720" fill="url(#glow)" />
      <g opacity="0.24">
        <rect x="54" y="52" width="850" height="616" rx="40" fill="none" stroke="white" />
        <rect x="92" y="92" width="774" height="536" rx="28" fill="rgba(255,255,255,0.06)" />
      </g>
      <circle cx="790" cy="130" r="96" fill="rgba(255,255,255,0.08)" />
      <circle cx="150" cy="566" r="130" fill="rgba(255,255,255,0.06)" />
      <rect x="128" y="144" width="370" height="220" rx="28" fill="rgba(255,255,255,0.08)" />
      <rect x="522" y="200" width="210" height="210" rx="28" fill="rgba(255,255,255,0.1)" />
      <rect x="510" y="472" width="264" height="86" rx="43" fill="rgba(255,255,255,0.08)" />
      <rect x="156" y="444" width="274" height="30" rx="15" fill="rgba(255,255,255,0.14)" />
      <rect x="156" y="494" width="220" height="24" rx="12" fill="rgba(255,255,255,0.1)" />
      <circle cx="782" cy="532" r="44" fill="${palette.highlight}" fill-opacity="0.35" />
      <circle cx="710" cy="152" r="18" fill="${palette.highlight}" fill-opacity="0.55" />
      <text x="128" y="642" fill="white" opacity="0.68" font-size="28" font-family="Plus Jakarta Sans, sans-serif">
        ${category}  -  ${title}
      </text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const buildSeedPortfolio = (): PortfolioItem[] =>
  categoryList.flatMap((category) =>
    labels[category].map((title, index) => ({
      id: `${category}-${index + 1}`.replace(/\s+/g, '-').toLowerCase(),
      category,
      title,
      image: createSvgDataUrl(category, title),
      createdAt: new Date(2025, index, index + 3).toISOString(),
    })),
  )
