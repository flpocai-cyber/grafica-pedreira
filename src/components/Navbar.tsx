import { LogIn, LogOut, Menu, PhoneCall, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company } from '../data/company'
import { useAdminAuth } from '../hooks/useAdminAuth'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout } = useAdminAuth()
  const isAdmin = location.pathname === '/admin'
  const adminActionIcon = useMemo(() => (isAdmin && isAuthenticated ? <LogOut size={18} /> : <LogIn size={18} />), [isAdmin, isAuthenticated])

  const handleAdminAction = () => {
    if (isAdmin && isAuthenticated) {
      logout()
    }

    setOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(1180px,calc(100%-1.5rem))]"
      >
        <div className="rounded-full border border-white/[0.12] bg-white/10 px-4 py-3 shadow-glass backdrop-blur-2xl md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img
                src="/LOGO TEXTO BRANCO.png"
                alt="Logotipo Gráfica Pedreira"
                className="h-10 w-auto md:h-12"
              />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {!isAdmin &&
                navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-mist/[0.78] transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.16]"
              >
                <PhoneCall size={16} />
                {company.phone}
              </a>
              <Link
                to={isAdmin ? '/' : '/admin'}
                onClick={handleAdminAction}
                aria-label={isAdmin && isAuthenticated ? 'Sair do painel administrativo' : 'Entrar no painel administrativo'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition hover:bg-mist"
              >
                {adminActionIcon}
              </Link>
            </div>

            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/10 text-white lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl border border-white/[0.12] bg-[#0c1f31]/95 p-5 shadow-glass backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {!isAdmin &&
                navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white"
                  >
                    {item.label}
                  </a>
                ))}
              <Link
                to={isAdmin ? '/' : '/admin'}
                onClick={handleAdminAction}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink"
              >
                {isAdmin && isAuthenticated ? <LogOut size={16} /> : <LogIn size={16} />}
                {isAdmin && isAuthenticated ? 'Sair do painel' : 'Entrar no painel'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
