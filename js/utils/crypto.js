// Dekripsi PDF (AES-256-GCM + PBKDF2)
async function dec(b64, pw) {
  const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const km = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pw),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: raw.slice(0, 16),
      iterations: 250000,
      hash: "SHA-256",
    },
    km,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  return crypto.subtle.decrypt(
    { name: "AES-GCM", iv: raw.slice(16, 28) },
    key,
    raw.slice(28),
  );
}
