import { LockKeyhole, LogIn } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useAdminAuth } from '../hooks/useAdminAuth'

export const AdminLogin = () => {
  const { login } = useAdminAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const authenticated = login(username, password)

    if (!authenticated) {
      setError('Login ou senha invalidos.')
      return
    }

    setError('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#0f1114_0%,#171a1f_100%)] px-4 pt-24">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-glass backdrop-blur-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
          <LockKeyhole size={22} />
        </div>

        <h1 className="mt-6 font-display text-4xl text-white">Acesso administrativo</h1>
        <p className="mt-3 text-sm leading-7 text-mist/75">
          Entre com seu login e senha para gerenciar o portfolio da Grafica Pedreira.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-login" className="mb-2 block text-sm font-medium text-white/80">
              Login
            </label>
            <input
              id="admin-login"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-mist/40 focus:border-white/20"
              placeholder="Digite seu login"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-white/80">
              Senha
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-mist/40 focus:border-white/20"
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-200">{error}</p>}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            <LogIn size={16} />
            Entrar no painel
          </button>
        </form>
      </div>
    </main>
  )
}
