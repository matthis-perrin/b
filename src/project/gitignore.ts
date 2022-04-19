export function generateGitIgnore(): string {
  return `
.DS_Store
node_modules
build
dist
tmp
    `.trim();
}
