import { randomInt } from "node:crypto";

const TOKEN_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const REFERENCE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// randomInt evita el sesgo del modulo y usa el CSPRNG del sistema: estos tokens
// son la unica credencial que protege una propuesta (datos del cliente, precios
// y firma del contrato), asi que no pueden salir de Math.random.
function randomString(length: number, alphabet: string): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(randomInt(alphabet.length));
  }
  return result;
}

export function generateProposalToken(): string {
  return randomString(32, TOKEN_ALPHABET);
}

export function generateReferenceCode(): string {
  return `CC-${randomString(6, REFERENCE_ALPHABET)}`;
}
