import {readdir} from 'node:fs/promises';
import {join, relative} from 'node:path';

import {underline} from 'ansi-colors';
import {Configuration, Stats, webpack} from 'webpack';

import {exists} from '@src/fs';
import {groupAndSortErrors} from '@src/webpack-runner/error_grouper';
import {ParsedError, parseError} from '@src/webpack-runner/error_parser';
import {renderErrors, renderProjectStatus} from '@src/webpack-runner/renderer';
import {table} from '@src/webpack-runner/text_table';

interface RunWebpacksOptions {
  root: string;
  projectPaths: string[];
}

interface ProjectStatus {
  firstRun: boolean;
  isRunning: boolean;
  errors: ParsedError[];
}

const name = 'WebpackRunner';

export async function runWebpacks(opts: RunWebpacksOptions): Promise<void> {
  const {root, projectPaths} = opts;
  const statuses = new Map<string, ProjectStatus>();

  function handleStart(project: string): void {
    const current = statuses.get(project) ?? {firstRun: true, isRunning: true, errors: []};
    statuses.set(project, {...current, isRunning: true});
    redraw();
  }

  function handleResults(project: string, stats: Stats): void {
    const errors = [
      ...stats.compilation.errors.map(err => parseError(err, {root, severity: 'error'})),
      ...stats.compilation.warnings.map(warn => parseError(warn, {root, severity: 'warning'})),
    ];
    statuses.set(project, {firstRun: false, isRunning: false, errors});
    redraw();
  }

  function redraw(): void {
    const errors = [...statuses.values()].flatMap(v => v.errors);
    const groupedErrors = groupAndSortErrors(errors);

    const summary = [...statuses.entries()].map(([projectPath, status]) =>
      renderProjectStatus(projectPath, status.firstRun, status.isRunning, groupedErrors)
    );
    summary.unshift([
      underline(`Projects (${projectPaths.length})`),
      underline('Status'),
      underline('Run'),
    ]);
    const report = renderErrors(groupedErrors);

    process.stdout.write('\u001B[2J\u001B[3J\u001B[H'); // clear terminal
    console.log(`Projects (${projectPaths.length}):`);
    console.log(table(summary));
    if (report.length > 0) {
      console.log('\n-----\n');
      console.log(report);
    }
  }

  for (const projectPath of projectPaths.sort((p1, p2) => p1.localeCompare(p2))) {
    const projectName = relative(root, projectPath);
    statuses.set(projectName, {firstRun: true, isRunning: true, errors: []});
    // eslint-disable-next-line import/dynamic-import-chunkname, node/no-unsupported-features/es-syntax, no-await-in-loop
    const config: Configuration = await import(
      /*webpackIgnore: true*/ join(projectPath, 'webpack.config.js')
    ).then(({getConfig}) => getConfig(projectPath));

    const compiler = webpack(config);
    compiler.hooks.beforeRun.tap(name, () => handleStart(projectName));
    compiler.hooks.watchRun.tap(name, () => handleStart(projectName));
    compiler.hooks.done.tap(name, stats => handleResults(projectName, stats));
    compiler.watch({}, (err, res) => {
      if (err || !res) {
        console.log(err);
        // eslint-disable-next-line node/no-process-exit
        process.exit(1);
      }
    });
  }
}

export async function runAllWebpacks(root: string): Promise<void> {
  const rootFiles = await readdir(root, {withFileTypes: true});
  const dirs = rootFiles.filter(ent => ent.isDirectory()).map(dir => join(root, dir.name));
  const packages = await Promise.all(
    dirs.map(async dir => ((await exists(join(dir, 'package.json'))) ? dir : undefined))
  );
  await runWebpacks({
    root,
    projectPaths: packages.filter((p): p is string => p !== undefined),
  });
}
