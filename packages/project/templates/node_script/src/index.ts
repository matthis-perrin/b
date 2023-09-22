export async function run(): Promise<void> {
  await Promise.resolve();
  console.log('Hello World');
}

run().catch(console.error);
