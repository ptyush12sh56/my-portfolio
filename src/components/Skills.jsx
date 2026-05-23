import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const categories = [
  { label:'Programming', color:'#4F8EF7', skills:[{ name:'Python', level:85, icon:'🐍' },{ name:'Java', level:75, icon:'☕' },{ name:'C', level:70, icon:'⚙️' },{ name:'PHP', level:60, icon:'🐘' }] },
  { label:'Web Development', color:'#9B59FF', skills:[{ name:'React', level:82, icon:'⚛️' },{ name:'JavaScript', level:80, icon:'🟨' },{ name:'HTML', level:92, icon:'🌐' },{ name:'CSS', level:88, icon:'🎨' }] },
  { label:'AI / ML', color:'#00E5FF', skills:[{ name:'Machine Learning', level:72, icon:'🤖' },{ name:'NLP Basics', level:60, icon:'💬' },{ name:'Data Analysis', level:68, icon:'📊' },{ name:'scikit-learn', level:65, icon:'🧠' }] },
  { label:'Tools', color:'#FF3D9A', skills:[{ name:'Git', level:80, icon:'🌿' },{ name:'GitHub', level:82, icon:'🐙' },{ name:'VS Code', level:90, icon:'💻' },{ name:'Figma', level:55, icon:'🎯' }] },
]

const pills = ['React','Python','JavaScript','Java','Machine Learning','Git','HTML/CSS','NLP','PHP','GitHub','Tailwind CSS','REST APIs','scikit-learn','Data Analysis']

function SkillCard({ cat, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 group relative overflow-hidden hover:border-white/10 transition-all duration-300" whileHover={{ y: -4 }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at top left, ${cat.color}12, transparent 60%)` }} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full" style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}80` }} />
          <h3 className="font-display font-bold text-white">{cat.label}</h3>
        </div>
        <div className="space-y-4">
          {cat.skills.map((s, i) => (
            <div key={s.name} className="group/skill">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2"><span>{s.icon}</span><span className="text-sm text-white/70 group-hover/skill:text-white transition-colors">{s.name}</span></div>
                <span className="font-mono text-xs text-white/30">{s.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg,${cat.color},${cat.color}88)` }}
                  initial={{ width: 0 }} animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16,1,0.3,1] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(155,89,255,0.04), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="section-label mb-4">Technical Arsenal</div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white">Skills & <span className="gradient-text">Technologies</span></h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">A curated stack of technologies I use to bring ideas to life.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {categories.map((cat, i) => <SkillCard key={cat.label} cat={cat} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}>
          <div className="text-center mb-6"><span className="font-mono text-xs text-white/30 tracking-widest uppercase">Also familiar with</span></div>
          <div className="flex flex-wrap gap-3 justify-center">
            {pills.map((p, i) => (
              <motion.span key={p} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.6 + i * 0.04 }}
                className="glass px-4 py-2 rounded-full font-mono text-xs text-white/50 hover:text-white hover:border-blue-400/30 transition-all duration-200 cursor-default" whileHover={{ scale: 1.05, y: -2 }}>
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
