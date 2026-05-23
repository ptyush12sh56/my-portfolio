import { Router } from 'express'
import { readDB, writeDB } from '../data/db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// GET /api/profile — public
router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.profile)
})

// PUT /api/profile — admin only
router.put('/', authMiddleware, (req, res) => {
  try {
    const { name, title, email, github, linkedin, location } = req.body
    const db = readDB()
    db.profile = {
      ...db.profile,
      ...(name !== undefined && { name }),
      ...(title !== undefined && { title }),
      ...(email !== undefined && { email }),
      ...(github !== undefined && { github }),
      ...(linkedin !== undefined && { linkedin }),
      ...(location !== undefined && { location }),
    }
    writeDB(db)
    res.json(db.profile)
  } catch {
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// GET /api/profile/hr-link — admin, get shareable HR page URL
router.get('/hr-link', authMiddleware, (req, res) => {
  const host = req.headers.host || 'localhost:4000'
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  res.json({
    url: `${protocol}://${host}/hr`,
    description: 'Share this link with HR to give them access to all your projects and resume'
  })
})

// GET /api/analytics — admin only
router.get('/analytics', authMiddleware, (req, res) => {
  const db = readDB()
  const views = db.hrViews || []
  res.json({
    totalViews: views.length,
    resumeDownloads: views.filter(v => v.action === 'resume_download').length,
    recentViews: views.slice(-20).reverse()
  })
})

// POST /api/profile/log-hr-view — internal, log when HR visits
router.post('/log-hr-view', (req, res) => {
  try {
    const db = readDB()
    db.hrViews = db.hrViews || []
    db.hrViews.push({
      action: 'hr_page_view',
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers['user-agent']?.substring(0, 100)
    })
    writeDB(db)
    res.json({ ok: true })
  } catch {
    res.json({ ok: false })
  }
})

export default router
