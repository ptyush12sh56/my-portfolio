import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const scrollTo = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className={`mx-auto max-w-6xl px-6 transition-all duration-500 ${scrolled ? 'glass rounded-2xl mx-4 shadow-2xl shadow-black/50' : ''}`}>
          <div className="flex items-center justify-between h-14">
            <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5" whileHover={{ scale: 1.02 }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#4F8EF7,#9B59FF)' }}>
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">PS<span className="gradient-text">.</span></span>
            </motion.button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button key={link.label} onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  whileHover={{ scale: 1.02 }}>
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <motion.button onClick={() => scrollTo('#contact')} className="btn-primary text-sm py-2.5 px-5"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Hire Me
              </motion.button>
            </div>

            <button className="md:hidden text-white/70 hover:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 glass-strong rounded-2xl p-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  {link.label}
                </motion.button>
              ))}
              <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                onClick={() => scrollTo('#contact')} className="btn-primary mt-2 text-sm">
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
