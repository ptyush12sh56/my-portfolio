import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import { readDB, writeDB } from './data/db.js'
import authRouter from './routes/auth.js'
import projectsRouter from './routes/projects.js'
import resumeRouter from './routes/resume.js'
import profileRouter from './routes/profile.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files (resume PDFs)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Serve HR public page (static HTML)
app.use('/admin', express.static(path.join(__dirname, '../public/admin')))

// ─── Initialize admin password on first run ──────────────────
async function initDB() {
  const db = readDB()
  if (!db.admin.passwordHash) {
    const DEFAULT_PASSWORD = 'admin123'
    db.admin.passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10)
    writeDB(db)
    console.log('🔐 Default admin password set: admin123')
    console.log('   ⚠️  Change this immediately via POST /api/auth/change-password')
  }
}

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/profile', profileRouter)

// ─── HR Public Page ───────────────────────────────────────────
app.get('/hr', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/hr.html'))
})

// ─── Health check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── 404 ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ─── Error handler ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

// ─── Start ───────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio Backend running at http://localhost:${PORT}`)
    console.log(`📊 Admin Dashboard:  http://localhost:${PORT}/admin`)
    console.log(`👔 HR Public Page:   http://localhost:${PORT}/hr`)
    console.log(`🔌 API Base:         http://localhost:${PORT}/api`)
    console.log(`\n📋 API Endpoints:`)
    console.log(`   POST   /api/auth/login`)
    console.log(`   GET    /api/projects          (public)`)
    console.log(`   POST   /api/projects          (admin)`)
    console.log(`   PUT    /api/projects/:id      (admin)`)
    console.log(`   DELETE /api/projects/:id      (admin)`)
    console.log(`   GET    /api/resume            (public)`)
    console.log(`   GET    /api/resume/download   (public)`)
    console.log(`   PUT    /api/resume/link       (admin)`)
    console.log(`   POST   /api/resume/upload     (admin)`)
    console.log(`   GET    /api/profile           (public)`)
    console.log(`   PUT    /api/profile           (admin)`)
    console.log(`   GET    /api/profile/hr-link   (admin)`)
    console.log(`   GET    /api/profile/analytics (admin)\n`)
  })
})
