import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { readDB, writeDB } from '../data/db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// GET /api/projects — public
router.get('/', (req, res) => {
  const db = readDB()
  const sorted = [...db.projects].sort((a, b) => a.order - b.order)
  res.json(sorted)
})

// GET /api/projects/:id — public
router.get('/:id', (req, res) => {
  const db = readDB()
  const project = db.projects.find(p => p.id === req.params.id)
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json(project)
})

// POST /api/projects — admin only
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, description, tech, githubUrl, liveUrl, category, featured, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' })
    }
    const db = readDB()
    const newProject = {
      id: uuidv4(),
      title,
      description,
      tech: Array.isArray(tech) ? tech : (tech || '').split(',').map(t => t.trim()).filter(Boolean),
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      category: category || 'Web App',
      featured: Boolean(featured),
      order: order || db.projects.length + 1,
      createdAt: new Date().toISOString()
    }
    db.projects.push(newProject)
    writeDB(db)
    res.status(201).json(newProject)
  } catch {
    res.status(500).json({ error: 'Failed to create project' })
  }
})

// PUT /api/projects/:id — admin only
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const db = readDB()
    const idx = db.projects.findIndex(p => p.id === req.params.id)
    if (idx === -1) return res.status(404).json({ error: 'Project not found' })

    const { title, description, tech, githubUrl, liveUrl, category, featured, order } = req.body
    db.projects[idx] = {
      ...db.projects[idx],
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(tech !== undefined && { tech: Array.isArray(tech) ? tech : tech.split(',').map(t => t.trim()).filter(Boolean) }),
      ...(githubUrl !== undefined && { githubUrl }),
      ...(liveUrl !== undefined && { liveUrl }),
      ...(category !== undefined && { category }),
      ...(featured !== undefined && { featured: Boolean(featured) }),
      ...(order !== undefined && { order: Number(order) }),
      updatedAt: new Date().toISOString()
    }
    writeDB(db)
    res.json(db.projects[idx])
  } catch {
    res.status(500).json({ error: 'Failed to update project' })
  }
})

// DELETE /api/projects/:id — admin only
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = readDB()
    const idx = db.projects.findIndex(p => p.id === req.params.id)
    if (idx === -1) return res.status(404).json({ error: 'Project not found' })
    db.projects.splice(idx, 1)
    writeDB(db)
    res.json({ message: 'Project deleted' })
  } catch {
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

// PATCH /api/projects/reorder — admin only
router.patch('/reorder/bulk', authMiddleware, (req, res) => {
  try {
    const { orders } = req.body // [{ id, order }, ...]
    const db = readDB()
    orders.forEach(({ id, order }) => {
      const p = db.projects.find(p => p.id === id)
      if (p) p.order = order
    })
    writeDB(db)
    res.json({ message: 'Reordered' })
  } catch {
    res.status(500).json({ error: 'Failed to reorder' })
  }
})

export default router
