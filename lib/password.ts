import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64); // the scrypt algorithm is sufficient here, use Argon2 for stronger security
  return (derivedKey as Buffer).toString("hex") + ":" + salt;
}

export async function verifyPasswordHash(hash: string, password: string) {
  const [key, salt] = hash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = await scrypt(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey as Buffer);
}
