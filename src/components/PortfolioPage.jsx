import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import categories from '../portfolioImages'
import logo from '../assets/antica-logo.png'

function PortfolioNav({ onBack }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(175,148,77,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-12">
        <Link to="/" className="relative z-10 -ml-3 flex items-center gap-3 sm:-ml-4 lg:-ml-6">
          <img src={logo} alt="Antica Venetian Plaster" className="h-14 w-auto sm:h-16 lg:h-20" />
        </Link>
        {onBack && (
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 border-none bg-transparent text-xs font-medium tracking-[0.15em] uppercase text-charcoal/60 transition-colors hover:text-gold"
          >
            <ChevronLeft size={16} />
            All Finishes
          </button>
        )}
        <Link
          to="/#contact"
          className="hidden cursor-pointer border border-gold bg-transparent px-6 py-2.5 text-xs font-medium tracking-[0.2em] uppercase text-gold transition-all hover:bg-gold hover:text-ivory no-underline md:block"
        >
          Request Quote
        </Link>
      </nav>
    </motion.header>
  )
}

function CategoryTile({ category, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
        <img
          src={category.cover}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-opacity duration-500" />
        <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-gold/30 group-hover:m-3" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="mb-1.5 text-[10px] font-medium tracking-[0.25em] uppercase text-gold-light sm:text-xs">
            {category.subtitle}
          </p>
          <h3 className="font-serif text-2xl font-light tracking-wide text-ivory sm:text-3xl">
            {category.name}
          </h3>
          <div className="mt-3 h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-16" />
          <span className="mt-4 inline-block border border-ivory/30 bg-charcoal/40 px-5 py-2 text-[10px] font-medium tracking-[0.25em] uppercase text-ivory backdrop-blur-sm sm:text-xs lg:hidden">
            View Gallery
          </span>
        </div>

        <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:flex">
          <span className="border border-ivory/30 bg-charcoal/50 px-6 py-2.5 text-[10px] font-medium tracking-[0.25em] uppercase text-ivory backdrop-blur-sm sm:text-xs">
            View Gallery
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ images, current, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 cursor-pointer border-none bg-transparent p-2 text-ivory/60 transition-colors hover:text-ivory sm:right-8 sm:top-8"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer border border-ivory/20 bg-charcoal/50 p-3 text-ivory/60 transition-all hover:border-gold hover:text-gold sm:left-6"
        aria-label="Previous"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer border border-ivory/20 bg-charcoal/50 p-3 text-ivory/60 transition-all hover:border-gold hover:text-gold sm:right-6"
        aria-label="Next"
      >
        <ArrowRight size={20} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="max-h-[85vh] max-w-[90vw] object-contain sm:max-w-[80vw]"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-light tracking-widest text-ivory/40 sm:bottom-8">
        {current + 1} / {images.length}
      </div>
    </motion.div>
  )
}

function GalleryView({ category, onBack }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((p) => (p - 1 + category.images.length) % category.images.length)
  const nextImage = () => setLightboxIndex((p) => (p + 1) % category.images.length)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <PortfolioNav onBack={onBack} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-ivory pt-28 sm:pt-32"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 sm:mb-16"
          >
            <button
              onClick={onBack}
              className="mb-8 flex cursor-pointer items-center gap-2 border-none bg-transparent text-xs font-medium tracking-[0.15em] uppercase text-charcoal/40 transition-colors hover:text-gold sm:mb-10"
            >
              <ChevronLeft size={14} />
              Back to All Finishes
            </button>

            <p className="mb-3 text-[10px] font-medium tracking-[0.35em] uppercase text-gold sm:text-xs">
              {category.subtitle}
            </p>
            <h1 className="font-serif text-4xl font-light tracking-wide text-charcoal sm:text-5xl md:text-6xl">
              {category.name}
            </h1>
            <div className="mt-4 h-px w-16 bg-gold/50" />
            <p className="mt-6 max-w-3xl text-sm font-light leading-[1.9] tracking-wide text-charcoal/60 sm:text-base">
              {category.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="columns-1 gap-4 pb-20 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6"
          >
            {category.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                className="group mb-4 cursor-pointer break-inside-avoid overflow-hidden sm:mb-5 lg:mb-6"
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img}
                    alt={`${category.name} finish ${i + 1}`}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-all duration-500 group-hover:bg-charcoal/10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <span className="bg-charcoal/50 px-4 py-2 text-[10px] font-medium tracking-[0.2em] uppercase text-ivory backdrop-blur-sm">
                      View
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-warm-gray pb-16 pt-10 text-center"
          >
            <button
              onClick={onBack}
              className="cursor-pointer border border-charcoal bg-charcoal px-10 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-ivory transition-all hover:bg-transparent hover:text-charcoal"
            >
              Back to All Finishes
            </button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={category.images}
            current={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function CategoriesGrid({ onSelect }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <>
      <PortfolioNav />

      <div className="min-h-screen bg-ivory pt-28 sm:pt-36">
        <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center sm:mb-20"
          >
            <p className="mb-3 text-[10px] font-medium tracking-[0.35em] uppercase text-gold sm:mb-4 sm:text-xs">
              Portfolio
            </p>
            <h1 className="font-serif text-4xl font-light tracking-wide text-charcoal sm:text-5xl md:text-6xl">
              Our Signature Finishes
            </h1>
            <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
            <p className="mx-auto mt-5 max-w-xl text-xs font-light leading-relaxed tracking-wide text-charcoal/50 sm:mt-6 sm:text-sm">
              Five disciplines. One uncompromising standard. Select a category to explore our work.
            </p>
          </motion.div>

          <div className="grid gap-4 pb-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {categories.map((cat, i) => (
              <CategoryTile
                key={cat.id}
                category={cat}
                index={i}
                onClick={() => onSelect(cat.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const category = categories.find((c) => c.id === activeCategory)

  return (
    <AnimatePresence mode="wait">
      {category ? (
        <GalleryView
          key={activeCategory}
          category={category}
          onBack={() => setActiveCategory(null)}
        />
      ) : (
        <CategoriesGrid key="grid" onSelect={setActiveCategory} />
      )}
    </AnimatePresence>
  )
}
