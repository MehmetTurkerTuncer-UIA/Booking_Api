// utils/emailAndPasswordChecker.js
"use strict";

import passwordEncrypt from "./passwordEncrypt";

// Regex sabitleri:
const EMAIL_REGEX =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

/**
 * Email ve şifre doğrulaması yapar.
 * - Email'i trim + lowercase eder
 * - Regex ile doğrular
 * - Şifreyi hash'ler
 *
 * @param {Object} data - { email, password, ... }
 * @returns {Object} data - hash’lenmiş şifreyle döner
 */
export function emailAndPasswordChecker(data = {}) {
  if (typeof data !== "object" || data === null) {
    throw new Error("Geçersiz veri (body).");
  }

  // Email kontrol
  const emailRaw = typeof data.email === "string" ? data.email : "";
  const email = emailRaw.trim().toLowerCase();

  if (!EMAIL_REGEX.test(email)) {
    throw new Error("Email formati geçersiz.");
  }

  // Password kontrol
  const password = typeof data.password === "string" ? data.password : "";
  if (!PASSWORD_REGEX.test(password)) {
    throw new Error(
      "Şifre geçersiz. En az 8 karakter, 1 büyük, 1 küçük, 1 sayı ve 1 özel karakter içermelidir."
    );
  }

  // Hash işlemi
  const hashed = passwordEncrypt(password);

  return {
    ...data,
    email,
    password: hashed,
  };
}

/**
 * Sadece email kontrolü gerektiğinde kullanılabilir.
 */
export function validateEmailOnly(emailRaw = "") {
  const email = String(emailRaw).trim().toLowerCase();
  if (!EMAIL_REGEX.test(email)) throw new Error("Email formati geçersiz.");
  return email;
}
