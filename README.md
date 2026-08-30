# 🚀 3D Portfolio

A modern, responsive personal portfolio website built with Next.js, React, TypeScript, Prisma, and PostgreSQL.

The portfolio includes a dynamic admin dashboard that allows portfolio content to be managed easily without directly editing the website code.

## 🌐 Live Website

https://3d-portfolio-omega-nine.vercel.app/

## ✨ Features

- Modern and responsive portfolio design
- Personal profile and biography
- Hero section
- Skills and technologies section
- Project showcase
- Project images
- Experience section
- Education section
- Achievements section
- Services section
- Resume preview
- Resume download
- Contact section
- Admin login
- Admin dashboard
- Dynamic portfolio content management
- PostgreSQL database
- Prisma ORM
- Responsive design for desktop and mobile
- Production deployment with Vercel

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- HTML5
- CSS3
- JavaScript

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Tools & Services

- Git
- GitHub
- Vercel

## 🗄️ Database

This project uses PostgreSQL as the database with Prisma ORM.

The database manages portfolio sections such as:

- Profile
- Hero
- Skills
- Projects
- Experience
- Education
- Achievements
- Services
- Resume
- Site Settings
- Messages

## 📁 Project Structure

```text
3d-portfolio/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   └── uploads/
│
├── src/
│   └── app/
│       ├── admin/
│       ├── api/
│       └── ...
│
├── .gitignore
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/adittya-code/3d-portfolio.git
cd 3d-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="your-postgresql-database-url"
```

Add any other required environment variables used by your deployment.

> Never commit real passwords, database credentials, API keys, or other secrets to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma@5.22.0 generate
```

### 5. Run the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## ☁️ Deployment

The project is deployed using Vercel.

The production website is available at:

https://3d-portfolio-omega-nine.vercel.app/

The project can be connected to GitHub so that new commits can trigger automatic deployments.

## 🔐 Security

Environment files containing sensitive information should not be committed to the repository.

The project ignores environment files such as:

```text
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.backup
```

Keep database credentials and other secrets inside environment variables.

## 📄 Resume

The portfolio provides:

- Resume preview
- Resume download

The resume is stored inside the project's public uploads directory.

## 👨‍💻 Developer

### Aditya Kumar Maurya

**C++ Developer | Full Stack Developer | Problem Solver**

GitHub:

https://github.com/adittya-code

Portfolio:

https://3d-portfolio-omega-nine.vercel.app/

## 📌 Project Purpose

This portfolio was created to showcase my programming skills, web development projects, technical experience, and continuous learning.

It also demonstrates practical experience with modern frontend development, backend APIs, database management, authentication, deployment, and content management.

## 📜 License

This project is created for personal portfolio and educational purposes.
