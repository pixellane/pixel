# Jereme Paragoso Portfolio

A full-stack portfolio application with React frontend, Node.js backend, PostgreSQL database, and MinIO file storage.

## Project Structure
- `frontend/` - React application
- `backend/` - Node.js Express API
- `database/` - PostgreSQL with Docker
- `minio/` - MinIO object storage with Docker

## Quick Start
```bash
# Start databases
docker-compose up -d

# Install and run backend
cd backend
npm install
npm run dev

# Install and run frontend
cd frontend
npm install
npm start
```

## Features
- Modern React portfolio with purple/black theme
- RESTful API backend
- PostgreSQL database
- MinIO file storage
- Dockerized services