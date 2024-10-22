import {randomUUID} from 'node:crypto';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {execAsync} from '@src/child_process_utils';
import {ProjectType} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {asJson, asMap, asString, neverHappens, removeUndefined} from '@src/type_utils';
import {runnerLog} from '@src/webpack-runner/log';

export async function deployProject(
  project: WorkspaceProject,
  opts: {root: string}
): Promise<{url?: string}> {
  const {root} = opts;
  // Fetch terraform outputs
  const terraformPath = join(root, 'terraform');
  const stdout = await execAsync(`terraform output -json`, {cwd: terraformPath});
  const outputRes = asJson(stdout, {});
  const terraformOutputs = Object.fromEntries(
    removeUndefined(
      Object.entries(outputRes).map(([key, obj]) => {
        const value = asString(asMap(obj, {})['value']);
        if (value === undefined) {
          return undefined;
        }
        return [key, value];
      })
    )
  );
  if (Object.keys(terraformOutputs).length === 0) {
    throw new Error('You must run "terraform apply" to deploy the infrastructure first');
  }

  // Deploy
  const [url] = removeUndefined(
    await Promise.all([
      deployLambda(project, terraformOutputs),
      deployWebsite(project, terraformOutputs),
    ])
  );
  return {url};
}

function getTerraformOutput(terraformOutputs: Record<string, unknown>, name: string): string {
  const value = terraformOutputs[name];
  if (typeof value !== 'string') {
    throw new Error(`"${name}" variable not found in terraform output, run \`terraform apply\`?`);
  }
  return value;
}

async function deployLambda(
  project: WorkspaceProject,
  terraformOutputs: Record<string, unknown>
): Promise<string | undefined> {
  if (
    project.type === ProjectType.Shared ||
    project.type === ProjectType.SharedWeb ||
    project.type === ProjectType.SharedNode ||
    project.type === ProjectType.Web ||
    project.type === ProjectType.NodeScript
  ) {
    // Not a lambda
    return;
  } else if (
    project.type === ProjectType.LambdaApi ||
    project.type === ProjectType.LambdaWebApi ||
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    project.type === ProjectType.LambdaFunction
  ) {
    const workspaceName = project.vars['__WORKSPACE_NAME__'];
    const lambdaName = project.projectName;
    const tmp = tmpdir();
    const zipPath = `${join(tmp, randomUUID())}.zip`;
    const codeBucket = getTerraformOutput(terraformOutputs, 'code_bucket');
    const region = getTerraformOutput(terraformOutputs, 'region');
    const lambdaNameTerraform = getTerraformOutput(terraformOutputs, `${lambdaName}_function_name`);
    const lambdaUrlTerraform = getTerraformOutput(terraformOutputs, `${lambdaName}_url`);
    runnerLog(`${project.projectName}: deploy start`);

    // Zip dist dir
    await execAsync(`pushd ${lambdaName}/dist; zip -q -r ${zipPath} *; popd`);
    runnerLog(`${project.projectName}: zip done`);
    // Upload to S3
    await execAsync(
      `aws s3api put-object --bucket ${codeBucket} --key ${lambdaName}/dist.zip --tagging "Project=${workspaceName}" --body ${zipPath}`
    );
    runnerLog(`${project.projectName}: upload done`);
    // Update lambda
    await execAsync(
      `aws lambda update-function-code --function-name ${
        lambdaNameTerraform
      } --s3-bucket ${codeBucket} --s3-key ${lambdaName}/dist.zip --region ${region} --no-cli-pager`
    );
    runnerLog(`${project.projectName}: update done`);

    return asString(lambdaUrlTerraform);
  }
  neverHappens(project.type);
}

async function deployWebsite(
  project: WorkspaceProject,
  terraformOutputs: Record<string, unknown>
): Promise<string | undefined> {
  if (
    project.type === ProjectType.Shared ||
    project.type === ProjectType.SharedWeb ||
    project.type === ProjectType.SharedNode ||
    project.type === ProjectType.NodeScript ||
    project.type === ProjectType.LambdaApi ||
    project.type === ProjectType.LambdaWebApi ||
    project.type === ProjectType.LambdaFunction
  ) {
    // Not a website
    return;
  } else if (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    project.type === ProjectType.Web
  ) {
    runnerLog(`${project.projectName}: deploy start`);
    const websiteName = project.projectName;
    const codeBucket = getTerraformOutput(terraformOutputs, 'code_bucket');
    const websiteUrl = getTerraformOutput(
      terraformOutputs,
      `${websiteName}_cloudfront_domain_name`
    );
    await execAsync(`aws s3 sync ${websiteName}/dist s3://${codeBucket}/${websiteName}`);
    runnerLog(`${project.projectName}: sync done`);
    return websiteUrl;
  }
  neverHappens(project.type);
}
