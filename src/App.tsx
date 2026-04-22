import { Route, Routes } from 'react-router-dom'
import { AboutSection } from './components/AboutSection'
import { AdminRoute } from './components/AdminRoute'
import { CatalogSection } from './components/CatalogSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { PortfolioSection } from './components/PortfolioSection'
import { ServicesSection } from './components/ServicesSection'
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton'
import { AdminAuthProvider } from './hooks/useAdminAuth'
import { PortfolioProvider } from './hooks/usePortfolioStore'

const HomePage = () => (
  <div className="overflow-hidden">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <PortfolioSection />
    <CatalogSection />
    <ContactSection />
    <Footer />
  </div>
)

function App() {
  return (
    <AdminAuthProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-ink text-white">
          <Navbar />
          <FloatingWhatsAppButton />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminRoute />} />
          </Routes>
        </div>
      </PortfolioProvider>
    </AdminAuthProvider>
  )
}

export default App
