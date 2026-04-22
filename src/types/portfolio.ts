export const categoryList = [
  'Etiquetas',
  'Embalagens',
  'Folders e Flyers',
  'Cartoes',
  'Cintas',
  'Fotografia',
  'Catalogos',
  'Logotipos',
] as const

export type PortfolioCategory = (typeof categoryList)[number]

export type PortfolioItem = {
  id: string
  category: PortfolioCategory
  title: string
  image: string
  createdAt?: string
}

export type HeroSlide = {
  id: string
  title: string
  image: string
  createdAt?: string
}
