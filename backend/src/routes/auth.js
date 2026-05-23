import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { readDB, writeDB } from '../data/db.js'
import { signToken } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' })
    }
    const db = readDB()
    if (username !== db.admin.username) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const valid = await bcrypt.compare(password, db.admin.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = signToken({ username, role: 'admin' })
    res.json({ token, username })
  } catch (err) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/auth/change-password  (protected)
router.post('/change-password', async (req, res) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: 'Unauthorized' })
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both passwords required' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 chars' })
    }
    const db = readDB()
    const valid = await bcrypt.compare(currentPassword, db.admin.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Current password is wrong' })
    db.admin.passwordHash = await bcrypt.hash(newPassword, 10)
    writeDB(db)
    res.json({ message: 'Password changed successfully' })
  } catch {
    res.status(500).json({ error: 'Failed to change password' })
  }
})

export default router
