// API client — connects React frontend to the backend
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function getProjects() {
  const r = await fetch(`${BASE}/api/projects`)
  if (!r.ok) throw new Error('Failed to fetch projects')
  return r.json()
}

export async function getResume() {
  const r = await fetch(`${BASE}/api/resume`)
  if (!r.ok) throw new Error('Failed to fetch resume')
  return r.json()
}

export async function getProfile() {
  const r = await fetch(`${BASE}/api/profile`)
  if (!r.ok) throw new Error('Failed to fetch profile')
  return r.json()
}

export const RESUME_DOWNLOAD_URL = `${BASE}/api/resume/download`
export const HR_PAGE_URL = `${BASE}/hr`
