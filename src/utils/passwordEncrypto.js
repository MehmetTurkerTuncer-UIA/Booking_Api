// helpers/passwordEncrypt.js
"use strict";
/* -------------------------------------------------------
   | FULLSTACK TEAM | NODEJS / EXPRESS | PostgreSQL |
------------------------------------------------------- */
// passwordEncrypt(password: string):

import { pbkdf2Sync } from "node:crypto";

const keyCode = process.env.SECRET_KEY || "default_secret"; // .env'den al
const loopCount = 1000;   // iterasyon sayısı
const charCount = 32;     // çıktı uzunluğu (byte)
const encType = "sha512"; // algoritma

export default function passwordEncrypt(password) {
  return pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
}
