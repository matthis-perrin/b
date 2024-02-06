export function capitalize(value: string): string {
  const [firstChar] = value;
  return firstChar === undefined ? '' : firstChar.toUpperCase() + value.slice(1);
}

export function uncapitalize(value: string): string {
  const [firstChar] = value;
  return firstChar === undefined ? '' : firstChar.toLowerCase() + value.slice(1);
}

export function pascalCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[^a-z]+/u)
    .map(s => capitalize(s))
    .join('');
}

export function upperCase(str: string): string {
  return str
    .toUpperCase()
    .split(/[^A-Z]+/u)
    .join('_');
}

export function lowerCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[^a-z]+/u)
    .join('_');
}
