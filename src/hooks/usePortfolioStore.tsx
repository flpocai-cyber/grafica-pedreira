import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { buildSeedPortfolio } from '../data/portfolioSeed'
import { categoryList, type HeroSlide, type PortfolioCategory, type PortfolioItem } from '../types/portfolio'

const STORAGE_KEY = 'grafica-pedreira-portfolio-v2'
const CATEGORY_LIMIT = 20
const MAX_IMAGE_SIZE = 1800
const IMAGE_QUALITY = 0.82
const IMAGE_OUTPUT_TYPE = 'image/jpeg'

type UploadResult = {
  added: number
  rejected: boolean
  error?: string
}

type PortfolioContextValue = {
  items: PortfolioItem[]
  heroSlides: HeroSlide[]
  categoryLimit: number
  categories: readonly PortfolioCategory[]
  addImages: (category: PortfolioCategory, files: File[]) => Promise<UploadResult>
  addHeroImages: (files: File[]) => Promise<UploadResult>
  moveHeroSlide: (slideId: string, direction: 'up' | 'down') => void
  removeItem: (itemId: string) => void
  removeHeroSlide: (slideId: string) => void
  updateItemTitle: (itemId: string, title: string) => void
  updateHeroSlideTitle: (slideId: string, title: string) => void
  itemsByCategory: Record<PortfolioCategory, PortfolioItem[]>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

const normalizeCategory = (category: string): PortfolioCategory => {
  const normalized = category
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()

  const categoryMap: Record<string, PortfolioCategory> = {
    etiquetas: 'Etiquetas',
    embalagens: 'Embalagens',
    'folders e flyers': 'Folders e Flyers',
    folders: 'Folders e Flyers',
    flyers: 'Folders e Flyers',
    cartoes: 'Cartoes',
    cintas: 'Cintas',
    fotografia: 'Fotografia',
    catalogos: 'Catalogos',
    logotipos: 'Logotipos',
  }

  return categoryMap[normalized] ?? 'Etiquetas'
}

const normalizePortfolioItems = (items: PortfolioItem[]) =>
  items.map((item) => ({
    ...item,
    category: normalizeCategory(item.category),
  }))

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Falha ao ler a imagem.'))
    reader.readAsDataURL(file)
  })

const loadImageElement = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Falha ao processar a imagem.'))
    image.src = src
  })

const canvasToDataUrl = (canvas: HTMLCanvasElement) =>
  new Promise<string>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Falha ao otimizar a imagem.'))
          return
        }

        const reader = new FileReader()
        reader.onloadend = () => resolve(String(reader.result))
        reader.onerror = () => reject(new Error('Falha ao ler a imagem otimizada.'))
        reader.readAsDataURL(blob)
      },
      IMAGE_OUTPUT_TYPE,
      IMAGE_QUALITY,
    )
  })

const optimizeImageForStorage = async (file: File) => {
  const source = await readFileAsDataUrl(file)
  const image = await loadImageElement(source)
  const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(image.width, image.height))
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Falha ao preparar a imagem para upload.')
  }

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, 0, 0, width, height)

  return canvasToDataUrl(canvas)
}

