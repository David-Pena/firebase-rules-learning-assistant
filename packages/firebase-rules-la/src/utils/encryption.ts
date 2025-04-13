const ENCRYPTION_KEY = 'firestore-rules-helper-key'

/**
 * Checks if a string is valid base64
 */
function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

/**
 * Generates a key from a password using PBKDF2
 */
async function getKey(password: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('firestore-rules-helper-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypts data using AES-GCM
 */
export async function encryptData(data: string): Promise<string> {
  const key = await getKey(ENCRYPTION_KEY)
  const enc = new TextEncoder()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  
  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    enc.encode(data)
  )
  
  const encryptedArray = new Uint8Array(encryptedContent)
  const combined = new Uint8Array(iv.length + encryptedArray.length)
  combined.set(iv)
  combined.set(encryptedArray, iv.length)
  
  return btoa(String.fromCharCode(...combined))
}

/**
 * Decrypts data using AES-GCM
 */
export async function decryptData(encryptedData: string): Promise<string> {
  try {
    if (!encryptedData || !isValidBase64(encryptedData)) {
      return '';
    }

    const key = await getKey(ENCRYPTION_KEY)
    const dec = new TextDecoder()
    const combined = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    )
    
    const iv = combined.slice(0, 12)
    const encryptedArray = combined.slice(12)
    
    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encryptedArray
    )
    
    return dec.decode(decryptedContent)
  } catch (error) {
    console.error('Failed to decrypt:', error)
    console.warn('Decryption failed, returning empty string')
    return ''
  }
}