# Portfolio Backend — Node.js / Express

A lightweight REST API backend for managing your portfolio content — projects, resume, and profile. No database needed; uses a JSON file for storage.

## 📁 Structure

```
backend/
├── src/
│   ├── index.js              ← Express server entry point
│   ├── data/
│   │   ├── db.js             ← JSON file database helper
│   │   └── portfolio.json    ← Auto-created data file
│   ├── middleware/
│   │   └── auth.js           ← JWT auth middleware
│   └── routes/
│       ├── auth.js           ← Login / change password
│       ├── projects.js       ← CRUD for projects
│       ├── resume.js         ← Resume upload / link
│       └── profile.js        ← Profile + analytics
├── public/
│   ├── hr.html               ← Public HR page (shareable link)
│   └── admin/
│       └── index.html        ← Admin dashboard UI
└── uploads/                  ← Uploaded resume PDFs go here
```

## 🚀 Start

```bash
cd backend
npm install
npm start          # production
npm run dev        # with auto-reload
```

Server runs on **http://localhost:4000**

## 🔐 Default Credentials

```
Username: pratyush
Password: admin123
```
**Change the password** immediately after first login via the Settings page in the Admin Dashboard.

## 🌐 Key URLs

| URL | Description |
|---|---|
| `http://localhost:4000/admin` | **Admin Dashboard** — manage everything |
| `http://localhost:4000/hr` | **HR Public Page** — share this with HR |
| `http://localhost:4000/api/...` | REST API |

## 📋 API Reference

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Login → returns JWT token |
| POST | `/api/auth/change-password` | ✅ | Change admin password |

### Projects
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | ❌ | Get all projects (public) |
| GET | `/api/projects/:id` | ❌ | Get one project |
| POST | `/api/projects` | ✅ | Add new project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |

### Resume
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resume` | ❌ | Get resume info |
| GET | `/api/resume/download` | ❌ | Download / redirect to resume |
| PUT | `/api/resume/link` | ✅ | Set Google Drive / Notion URL |
| POST | `/api/resume/upload` | ✅ | Upload PDF file (max 10MB) |
| DELETE | `/api/resume` | ✅ | Remove resume |

### Profile & Analytics
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/profile` | ❌ | Get public profile |
| PUT | `/api/profile` | ✅ | Update profile |
| GET | `/api/profile/hr-link` | ✅ | Get shareable HR page URL |
| GET | `/api/profile/analytics` | ✅ | View HR page visits & downloads |

## 📄 Resume Options

**Option A — Set a Link (recommended for Google Drive)**
```bash
curl -X PUT http://localhost:4000/api/resume/link \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://drive.google.com/file/d/YOUR_FILE_ID/view"}'
```

**Option B — Upload PDF directly**
```bash
curl -X POST http://localhost:4000/api/resume/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "resume=@/path/to/your/resume.pdf"
```

## 🔗 Connect Frontend to Backend

Set this environment variable in `pratyush-portfolio/.env`:
```
VITE_API_URL=http://localhost:4000
```

For production deployment, change the URL to your server address.
