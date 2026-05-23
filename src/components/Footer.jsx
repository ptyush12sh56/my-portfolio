import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, ArrowUp, Code2, Heart } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:pratyush@example.com', label: 'Email' },
]
const links = [
  { label:'About', href:'#about' },{ label:'Skills', href:'#skills' },{ label:'Projects', href:'#projects' },
  { label:'Achievements', href:'#achievements' },{ label:'Contact', href:'#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(79,142,247,0.04), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#4F8EF7,#9B59FF)' }}><Code2 size={16} className="text-white" /></div>
              <span className="font-display font-bold text-white text-lg">Pratyush<span className="gradient-text">.</span></span>
            </div>
            <p className="text-sm text-white/40 leading-6 max-w-xs">Building intelligent solutions using AI, Web Technologies, and Innovative Ideas.</p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-white/30 tracking-widest uppercase mb-5">Navigation</div>
            <div className="space-y-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior:'smooth' }) }}
                  className="block text-sm text-white/50 hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-white/30 tracking-widest uppercase mb-5">Status</div>
            <div className="glass rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-sm text-white/70">Available for Opportunities</span></div>
              <p className="font-mono text-xs text-white/30">Open to internships, freelance,<br />and hackathon collaborations.</p>
            </div>
            <motion.button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth' })}
              className="btn-primary text-sm py-2.5 w-full flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Mail size={14} /> Let's Connect
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <div className="flex items-center gap-1.5 text-sm text-white/30">
            <span>© 2024 Pratyush Sharma. Made with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>using React & Framer Motion.</span>
          </div>
          <motion.button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all"
            whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} title="Back to top">
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
