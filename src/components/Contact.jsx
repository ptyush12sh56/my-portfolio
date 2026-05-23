import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle, Loader } from 'lucide-react'

const info = [
  { icon: Mail, label: 'Email', value: 'pratyush@example.com', href: 'mailto:pratyush@example.com', color: '#4F8EF7' },
  { icon: Github, label: 'GitHub', value: 'github.com/pratyushsharma', href: 'https://github.com', color: '#9B59FF' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/pratyushsharma', href: 'https://linkedin.com', color: '#00E5FF' },
  { icon: MapPin, label: 'Location', value: 'India', href: null, color: '#FF3D9A' },
]

function Field({ label, name, value, onChange, type = 'text', textarea }) {
  const [focused, setFocused] = useState(false)
  const cls = `w-full bg-transparent text-sm text-white placeholder-white/20 outline-none resize-none`
  return (
    <div className={`glass rounded-xl px-4 py-3.5 transition-all duration-300 ${focused ? 'border-blue-500/40 shadow-[0_0_20px_rgba(79,142,247,0.1)]' : 'hover:border-white/10'}`}>
      <label className={`block font-mono text-xs mb-2 transition-colors ${focused ? 'text-blue-400' : 'text-white/30'}`}>{label}</label>
      {textarea
        ? <textarea name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={5} className={cls} placeholder="Tell me about your project or opportunity..." />
        : <input type={type} name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={cls} placeholder={label} />
      }
    </div>
  )
}

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = async (e) => {
    e.preventDefault(); setStatus('loading')
    await new Promise(r => setTimeout(r, 2000)); setStatus('success')
    setTimeout(() => { setStatus('idle'); setForm({ name:'',email:'',subject:'',message:'' }) }, 3000)
  }
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(79,142,247,0.06), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="section-label mb-4">Get In Touch</div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white">Let's Build Something<br /><span className="gradient-text">Amazing Together</span></h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">Whether you have an opportunity, project, or just want to say hi — my inbox is always open.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="glass rounded-3xl p-6 mb-4">
                <h3 className="font-display text-lg font-bold text-white mb-2">Drop me a message</h3>
                <p className="text-sm text-white/40 leading-6">Open to internships, freelance projects, and hackathon collaborations. Let's talk!</p>
              </div>
            </motion.div>
            {info.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-4 flex items-center gap-4 group hover:border-white/10 transition-all duration-300 block" style={{display:'flex'}}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25` }}><Icon size={18} style={{ color }} /></div>
                      <div><div className="font-mono text-xs text-white/30 mb-0.5">{label}</div><div className="text-sm text-white/70 group-hover:text-white transition-colors">{value}</div></div>
                    </a>
                  : <div className="glass rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25` }}><Icon size={18} style={{ color }} /></div>
                      <div><div className="font-mono text-xs text-white/30 mb-0.5">{label}</div><div className="text-sm text-white/70">{value}</div></div>
                    </div>
                }
              </motion.div>
            ))}
          </div>
          <motion.form onSubmit={onSubmit} className="lg:col-span-3 glass rounded-3xl p-8 space-y-4"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your Name" name="name" value={form.name} onChange={onChange} />
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} />
            </div>
            <Field label="Subject" name="subject" value={form.subject} onChange={onChange} />
            <Field label="Message" name="message" value={form.message} onChange={onChange} textarea />
            <motion.button type="submit" disabled={status !== 'idle'}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-70"
              whileHover={status === 'idle' ? { scale: 1.02 } : {}} whileTap={status === 'idle' ? { scale: 0.98 } : {}}>
              {status === 'idle' && <><Send size={16} /> Send Message</>}
              {status === 'loading' && <><Loader size={16} className="animate-spin" /> Sending...</>}
              {status === 'success' && <><CheckCircle size={16} /> Message Sent! 🎉</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
