// src/models/User.js
import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/db.js'

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100],
    },
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('name', value.trim().replace(/\s+/g, ' '))
      }
    },
  },

  email: {
    type: DataTypes.STRING(254),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,        // DB seviyesinde de basic format kontrolü kalsın
      len: [5, 254],
    },
    set(value) {
      if (typeof value === 'string') {
        // Controller zaten normalize edecek ama burada da idempotent tutalım
        this.setDataValue('email', value.trim().toLowerCase())
      }
    },
  },

  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,           // tekilleştirmek istemezsen kaldır
    validate: {
      notEmpty: true,
      len: [5, 15],
      is: /^[+0-9\s()-]+$/i, // +, rakam, boşluk ve parantez/çıkarma işaretlerine izin
    },
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('phoneNumber', value.trim().replace(/\s+/g, ' '))
      }
    },
  },

  password: {
    type: DataTypes.STRING(72), // bcrypt hash ~60; üst sınırı 72 güvenli
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 72],         // controller regex’i zaten daha sıkı; burada min koruyucu kalsın
    },
    // DİKKAT: Hash HOOK’u YOK — hash'i controller'da emailAndPasswordChecker yapacak
  },

  role: {
    type: DataTypes.ENUM('Admin', 'Staff', 'Guest'),
    defaultValue: 'Guest',
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
/*''''''''''''''''''''''''''''''''''*
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: {}, // login'de User.scope('withPassword') ile kullan
  },

/*''''''''''''''''''''''''''''''''''*/  
})

export default User
