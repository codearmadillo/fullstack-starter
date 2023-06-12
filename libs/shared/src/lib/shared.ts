export function shared(): string {
  return 'shared';
}

export function createHash(stringInput: string) {
  return createHash("sha256").update(stringInput).digest('hex');
}

export function isEmptyOrWhitespace(value: string): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  return value?.split('').join('') === '';
}
