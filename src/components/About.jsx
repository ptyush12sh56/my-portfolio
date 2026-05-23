import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Brain, Code, Trophy, Lightbulb, Zap } from 'lucide-react'

const stats = [
  { value: '10+', label: 'Projects Built', icon: Code },
  { value: '3+', label: 'Hackathons', icon: Trophy },
  { value: '2+', label: 'Years Coding', icon: Zap },
  { value: '∞', label: 'Curiosity', icon: Brain },
]

const highlights = [
  { icon: Brain, title: 'AI & Machine Learning', desc: 'Passionate about intelligent systems using ML algorithms and NLP.' },
  { icon: Code, title: 'Web Development', desc: 'Crafting modern, responsive web apps with React and modern tooling.' },
  { icon: Trophy, title: 'Hackathon Builder', desc: 'Love building fast prototypes — the thrill of shipping under pressure.' },
  { icon: Lightbulb, title: 'Innovative Thinking', desc: 'Bringing a fresh perspective to craft elegant, impactful solutions.' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(79,142,247,0.5), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-20">
          <div className="section-label mb-4">About Me</div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white leading-tight">
            Crafting the Future<br /><span className="gradient-text">One Line at a Time</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-square max-w-md mx-auto" style={{ background: 'linear-gradient(135deg,#0F0F1A 0%,#1A1A2E 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="absolute inset-6 rounded-2xl overflow-hidden font-mono text-xs leading-6" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-white/20 text-xs">pratyush.js</span>
                </div>
                <div className="p-4 space-y-1 text-xs">
                  <div><span className="text-purple-400">const</span> <span className="text-blue-300">me</span> <span className="text-white/40">=</span> {'{'}</div>
                  <div className="ml-4"><span className="text-emerald-300">name</span><span className="text-white/40">:</span> <span className="text-amber-300">"Pratyush Sharma"</span>,</div>
                  <div className="ml-4"><span className="text-emerald-300">role</span><span className="text-white/40">:</span> <span className="text-amber-300">"CS Student"</span>,</div>
                  <div className="ml-4"><span className="text-emerald-300">loves</span><span className="text-white/40">:</span> [<span className="text-amber-300">"AI/ML"</span>, <span className="text-amber-300">"React"</span>],</div>
                  <div className="ml-4"><span className="text-emerald-300">status</span><span className="text-white/40">:</span> <span className="text-amber-300">"Building"</span>,</div>
                  <div className="ml-4"><span className="text-emerald-300">available</span><span className="text-white/40">:</span> <span className="text-blue-400">true</span></div>
                  <div>{'}'}</div>
                  <div className="mt-3 text-white/20">{'// Let\'s build something! ✨'}</div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(79,142,247,0.1) 0%, transparent 50%)' }} />
            </div>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
              style={{ background: 'conic-gradient(from 0deg, #4F8EF7, #9B59FF, transparent)' }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.3 }}>
            <p className="text-white/60 text-lg leading-8 mb-6">
              I'm a <span className="text-white font-semibold">Computer Science student</span> with a deep passion for building at the intersection of <span className="gradient-text font-semibold">Artificial Intelligence</span> and modern web development.
            </p>
            <p className="text-white/50 text-base leading-7 mb-10">
              Whether crafting pixel-perfect UIs with React, training ML models in Python, or burning midnight oil at hackathons — I bring <span className="text-white">curiosity, grit, and creativity</span> to everything I build.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-4 group hover:border-blue-500/20 transition-all duration-300" whileHover={{ y: -2 }}>
                  <Icon size={16} className="text-blue-400 mb-2" />
                  <div className="font-display text-sm font-bold text-white mb-1">{title}</div>
                  <div className="text-xs text-white/40 leading-5">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center" whileHover={{ y: -4, scale: 1.02 }}>
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,rgba(79,142,247,0.2),rgba(155,89,255,0.2))' }}>
                <Icon size={18} className="text-blue-400" />
              </div>
              <div className="font-display text-3xl font-black gradient-text mb-1">{value}</div>
              <div className="text-sm text-white/40">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
