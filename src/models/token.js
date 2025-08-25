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
    set(value) {
      if (typeof value === "string") {
        this.setDataValue("token", value.trim().replace(/\s+/g, " "))
      }
    },
  },
}, {
  tableName: "tokens",
  timestamps: true,
  underscored: true,
});

export default Token;
