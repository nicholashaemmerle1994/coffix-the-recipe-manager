import Tokens from 'csrf';

const tokens = new Tokens();

// Create a new secret/seed to store in the sessions table
export function createCsrfSecret() {
  return tokens.secretSync();
}

// use a secrete/seed to from sessions to generate a csrf token

export function createCsrfToken(secret: string) {
  return tokens.create(secret);
}

// validate a csrf token with secret/seed from sessions
export function validateCsrfToken(secret: string, token: string) {
  return tokens.verify(secret, token);
}
