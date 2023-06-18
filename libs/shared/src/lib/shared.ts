import { createHash } from 'crypto';

export function shared(): string {
  return 'shared';
}

export function createSha256Hash(stringInput: string) {
  return createHash("sha256").update(stringInput).digest('hex');
}

export function isEmptyOrWhitespace(value: string): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  return value?.split('').join('') === '';
}
