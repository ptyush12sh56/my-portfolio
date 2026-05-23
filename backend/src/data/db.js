// Simple JSON-file based database — no external DB needed
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'portfolio.json')

const DEFAULT_DATA = {
  admin: {
    username: "pratyush",
    passwordHash: "" // set at startup
  },
  resume: {
    url: "",
    filename: "",
    uploadedAt: null,
    type: "link"
  },
  projects: [
    {
      id: "1",
      title: "Tic Tac Toe Game",
      description: "Interactive game with AI opponent using the Minimax algorithm. Features score tracking and multiple difficulty levels.",
      tech: ["JavaScript", "HTML5", "CSS3", "Minimax AI"],
      githubUrl: "https://github.com/pratyushsharma/tic-tac-toe",
      liveUrl: "https://tictactoe.pratyush.dev",
      category: "Web Game",
      featured: false,
      order: 1
    },
    {
      id: "2",
      title: "Student Result Portal",
      description: "Full-stack portal for academic result management with role-based auth and dashboard.",
      tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
      githubUrl: "https://github.com/pratyushsharma/student-portal",
      liveUrl: "",
      category: "Full Stack",
      featured: true,
      order: 2
    },
    {
      id: "3",
      title: "To-Do List App",
      description: "Feature-rich productivity app with local persistence, task categories, due dates, and dark mode UI.",
      tech: ["React", "Tailwind CSS", "localStorage"],
      githubUrl: "https://github.com/pratyushsharma/todo-app",
      liveUrl: "https://todo.pratyush.dev",
      category: "Web App",
      featured: false,
      order: 3
    },
    {
      id: "4",
      title: "Hackathon AI Prototype",
      description: "NLP-powered chatbot built in 24 hours. Analyzes sentiment and generates context-aware responses.",
      tech: ["Python", "NLTK", "Flask", "React", "OpenAI API"],
      githubUrl: "https://github.com/pratyushsharma/ai-chatbot",
      liveUrl: "",
      category: "AI/ML",
      featured: true,
      order: 4
    }
  ],
  profile: {
    name: "Pratyush Sharma",
    title: "Computer Science Student | Frontend Developer | AI & ML Enthusiast",
    email: "pratyush@example.com",
    github: "https://github.com/pratyushsharma",
    linkedin: "https://linkedin.com/in/pratyushsharma",
    location: "India"
  },
  hrViews: []
}

export function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2))
      return structuredClone(DEFAULT_DATA)
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch {
    return structuredClone(DEFAULT_DATA)
  }
}

export function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export { DEFAULT_DATA }
