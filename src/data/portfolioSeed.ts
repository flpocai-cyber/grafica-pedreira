import type { PortfolioCategory, PortfolioItem } from '../types/portfolio'

const createEntries = (category: PortfolioCategory, basePath: string, total: number, label: string) =>
  Array.from({ length: total }, (_, index) => ({
    id: `${category}-${index + 1}`.replace(/\s+/g, '-').toLowerCase(),
    category,
    title: `${label} ${String(index + 1).padStart(2, '0')}`,
    image: `${basePath}/${String(index + 1).padStart(2, '0')}.jpg`,
    createdAt: new Date(2025, index % 12, (index % 27) + 1).toISOString(),
  }))

export const buildSeedPortfolio = (): PortfolioItem[] => [
  ...createEntries('Etiquetas', '/portfolio/etiquetas', 3, 'Etiqueta'),
  ...createEntries('Embalagens', '/portfolio/embalagens', 5, 'Embalagem'),
  ...createEntries('Folders e Flyers', '/portfolio/folders-flyers', 6, 'Folder'),
  ...createEntries('Cartoes', '/portfolio/cartoes', 3, 'Cartao'),
  ...createEntries('Cintas', '/portfolio/cintas', 9, 'Cinta'),
  ...createEntries('Fotografia', '/portfolio/fotografia', 4, 'Fotografia'),
  ...createEntries('Catalogos', '/portfolio/catalogos', 14, 'Catalogo'),
  ...createEntries('Logotipos', '/portfolio/logotipos', 5, 'Logotipo'),
]
