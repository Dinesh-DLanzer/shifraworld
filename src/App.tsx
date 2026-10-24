import { useEffect } from 'react'
import { CartDrawer, WishlistDrawer } from './components/Drawers'
import { Toast, WhatsAppButton } from './components/Floating'
import { Header } from './components/Header'
import { MobileMenu } from './components/MobileMenu'
import { ProductQuickView } from './components/QuickView'
import { SearchOverlay } from './components/SearchOverlay'
import { BestSellers } from './sections/BestSellers'
import { BrandStory } from './sections/BrandStory'
import { CampaignBanners } from './sections/CampaignBanners'
import { CategoryShowcase } from './sections/CategoryShowcase'
import { CompleteTheLook } from './sections/CompleteTheLook'
import { EditorialBanner } from './sections/EditorialBanner'
import { Footer } from './sections/Footer'
import { HairAccessories } from './sections/HairAccessories'
import { HeroSlider } from './sections/HeroSlider'
import { InstagramGallery } from './sections/InstagramGallery'
import { JewelleryCollection } from './sections/JewelleryCollection'
import { NewArrivals } from './sections/NewArrivals'
import { SareeEdit } from './sections/SareeEdit'
import { Testimonials } from './sections/Testimonials'
import { StoreProvider } from './store'

/** Adds .is-visible to .reveal elements as they scroll into view (including ones rendered later) */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    const scan = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/** Desktop-only magnetic pull on elements with .magnetic */
function useMagnetic() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    let current: HTMLElement | null = null
    const move = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('.magnetic')
      if (current && current !== el) current.style.transform = ''
      current = el
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])
}

export default function App() {
  useScrollReveal()
  useMagnetic()
  return (
    <StoreProvider>
      <a href="#main" className="sr-only z-50 bg-gold px-4 py-2 text-plum focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroSlider />
        <CategoryShowcase />
        <SareeEdit />
        <EditorialBanner />
        <JewelleryCollection />
        <CompleteTheLook />
        <HairAccessories />
        <NewArrivals />
        <CampaignBanners />
        <BestSellers />
        <Testimonials />
        <InstagramGallery />
        <BrandStory />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProductQuickView />
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <MobileMenu />
      <Toast />
    </StoreProvider>
  )
}
