import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Github, ExternalLink, Gamepad2, GraduationCap, CheckSquare, Bot, Globe, Loader } from 'lucide-react'
import { getProjects, RESUME_DOWNLOAD_URL } from '../api.js'

const CATEGORY_ICONS = {
  'Web Game': Gamepad2,
  'Full Stack': GraduationCap,
  'Web App': Globe,
  'AI/ML': Bot,
}
const CATEGORY_COLORS = {
  'Web Game': '#4F8EF7',
  'Full Stack': '#9B59FF',
  'Web App': '#00E5FF',
  'AI/ML': '#FF3D9A',
  default: '#4F8EF7',
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const Icon = CATEGORY_ICONS[project.category] || Globe
  const color = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.default

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="group relative glass rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500"
      whileHover={{ y: -6 }}
    >
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 glass-strong px-3 py-1 rounded-full">
          <span className="font-mono text-xs" style={{ color }}>★ Featured</span>
        </div>
      )}

      {/* Visual header */}
      <div className="relative h-44 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}>
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${color} 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}>
            <div className="w-18 h-18 w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg,${color}30,${color}10)`, border: `1px solid ${color}30`, boxShadow: `0 0 40px ${color}20` }}>
              <Icon size={34} style={{ color }} />
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 to-transparent" />
        <div className="absolute bottom-3 left-5">
          <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: `${color}18`, color, border: `1px solid ${color}25` }}>
            {project.category || 'Project'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-white/50 leading-6 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {(project.tech || []).map((t) => (
            <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-lg"
              style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>{t}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <motion.a
            href={project.githubUrl || '#'}
            target={project.githubUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${!project.githubUrl ? 'opacity-30 pointer-events-none' : 'text-white/60 hover:text-white'}`}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            whileHover={project.githubUrl ? { scale: 1.02 } : {}} whileTap={project.githubUrl ? { scale: 0.98 } : {}}>
            <Github size={15} /> GitHub
          </motion.a>
          <motion.a
            href={project.liveUrl || '#'}
            target={project.liveUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${!project.liveUrl ? 'opacity-30 pointer-events-none text-white/60' : 'text-white'}`}
            style={{ background: `linear-gradient(135deg,${color}30,${color}15)`, border: `1px solid ${color}30` }}
            whileHover={project.liveUrl ? { scale: 1.02 } : {}} whileTap={project.liveUrl ? { scale: 0.98 } : {}}>
            <ExternalLink size={15} /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05 })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getProjects()
      .then(data => { setProjects(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(79,142,247,0.04), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="section-label mb-4">Featured Work</div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white">
            Projects That <span className="gradient-text">Ship</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            From hackathon prototypes to polished applications — all with live demos and source code.
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20 gap-3 text-white/40">
            <Loader size={20} className="animate-spin" />
            <span className="font-mono text-sm">Loading projects...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-20 glass rounded-2xl text-white/40">
            <div className="text-3xl mb-3">📡</div>
            <p className="font-mono text-sm">Could not reach backend — showing static fallback</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => <ProjectCard key={p.id || p.title} project={p} index={i} />)}
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }} className="text-center mt-12 flex flex-wrap gap-3 justify-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
            <Github size={16} /> View All on GitHub
          </a>
          <a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            📄 Download My Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
