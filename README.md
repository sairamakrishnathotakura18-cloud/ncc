# NCC Connect - University NCC Academic & Management Portal (Frontend)

**NCC Connect** is an institutional web application built for University National Cadet Corps (NCC) Units. It delivers a dual-tier platform: a public institutional portal and role-based authenticated management dashboards for Student Cadets, NCC Officers (ANOs), and System Administrators.

---

## 🚀 Quick Start & Installation

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

```bash
# 1. Clone or navigate to project workspace
cd /home/sai/ncc

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will launch locally at `http://localhost:5173`.

---

## 🔑 Demo Login Credentials

You can test all role-based experiences using the one-click demo logins on the Login page (`/login`) or using these credentials:

| Role | Email | Password | Access Rights & Dashboard |
| :--- | :--- | :--- | :--- |
| **Student Cadet** | `student@ncc.demo` | `password123` | Attendance % ring, training schedule, camp applications, certificate downloads |
| **NCC Officer (ANO)** | `officer@ncc.demo` | `password123` | Cadet roster, application approval, batch attendance marker, analytics |
| **Administrator** | `admin@ncc.demo` | `password123` | Master CRUD across departments, units, ranks, and dynamic eligibility rules |

---

## 🗺️ Route Directory

### Public Portal Routes
- `/` - Portal Homepage (Hero, statistics counters, why join, journey timeline, featured camps, achievers showcase)
- `/about` - About NCC (Vision, mission, motto "Unity and Discipline", core objectives)
- `/history` - Heritage & Timeline (From 1917 University Corps to modern digital portal)
- `/university-ncc` - Campus Battalion Setup (1st Bengal BN & 1st Girls BN, officer profiles, training facilities)
- `/ranks` - Rank Hierarchy & Insignia (SD/SW and JD/JW rank duties & badges)
- `/eligibility` - Cadet Eligibility Checklist & Interactive Evaluator
- `/join` - 5-Step Online Cadet Registration Form (Generates App Ref ID: `NCC-2026-XXXXX`)
- `/training` - Parade & Lecture Schedule (Filterable by topic and instructor)
- `/camps` - Annual Training Camps & Expeditions (Filterable listing & detail modal)
- `/certificates` - Official Certificate Verification Portal (Real-time serial validation)
- `/achievements` - Campus Achievers Gallery & Honors Roll
- `/activities` - Community Social Service Drives (Blood donation, riverfront cleaning, tree plantation)
- `/gallery` - Parade & Event Photo Gallery (Category filter & lightbox modal)
- `/notices` - Official Notice Board & Circulars (Downloadable attachment preview)
- `/faq` - Frequently Asked Questions Accordion
- `/contact` - Official Contact Info & Inquiry Submission Form
- `/login` - Role-Based Sign In Portal

### Student Cadet Dashboard Routes (`/student/*`)
- `/student/dashboard` - Cadet Overview (82% circular attendance ring, journey progress bar, upcoming drill)
- `/student/profile` - Personal, Academic & Regiment Profile
- `/student/attendance` - Monthly Recharts attendance trend bar chart & parade history
- `/student/training` - Enrolled training classes
- `/student/camps` - Camp application status tracker
- `/student/certificates` - Digital A, B, C certificates with PDF download
- `/student/achievements` - Medal & commendation records
- `/student/activities` - Social drive participation logs
- `/student/documents` - Uploaded ID cards and medical fitness forms
- `/student/notifications` - Real-time cadet alerts

### Officer Dashboard Routes (`/officer/*`)
- `/officer/dashboard` - Command Overview & Quick Actions
- `/officer/cadets` - Searchable Cadet Directory Data Table with side dossier drawer
- `/officer/applications` - Applicant Review Modal with Approve/Reject/Waitlist triggers
- `/officer/attendance` - Parade Attendance Marking Interface with "Mark All Present" & status toggles
- `/officer/training` - Add & manage parade drill classes
- `/officer/camps` - Manage camp registrations and participant slots
- `/officer/certificates` - Issue & verify cadet certificates
- `/officer/achievements` - Add campus achievers
- `/officer/activities` - Organize social service drives
- `/officer/notices` - Publish circulars and notices
- `/officer/reports` - Recharts analytics (Enrollment by year, department breakdown) + Export simulation

### Admin Dashboard Routes (`/admin/*`)
- `/admin/dashboard` - System Administration Overview & Audit Log
- `/admin/eligibility` - Dynamic Eligibility Rule Configuration Manager
- `/admin/users` - Master User Directory
- `/admin/students` - Student Cadets Master
- `/admin/officers` - NCC Officers Master
- `/admin/departments` - Academic Departments Master
- `/admin/units` - Battalion Units Master
- `/admin/ranks` - Rank Structure Master
- `/admin/camps` - Camp Master Catalog
- `/admin/certificates` - Certificate Master Catalog
- `/admin/achievements` - Achievements Master Catalog
- `/admin/activities` - Activities Master Catalog
- `/admin/training` - Training Master Catalog
- `/admin/notices` - Notice Board Master
- `/admin/gallery` - Photo Gallery Repository
- `/admin/payments` - Cadet Refreshment & Washing Allowances
- `/admin/reports` - System Audit Reports
- `/admin/settings` - Portal General Settings

---

## 🎨 Component Architecture

```
src/
├── assets/             # Brand logos & visuals
├── components/
│   ├── cards/          # StatCard, CampCard, AchievementCard, CertificateCard, NoticeCard, RankCard, OfficerCard
│   ├── common/         # AnnouncementBar, Navbar, Footer, Modal, StatusBadge
│   ├── dashboard/      # ProgressCircle
│   └── layout/         # PublicLayout, DashboardLayout, Sidebar, DashboardHeader
├── context/            # AuthContext (Role switching & user state), ToastContext
├── data/               # TS mock datasets (students, officers, camps, certificates, etc.)
├── pages/
│   ├── admin/          # Admin Dashboard, Dynamic Eligibility Rules, Master CRUD
│   ├── auth/           # Login screen
│   ├── officer/        # Officer Dashboard, Cadets, Applications, Attendance, Reports
│   ├── public/         # Home, About, History, UniversityNCC, Ranks, Eligibility, Join, etc.
│   └── student/        # Student Dashboard, Profile, Attendance, Camps, Certificates, etc.
├── routes/             # AppRoutes (Public & Auth route mappings)
└── types/              # TypeScript schemas for Cadets, Camps, Certificates, Attendance, Rules
```
# ncc
# ncc
# ncc
# ncc
