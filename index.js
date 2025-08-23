import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { connectDB } from './src/configs/db.js';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Booking_Api is running 🚀' });
});

// Global error handler (boş, sonra dolduracağız)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: true, message: err.message || 'Internal Server Error' });
});


await connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
