import {exec} from 'node:child_process';

export async function execAsync(
  cmd: Parameters<typeof exec>[0],
  options: Parameters<typeof exec>[1]
): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err !== null) {
        return reject(err);
      }
      const stderrStr = stderr.toString().trim();
      if (stderrStr.length > 0) {
        return reject(new Error(`stderr: ${stderrStr}`));
      }
      resolve(stdout.toString());
    });
  });
}