const buildUploadErrorMessage = (error: unknown) => {
  if (
    error instanceof DOMException &&
    (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  ) {
    return 'Essa imagem é muito pesada para salvar no navegador. Tente uma versão menor ou remova outras imagens antes.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Não foi possível salvar a imagem agora. Tente novamente.'
}

const loadInitialPortfolio = (): { items: PortfolioItem[]; heroSlides: HeroSlide[] } => {
  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return { items: buildSeedPortfolio(), heroSlides: [] }
  }

  try {
    const parsed = JSON.parse(raw) as
      | PortfolioItem[]
      | { items?: PortfolioItem[]; heroSlides?: HeroSlide[] }

    if (Array.isArray(parsed)) {
      return { items: normalizePortfolioItems(parsed), heroSlides: [] }
    }

    return {
      items: Array.isArray(parsed.items) ? normalizePortfolioItems(parsed.items) : buildSeedPortfolio(),
      heroSlides: Array.isArray(parsed.heroSlides) ? parsed.heroSlides : [],
    }
  } catch {
    return { items: buildSeedPortfolio(), heroSlides: [] }
  }
}

export const PortfolioProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState(() => loadInitialPortfolio())
  const { items, heroSlides } = store

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    } catch (error) {
      console.error('Erro ao salvar portfólio no navegador:', error)
    }
  }, [store])

  const itemsByCategory = useMemo(
    () =>
      categoryList.reduce(
        (acc, category) => {
          acc[category] = items.filter((item) => item.category === category)
          return acc
        },
        {} as Record<PortfolioCategory, PortfolioItem[]>,
      ),
    [items],
  )

  const value = useMemo<PortfolioContextValue>(
    () => ({
      items,
      heroSlides,
      categoryLimit: CATEGORY_LIMIT,
      categories: categoryList,
      itemsByCategory,
      removeItem: (itemId) => {
        setStore((current) => ({
          ...current,
          items: current.items.filter((item) => item.id !== itemId),
        }))
      },
      removeHeroSlide: (slideId) => {
        setStore((current) => ({
          ...current,
          heroSlides: current.heroSlides.filter((slide) => slide.id !== slideId),
        }))
      },
      updateItemTitle: (itemId, title) => {
        setStore((current) => ({
          ...current,
          items: current.items.map((item) => (item.id === itemId ? { ...item, title } : item)),
        }))
      },
      updateHeroSlideTitle: (slideId, title) => {
        setStore((current) => ({
          ...current,
          heroSlides: current.heroSlides.map((slide) =>
            slide.id === slideId ? { ...slide, title } : slide,
          ),
        }))
      },
      addImages: async (category, files) => {
        const currentItems = itemsByCategory[category] ?? []
        const availableSlots = Math.max(CATEGORY_LIMIT - currentItems.length, 0)
        const acceptedFiles = files.slice(0, availableSlots)

        if (acceptedFiles.length === 0) {
          return { added: 0, rejected: true }
        }

        try {
          const images = await Promise.all(acceptedFiles.map(optimizeImageForStorage))
          const created = images.map<PortfolioItem>((image, index) => ({
            id: crypto.randomUUID(),
            category,
            title: acceptedFiles[index].name.replace(/\.[^.]+$/, ''),
            image,
            createdAt: new Date().toISOString(),
          }))

          setStore((current) => ({
            ...current,
            items: [...created, ...current.items],
          }))

          return { added: created.length, rejected: acceptedFiles.length !== files.length }
        } catch (error) {
          return {
            added: 0,
            rejected: acceptedFiles.length !== files.length,
            error: buildUploadErrorMessage(error),
          }
        }
      },
      addHeroImages: async (files) => {
        const availableSlots = Math.max(CATEGORY_LIMIT - heroSlides.length, 0)
        const acceptedFiles = files.slice(0, availableSlots)

        if (acceptedFiles.length === 0) {
          return { added: 0, rejected: true }
        }

        try {
          const images = await Promise.all(acceptedFiles.map(optimizeImageForStorage))
          const created = images.map<HeroSlide>((image, index) => ({
            id: crypto.randomUUID(),
            title: acceptedFiles[index].name.replace(/\.[^.]+$/, ''),
            image,
            createdAt: new Date().toISOString(),
          }))

          setStore((current) => ({
            ...current,
            heroSlides: [...created, ...current.heroSlides],
          }))

          return { added: created.length, rejected: acceptedFiles.length !== files.length }
        } catch (error) {
          return {
            added: 0,
            rejected: acceptedFiles.length !== files.length,
            error: buildUploadErrorMessage(error),
          }
        }
      },
      moveHeroSlide: (slideId, direction) => {
        setStore((current) => {
          const currentIndex = current.heroSlides.findIndex((slide) => slide.id === slideId)

          if (currentIndex === -1) {
            return current
          }

          const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

          if (targetIndex < 0 || targetIndex >= current.heroSlides.length) {
            return current
          }

          const reordered = [...current.heroSlides]
          const [movedItem] = reordered.splice(currentIndex, 1)
          reordered.splice(targetIndex, 0, movedItem)

          return {
            ...current,
            heroSlides: reordered,
          }
        })
      },
    }),
    [heroSlides, items, itemsByCategory],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export const usePortfolioStore = () => {
  const context = useContext(PortfolioContext)

  if (!context) {
    throw new Error('usePortfolioStore must be used inside PortfolioProvider')
  }

  return context
}
