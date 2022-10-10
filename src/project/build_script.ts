import {WorkspaceFragment} from '@src/models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateBuildScript(workspaceFragments: WorkspaceFragment[]): string {
  // const projects = workspaceFragments.flatMap(getProjectsFromWorkspaceFragment);
  return `
  const {join, resolve} = require('node:path');
  const {webpack} = require('webpack');
  
  const target = resolve('./script');
  
  import(join(target, 'webpack.config.js')).then(({getConfig}) => {
    webpack(getConfig(target), (err, stats) => {
      if (err || !stats) {
        console.log('####### ERROR #######');
        console.log(err);
        console.log('#####################');
        return;
      }
  
      const {errors, warnings} = stats.toJson({errors: true, warnings: true});
  
      if (errors.length > 0) {
        for (const error of errors) {
          console.log('ERROR ' + error.file);
          console.log(error.stack ?? error.message);
          console.log('');
        }
        console.log('');
      }
  
      for (const warning of warnings) {
        console.log('WARNING ' + warning.file);
        console.log(warning.stack ?? warning.message);
        console.log('');
      }
    });
  });  
`.trim();
}
