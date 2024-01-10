export async function handler(): Promise<unknown> {
  await Promise.resolve();
  return {hello: 'world'};
}
