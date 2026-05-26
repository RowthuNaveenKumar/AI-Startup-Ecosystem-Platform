# 🚀 AI Startup Ecosystem Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend%20Hosting-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloud%20Database-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" />
  <img src="https://img.shields.io/badge/Containerized-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Version%20Control-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</p>

<h1 align="center">🌐 AI Startup Ecosystem Platform</h1>

<p align="center">
  A full-stack platform designed to help users discover, explore, and interact with AI startups, tools, and ecosystem resources through a modern and scalable web experience.
</p>

<p align="center">
  <a href="https://resilient-sunburst-d20b48.netlify.app/"><strong>🌍 Live Demo</strong></a> •
  <a href="https://ai-startup-platform-latest.onrender.com"><strong>⚙ Backend API</strong></a> •
  <a href="https://github.com/RowthuNaveenKumar/AI-Startup-Ecosystem-Platform"><strong>📂 Repository</strong></a>
</p>

---

## 📖 Overview

The **AI Startup Ecosystem Platform** is a full-stack web application built to provide a centralized ecosystem where users can discover AI startups, explore emerging AI tools, and interact with startup ecosystem resources.

This project demonstrates modern full-stack engineering practices including:

- Single Page Application (SPA) frontend architecture
- RESTful API backend development
- Cloud deployment
- Database integration
- Docker containerization
- Environment variable configuration
- CI/CD-ready deployment workflow
- Production-ready project architecture

---

# ✨ Features

### Core Features

✅ Discover AI startups  
✅ Explore startup ecosystem resources  
✅ Responsive modern user interface  
✅ Fast API-driven architecture  
✅ Cloud-hosted deployment  
✅ Dockerized backend support  
✅ Production-ready scalable structure  

### Technical Features

✅ React.js frontend with Vite  
✅ Spring Boot REST API backend  
✅ MySQL cloud database integration  
✅ Hibernate / JPA ORM support  
✅ Railway MySQL cloud hosting  
✅ Netlify frontend deployment  
✅ Render backend deployment  
✅ Environment variable configuration  
✅ GitHub version control workflow  

---

# 🛠 Tech Stack

| Category | Technology |
|--------|------------|
| Frontend | React.js, Vite, Axios, JavaScript, CSS3 |
| Backend | Spring Boot, Java, Spring MVC, Spring Data JPA, Hibernate |
| Database | MySQL (Railway Cloud) |
| Deployment | Netlify, Render, Railway |
| Containerization | Docker |
| Build Tools | Maven, npm |
| Version Control | Git, GitHub |
| API Testing | Postman |

---

# 🏗 Architecture Overview

```text
                User
                 │
                 ▼
      React Frontend (Netlify)
                 │
                 ▼
         REST API Requests
                 │
                 ▼
   Spring Boot Backend (Render)
                 │
                 ▼
       JPA / Hibernate Layer
                 │
                 ▼
    Railway Cloud MySQL Database
```

---

# 📂 Project Structure

```bash
AI-Startup-Ecosystem-Platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── repository/
│   │       │   ├── entity/
│   │       │   └── config/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── .gitignore
└── README.md
```

---

# ⚙ Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/RowthuNaveenKumar/AI-Startup-Ecosystem-Platform.git
cd AI-Startup-Ecosystem-Platform
```

---

## 2. Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

## 3. Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
mvn clean install
```

---

## 4. Configure Database

Create MySQL database:

```sql
CREATE DATABASE ai_startup_platform;
```

---

## 5. Configure Backend Environment

Update:

```bash
src/main/resources/application.properties
```

With:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=${PORT:8080}
```

Set environment variables:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/ai_startup_platform
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

Run backend:

```bash
mvn spring-boot:run
```

Backend runs at:

```bash
http://localhost:8080
```

---

# 🔐 Environment Variables

## Frontend

```env
VITE_API_URL=https://ai-startup-platform-latest.onrender.com
```

## Backend

```env
SPRING_DATASOURCE_URL=jdbc:mysql://your-host:3306/your-db
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```

---

# 🐳 Docker Setup

## Build Docker Image

```bash
docker build -t ai-startup-platform .
```

## Run Docker Container

```bash
docker run -p 8080:8080 ai-startup-platform
```

---

# ☁ Deployment

## Frontend Deployment (Netlify)

Frontend is hosted on Netlify.

Build settings:

```bash
Build Command: npm run build
Publish Directory: dist
```

Deployment process:

- Push frontend code to GitHub
- Connect repository to Netlify
- Configure environment variables
- Deploy automatically

---

## Backend Deployment (Render)

Backend is hosted on Render.

Build command:

```bash
./mvnw clean package
```

Start command:

```bash
java -jar target/app.jar
```

Environment variables:

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
```

---

## Database Deployment (Railway)

Database is hosted on Railway Cloud MySQL.

Deployment steps:

- Create Railway project
- Provision MySQL instance
- Copy credentials
- Configure Spring datasource in Render

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/startups | Fetch all AI startups |
| GET | /api/startups/{id} | Fetch startup by ID |
| POST | /api/startups | Create startup |
| PUT | /api/startups/{id} | Update startup |
| DELETE | /api/startups/{id} | Delete startup |

---

# 📸 Screenshots

Screenshots will be added soon.

Planned structure:

```bash
screenshots/
├── homepage.png
├── dashboard.png
├── startup-details.png
```

---

# 🔮 Future Enhancements

- 🤖 AI-powered startup recommendations
- 🔐 User authentication & authorization
- 👤 User profiles
- ⭐ Save favorite startups
- 🔍 Advanced search & filters
- 📊 Analytics dashboard
- 🧠 AI chatbot integration
- 📱 Progressive Web App (PWA)
- 🌐 Multi-language support
- 📧 Email notifications
- Docker Compose setup
- GitHub Actions CI/CD pipeline
- Admin dashboard

---

# 🤝 Contribution

Contributions are welcome.

Fork repository:

```bash
git clone https://github.com/your-username/AI-Startup-Ecosystem-Platform.git
```

Create feature branch:

```bash
git checkout -b feature/new-feature
```

Commit changes:

```bash
git commit -m "Add new feature"
```

Push branch:

```bash
git push origin feature/new-feature
```

Create Pull Request.

---

# 🧪 Testing

Backend:

```bash
mvn test
```

Frontend:

```bash
npm test
```

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Naveen Kumar

Full Stack Developer | Java Backend Developer | Cloud Enthusiast

GitHub:  
https://github.com/RowthuNaveenKumar

---

# ⭐ Support

If you found this project useful:

⭐ Star this repository  
🍴 Fork this project  
🚀 Share feedback  
💡 Suggest improvements  

---

<p align="center">
Built with ❤️ using React.js, Spring Boot, MySQL, Docker, and Cloud Infrastructure
</p>
