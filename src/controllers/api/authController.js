// src/controllers/api/authenticationController.js
"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { User, Token } from "../../models/index.js";
import passwordEncrypt from "../../utils/passwordEncrypt.js";

const authController = {
  // POST /api/auth/login
  login: async (req, res) => {
    /*
      #swagger.tags = ["Authentication"]
      #swagger.summary = "Login"
      #swagger.description = 'Login with email (or name) and password to get Token and JWT.'
      #swagger.parameters["body"] = {
        in: "body",
        required: true,
        schema: {
          email: "test@site.com",
          // name: "test",  // opsiyonel: username alanın yoksa name ile ararsın
          password: "Aa123456!"
        }
      }
    */

    const { email, name, password } = req.body || {};

    if (!(email || name) || !password) {
      const err = new Error("Please enter email/name and password.");
      err.status = 401;
      throw err;
    }

    // Kullanıcıyı bul (email öncelikli, yoksa name)
    const user = await User.findOne({
      where: {
        ...(email ? { email: String(email).trim().toLowerCase() } : {}),
        ...(email ? {} : { name: name }),
      },
      // defaultScope ile password gizliyse ve karşılaştırmak istiyorsan:
      // attributes: { include: ['password'] }
      // veya User.scope('withPassword').findOne(...)
    });

    const hashed = passwordEncrypt(password);
    if (!user || user.password !== hashed) {
      const err = new Error("Wrong email/name or password.");
      err.status = 401;
      throw err;
    }

    // Eğer isActive alanın varsa ve kontrol etmek istiyorsan:
    // if (user.isActive === false) {
    //   const err = new Error("This account is not active.");
    //   err.status = 401;
    //   throw err;
    // }

    // Simple Token (tokens tablosu)
    const [tokenRow] = await Token.findOrCreate({
      where: { userId: user.id },
      defaults: {
        userId: user.id,
        token: passwordEncrypt(String(user.id) + Date.now()),
      },
    });

    // JWT — payload mümkün olduğunca minimal olsun
    const payload = { id: user.id};
    const accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      { id: user.id, password: user.password }, // orijinal mantık: hash'i taşı
      process.env.REFRESH_KEY,
      { expiresIn: "3d" }
    );

    return res.status(200).json({
      error: false,
      token: tokenRow.token, // simple token
      bearer: { accessToken, refreshToken }, // JWT çifti
      user, // defaultScope ile password gizli olmalı
    });
  },

  // POST /api/auth/refresh
  refresh: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Refresh'
      #swagger.description = 'Refresh access-token by refresh-token.'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          bearer: {
            refreshToken: '___refreshToken___'
          }
        }
      }
    */

    const refreshToken = req.body?.bearer?.refreshToken;
    if (!refreshToken) {
      const err = new Error("Please enter bearer.refreshToken");
      err.status = 401;
      throw err;
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
      const { id, password } = decoded || {};

      if (!id || !password) {
        const err = new Error("Invalid refresh token payload.");
        err.status = 401;
        throw err;
      }

      // Kullanıcıyı bul
      // (defaultScope parolayı gizliyorsa, password karşılaştırması için include et)
      const user = await User.findOne({
        where: { id },
        // attributes: { include: ['password'] }
      });

      if (!user || user.password !== password) {
        const err = new Error("Wrong id or password in refresh token.");
        err.status = 401;
        throw err;
      }

      // Eğer aktiflik kontrolü istiyorsan:
      // if (user.isActive === false) {
      //   const err = new Error("This account is not active.");
      //   err.status = 401;
      //   throw err;
      // }

      // Yeni access token üret
      const payload = { id: user.id };
      const accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
        expiresIn: "30m",
      });

      return res.status(200).json({
        error: false,
        bearer: { accessToken },
      });
    } catch (err) {
      err.status = 401;
      throw err;
    }
  },

  // POST /api/auth/logout
  logout: async (req, res) => {
    /*
      #swagger.tags = ["Authentication"]
      #swagger.summary = "Token: Logout"
      #swagger.description = 'Delete simple token key. For JWT, just delete tokens on client.'
    */

    const auth = req.headers?.authorization || ""; // "Token xxx" | "Bearer yyy"
    const [scheme, value] = auth.split(" ");

    let message = null;
    let result = {};

    if (scheme === "Token" && value) {
      // Simple Token kaydını sil
      const deletedCount = await Token.destroy({ where: { token: value } });
      result = { deletedCount };
      message = "Token deleted. Logout was OK.";
    } else if (scheme === "Bearer") {
      // JWT için sunucu tarafında iş yapılmaz (blacklist vs. istemiyorsan)
      message = "No server-side process for JWT logout. Delete tokens on the client.";
    }

    return res.status(200).json({
      error: false,
      message,
      result,
    });
  },
};

export default authController;
