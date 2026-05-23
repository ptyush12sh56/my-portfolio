import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { readDB, writeDB } from '../data/db.js'
import { authMiddleware } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '../../uploads')

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `resume_pratyush${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.includes(ext)) cb(null, true)
    else cb(new Error('Only PDF and Word documents allowed'))
  }
})

const router = Router()

// GET /api/resume — public, returns resume info
router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.resume)
})

// GET /api/resume/download — public, serves the file or redirects
router.get('/download', (req, res) => {
  const db = readDB()
  if (db.resume.type === 'link' && db.resume.url) {
    return res.redirect(db.resume.url)
  }
  if (db.resume.type === 'file' && db.resume.filename) {
    const filePath = path.join(UPLOADS_DIR, db.resume.filename)
    if (fs.existsSync(filePath)) {
      // Log HR view
      db.hrViews.push({ action: 'resume_download', timestamp: new Date().toISOString(), ip: req.ip })
      writeDB(db)
      return res.download(filePath, 'Pratyush_Sharma_Resume.pdf')
    }
  }
  res.status(404).json({ error: 'Resume not set yet' })
})

// PUT /api/resume/link — admin, set resume URL
router.put('/link', authMiddleware, (req, res) => {
  try {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: 'URL is required' })
    const db = readDB()
    db.resume = { url, filename: '', uploadedAt: new Date().toISOString(), type: 'link' }
    writeDB(db)
    res.json({ message: 'Resume link updated', resume: db.resume })
  } catch {
    res.status(500).json({ error: 'Failed to update resume link' })
  }
})

// POST /api/resume/upload — admin, upload PDF file
router.post('/upload', authMiddleware, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const db = readDB()
    db.resume = {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      uploadedAt: new Date().toISOString(),
      type: 'file',
      originalName: req.file.originalname,
      size: req.file.size
    }
    writeDB(db)
    res.json({ message: 'Resume uploaded successfully', resume: db.resume })
  } catch {
    res.status(500).json({ error: 'Failed to upload resume' })
  }
})

// DELETE /api/resume — admin, clear resume
router.delete('/', authMiddleware, (req, res) => {
  try {
    const db = readDB()
    if (db.resume.type === 'file' && db.resume.filename) {
      const filePath = path.join(UPLOADS_DIR, db.resume.filename)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
    db.resume = { url: '', filename: '', uploadedAt: null, type: 'link' }
    writeDB(db)
    res.json({ message: 'Resume cleared' })
  } catch {
    res.status(500).json({ error: 'Failed to clear resume' })
  }
})

export default router
