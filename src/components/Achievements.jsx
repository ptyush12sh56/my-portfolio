import { motion } from 'framer-motion'
import { Trophy, Users, Mic2, Code2, Star, Zap, Award } from 'lucide-react'

const timeline = [
  { year:'2024', title:'National Hackathon Finalist', subtitle:'Smart India Hackathon — AI Track', desc:'Developed an NLP-powered chatbot prototype with a 4-person team. Reached the final round among 500+ participating teams nationwide.', icon:Trophy, color:'#FFD700', tags:['AI/ML','NLP','Team Project'], highlight:true },
  { year:'2024', title:'College Tech Fest Winner', subtitle:'Intra-College Hackathon', desc:'Won first place in the web development category by building a full-stack student portal in under 12 hours with a two-member team.', icon:Award, color:'#4F8EF7', tags:['Web Dev','PHP','MySQL'], highlight:false },
  { year:'2023', title:'Technical Presentation — AI Trends', subtitle:'Department Seminar Series', desc:'Delivered a 30-minute presentation on "The Future of NLP in Industry Applications" to an audience of 80+ students and faculty.', icon:Mic2, color:'#9B59FF', tags:['Public Speaking','AI','NLP'], highlight:false },
  { year:'2023', title:'Open Source Contributor', subtitle:'GitHub Community Projects', desc:'Made meaningful contributions to open-source React repositories — bug fixes, documentation, and new feature additions.', icon:Code2, color:'#00E5FF', tags:['Open Source','React','GitHub'], highlight:false },
  { year:'2023', title:'Team Lead — Project Collaboration', subtitle:'Academic Project Team', desc:'Led a 5-person team to build a Student Result Management System. Coordinated design, development, and testing workflows.', icon:Users, color:'#FF3D9A', tags:['Leadership','Collaboration'], highlight:false },
  { year:'2022', title:'Started Coding Journey', subtitle:'First Line of Code ✨', desc:'Wrote my first HTML page and fell in love with programming. The journey from Hello World to AI applications has been incredible.', icon:Star, color:'#FF9F43', tags:['Milestone','Beginnings'], highlight:false },
]

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(155,89,255,0.05), transparent)' }} />
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
          <div className="section-label mb-4">Milestones</div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white">Achievements &<br /><span className="gradient-text">Hackathons</span></h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">Key moments, competitions, and milestones on my journey.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, rgba(79,142,247,0.5), rgba(155,89,255,0.3), transparent)' }} />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="relative flex gap-6">
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `${item.color}15`, border: `2px solid ${item.color}40`, boxShadow: `0 0 20px ${item.color}20` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>

                  {/* Card */}
                  <motion.div className="flex-1 glass rounded-2xl p-5 group relative overflow-hidden hover:border-white/10 transition-all duration-300" whileHover={{ y: -3, scale: 1.005 }}>
                    {item.highlight && <div className="absolute top-3 right-3"><Zap size={14} style={{ color: item.color }} /></div>}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at center, ${item.color}08, transparent 70%)` }} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md" style={{ background: `${item.color}15`, color: item.color }}>{item.year}</span>
                        <h3 className="font-display font-bold text-white text-sm">{item.title}</h3>
                      </div>
                      <p className="text-xs text-white/40 mb-2">{item.subtitle}</p>
                      <p className="text-sm text-white/60 leading-6 mb-3">{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded-md" style={{ background: `${item.color}10`, color: item.color }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
