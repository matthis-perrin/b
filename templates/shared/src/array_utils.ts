export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
}

export function splitOnce(value: string, splitter: string): [string] | [string, string] {
  const splitterIndex = value.indexOf(splitter);
  if (splitterIndex === -1) {
    return [value];
  }

  return [value.slice(0, splitterIndex), value.slice(splitterIndex + splitter.length)];
}

export function splitOnceOrThrow(value: string, splitter: string): [string, string] {
  const splitterIndex = value.indexOf(splitter);
  if (splitterIndex === -1) {
    throw new Error(`Expected two values when splitting "${value}" with "${splitter}"`);
  }
  return [value.slice(0, splitterIndex), value.slice(splitterIndex + splitter.length)];
}

export function splitLastOrThrow(value: string, splitter: string): [string, string] {
  const lastIndex = value.lastIndexOf(splitter);
  if (lastIndex === -1) {
    throw new Error(`Expected two values when splitting "${value}" with "${splitter}"`);
  }
  const first = value.slice(0, lastIndex);
  const last = value.slice(lastIndex + splitter.length);
  return [first, last];
}

export function splitLast(value: string, splitter: string): [string, string] | [string] {
  try {
    return splitLastOrThrow(value, splitter);
  } catch {
    return [value];
  }
}

export function splitBothEndOrThrow(value: string, splitter: string): [string, string, string] {
  const firstSlash = value.indexOf(splitter);
  const lastSlash = value.lastIndexOf(splitter);

  if (firstSlash === -1 || lastSlash === -1) {
    throw new Error(`Expected three values when splitting "${value}" with "${splitter}"`);
  }

  const first = value.slice(0, firstSlash);
  const middle = value.slice(firstSlash + splitter.length, lastSlash);
  const last = value.slice(lastSlash + splitter.length);

  return [first, middle, last];
}
