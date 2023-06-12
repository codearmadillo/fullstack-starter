export function isEmptyOrWhitespace(value: string): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  return value?.split('').join('') === '';
}
