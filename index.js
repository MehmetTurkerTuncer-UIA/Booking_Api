import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { sequelize, connectDB } from './src/configs/db.js' // sequelize'ı da al
// import './src/models/Reservation.js' // modellerini burada import et (ilişkiler kurulacaksa)
import router from './src/routers/api/index.js' 
import errorHandler from './src/middlewares/errorHandler.js'



// Uygulama
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// Health
app.get('/health', (req, res) => {
  res.json({ ok: true, db: sequelize?.options?.database || process.env.DB_NAME })
})

// Test route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Booking_Api is running 🚀' })
})

// 404
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'Not Found' })
})


app.use("./api", router )

// ERROR HANDLER
app.use(errorHandler)


// --- DB bağlan + sync + server başlat ---
await connectDB()
// await sequelize.sync({ alter: true }) // geliştirme aşamasında işine yarar

const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
)

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down...')
  await sequelize.close().catch(() => {})
  server.close(() => process.exit(0))
})
