// src/configs/db.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME,   // bookingdb
  process.env.DB_USER,   // postgres
  process.env.DB_PASS,   // postgres
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // SQL loglarını görmek istersen true yapabilirsin
    timezone: '+00:00', // UTC
  }
);

// Veritabanı bağlantısını test eden fonksiyon
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL bağlantisi başarili.');
  } catch (error) {
    console.error('❌ PostgreSQL bağlanti hatasi:', error);
    process.exit(1); // Hata olursa uygulamayı durdur
  }
};
