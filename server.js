const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const Minio = require('minio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// Initialize MinIO bucket
const initMinio = async () => {
  try {
    const bucketExists = await minioClient.bucketExists(process.env.MINIO_BUCKET);
    if (!bucketExists) {
      await minioClient.makeBucket(process.env.MINIO_BUCKET);
      console.log('MinIO bucket created successfully');
    }
  } catch (error) {
    console.error('MinIO initialization error:', error);
  }
};

// Routes
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Jereme Paragoso',
    email: 'jereme.paragoso07@gmail.com',
    phone: '09652111529',
    title: 'Frontend Developer',
    bio: 'Passionate beginner web developer specializing in HTML, CSS, and JavaScript. Always eager to learn and create amazing web experiences.',
  });
});

app.get('/api/skills', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY level DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initMinio();
});