// src/middlewares/authentication.js
import jwt from "jsonwebtoken"
import { User, Token } from "../models/index.js" // Token kullanıyorsan; yoksa bu import'u kaldır.

export default async function authentication(req, res, next) {
  try {
    const auth = req.headers?.authorization || "" // "Token xxx" | "Bearer yyy"
    const [scheme, value] = auth.split(" ")

    if (scheme === "Token" && value) {
      // Simple Token → Token tablosundan kullanıcıyı çek
      // Token.belongsTo(User, { foreignKey: 'userId' }) ilişkisinin tanımlı olduğundan emin ol.
      const tokenData = await Token.findOne({
        where: { token: value },
        include: [{ model: User }],
      })
      req.user = tokenData?.User || undefined
    } else if (scheme === "Bearer" && value) {
      // JWT → imzayı doğrula
      try {
        const payload = jwt.verify(value, process.env.ACCESS_KEY)
        // payload içinde userId/id varsa istersen DB'den taze user çekebilirsin:
        // req.user = await User.findByPk(payload.id)
        req.user = payload
      } catch {
        req.user = undefined
      }
    } else {
      req.user = undefined
    }
  } catch {
    req.user = undefined
  }

  next()
}
