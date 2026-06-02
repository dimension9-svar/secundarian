import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "crypto";

/**
 * Password hashing with Node's built-in scrypt — no third-party dependency.
 * Stored format: scrypt$N$r$p$saltB64$hashB64
 */

// Promise wrapper that preserves the options argument (util.promisify's typings
// drop the options overload).
function scryptAsync(
  password: string,
  salt: Buffer,
  keylen: number,
  options: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keylen, options, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
}

const N = 16384; // CPU/memory cost
const r = 8;
const p = 1;
const KEYLEN = 64;
const SALT_LEN = 16;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LEN);
  const derived = (await scryptAsync(password.normalize("NFKC"), salt, KEYLEN, {
    N,
    r,
    p,
    maxmem: 64 * 1024 * 1024,
  })) as Buffer;
  return [
    "scrypt",
    N,
    r,
    p,
    salt.toString("base64"),
    derived.toString("base64"),
  ].join("$");
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, nStr, rStr, pStr, saltB64, hashB64] = parts;
  const salt = Buffer.from(saltB64, "base64");
  const expected = Buffer.from(hashB64, "base64");
  const derived = (await scryptAsync(
    password.normalize("NFKC"),
    salt,
    expected.length,
    {
      N: Number(nStr),
      r: Number(rStr),
      p: Number(pStr),
      maxmem: 64 * 1024 * 1024,
    },
  )) as Buffer;
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}
