"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.js";

// Token Model:
const Token = sequelize.define("Token", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", // tablo adı
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  token: {
    type: DataTypes.STRING(255), // 64 yeter ama güvenli olsun diye biraz geniş tuttum
    allowNull: false,
    unique: true,
    
  },
}, {
  tableName: "tokens",
  timestamps: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['user_id'] }]
});

export default Token;
