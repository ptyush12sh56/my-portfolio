import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getResume, RESUME_DOWNLOAD_URL } from '../api.js'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Download, ExternalLink } from 'lucide-react'

const roles = ['Frontend Developer','AI & ML Enthusiast','CS Student','Problem Solver','Hackathon Builder']

function TypingText() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const role = roles[idx]
    const speed = deleting ? 40 : 80
    const t = setTimeout(() => {
      if (!deleting) {
        setText(role.slice(0, text.length + 1))
        if (text.length + 1 === role.length) setTimeout(() => setDeleting(true), 1800)
      } else {
        setText(text.slice(0, -1))
        if (text.length === 0) { setDeleting(false); setIdx((i) => (i + 1) % roles.length) }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, idx])
  return <span className="gradient-text font-display">{text}<span className="animate-pulse text-blue-400">|</span></span>
}

const particles = Array.from({ length: 18 }, (_, i) => ({ x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 4, size: Math.random() > 0.5 ? 1 : 1.5 }))

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG orbs */}
      {[
        { w:600, h:600, style:'top:-10%, left:-8%', color:'rgba(79,142,247,0.13)', blur:80, delay:0 },
        { w:700, h:700, style:'bottom:-18%, right:-12%', color:'rgba(155,89,255,0.11)', blur:100, delay:2 },
        { w:350, h:350, style:'top:45%, left:55%', color:'rgba(0,229,255,0.07)', blur:50, delay:4 },
      ].map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: orb.w, height: orb.h, ...(() => { const [k,v] = orb.style.split(', '); const [k2,v2] = k.split(':'); const [k3,v3] = v.split(':'); return { [k2.trim()]: v2.trim(), [k3.trim()]: v3.trim() } })(),
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, filter: `blur(${orb.blur}px)` }}
          animate={{ y: [0, -25, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7 + orb.delay, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }} />
      ))}

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(79,142,247,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,0.8) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-blue-400/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size * 4, height: p.size * 4 }}
          animate={{ y: [0, -60, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3 + p.delay, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
                <Sparkles size={14} className="text-blue-400" />
                <span className="font-mono text-xs text-white/60 tracking-wider">Available for Opportunities</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-white mb-4">
              Pratyush<br /><span className="gradient-text">Sharma</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl font-display font-bold mb-6 h-10">
              <TypingText />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/50 text-lg leading-relaxed max-w-lg mb-10">
              Building intelligent solutions using AI, Web Technologies, and Innovative Ideas.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
              <motion.button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <ExternalLink size={16} /> View Projects
              </motion.button>
              <motion.button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline flex items-center gap-2" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Mail size={16} /> Contact Me
              </motion.button>
              <motion.a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Download size={16} /> Resume
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-4 justify-center lg:justify-start">
              {[{ icon: Github, href: 'https://github.com', label: 'GitHub' }, { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }, { icon: Mail, href: 'mailto:pratyush@example.com', label: 'Email' }].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Icon size={18} />
                </motion.a>
              ))}
              <div className="h-px w-12 bg-white/10" />
              <span className="font-mono text-xs text-white/30">@pratyushsharma</span>
            </motion.div>
          </div>

          {/* Profile Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.8, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16,1,0.3,1] }} className="relative flex-shrink-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Spinning ring */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-2px] rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #4F8EF7, #9B59FF, #00E5FF, transparent 60%, transparent 80%, #4F8EF7)', opacity: 0.6 }} />
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg,#4F8EF7,#9B59FF,#00E5FF)' }}>
                <div className="w-full h-full rounded-full" style={{ background: '#0A0A12' }} />
              </div>
              {/* Avatar */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#0F0F1A 0%,#1A1A2E 100%)' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#4F8EF7,#9B59FF)' }}>
                    <span className="font-display text-4xl font-black text-white">PS</span>
                  </div>
                  <span className="font-mono text-xs text-white/30">CS Student</span>
                </div>
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 55%)' }} />
              </div>

              {/* Floating badges */}
              {[
                { label: 'AI/ML', icon: '🤖', className: 'absolute -top-3 -right-2', delay: 0 },
                { label: 'React', icon: '⚛️', className: 'absolute bottom-6 -left-8', delay: 1.2 },
                { label: 'Python', icon: '🐍', className: 'absolute top-10 -left-8', delay: 2.4 },
              ].map(({ label, icon, className, delay }) => (
                <motion.div key={label} className={`${className} glass-strong px-3 py-2 rounded-xl flex items-center gap-1.5 z-10`}
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}>
                  <span className="text-sm">{icon}</span>
                  <span className="font-mono text-xs text-white/70">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.button onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <ArrowDown size={16} />
        </motion.button>
      </div>
    </section>
  )
}
