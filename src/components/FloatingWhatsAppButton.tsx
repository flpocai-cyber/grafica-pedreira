import { company } from '../data/company'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 fill-current">
    <path d="M19.11 17.23c-.27-.13-1.57-.77-1.81-.86c-.24-.09-.42-.13-.6.14c-.18.27-.69.86-.85 1.03c-.16.18-.31.2-.58.07c-.27-.13-1.14-.42-2.17-1.33c-.8-.72-1.34-1.61-1.49-1.88c-.16-.27-.02-.41.12-.54c.12-.12.27-.31.4-.47c.13-.16.18-.27.27-.45c.09-.18.04-.34-.02-.47c-.07-.13-.6-1.45-.82-1.98c-.22-.53-.44-.45-.6-.46h-.51c-.18 0-.47.07-.72.34c-.25.27-.94.92-.94 2.25s.96 2.61 1.09 2.79c.13.18 1.88 2.87 4.55 4.02c.64.28 1.14.45 1.53.58c.64.2 1.22.17 1.68.11c.51-.08 1.57-.64 1.79-1.26c.22-.63.22-1.16.15-1.27c-.07-.11-.24-.18-.51-.31Z" />
    <path d="M16.03 3.2c-7.06 0-12.77 5.71-12.77 12.75c0 2.25.59 4.45 1.72 6.39L3.2 28.8l6.62-1.73a12.8 12.8 0 0 0 6.2 1.58h.01c7.04 0 12.77-5.72 12.77-12.76c0-3.41-1.33-6.61-3.74-9.01A12.66 12.66 0 0 0 16.03 3.2Zm0 23.3h-.01a10.63 10.63 0 0 1-5.42-1.49l-.39-.23l-3.93 1.03l1.05-3.83l-.25-.4a10.57 10.57 0 0 1-1.63-5.63c0-5.86 4.76-10.62 10.61-10.62c2.83 0 5.49 1.1 7.49 3.1a10.54 10.54 0 0 1 3.11 7.5c0 5.86-4.77 10.62-10.63 10.62Z" />
  </svg>
)

export const FloatingWhatsAppButton = () => (
  <a
    href={company.salesWhatsappUrl}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-5 right-5 z-[80] inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(37,211,102,0.35)] transition hover:scale-[1.02] hover:bg-[#20bd5b] md:bottom-6 md:right-6"
  >
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
      <WhatsAppIcon />
    </span>
    <span className="hidden pr-1 sm:block">Fale agora com nossos vendedores</span>
  </a>
)
