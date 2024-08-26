import {ProjectType, WorkspaceName} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {generateFrontendTerraform} from '@src/project/terraform/frontend';
import {generateLambdaTerraform} from '@src/project/terraform/lambda';
import {generateAwsProviderTerraform} from '@src/project/terraform/provider';
import {generateS3BucketTerraform} from '@src/project/terraform/s3';
import {neverHappens} from '@src/type_utils';

export interface AppDomain {
  rootDomain: string;
  subDomain: string;
}

export function generateCommonTerraform(
  workspaceName: WorkspaceName,
  projects: WorkspaceProject[]
): string {
  return [
    generateAwsProviderTerraform(workspaceName),
    generateS3BucketTerraform(
      workspaceName,
      projects.filter(p => p.type === ProjectType.Web).map(p => p.projectName)
    ),
  ].join('\n\n');
}

export function generateWorkspaceProjectTerraform(
  workspaceName: WorkspaceName,
  project: WorkspaceProject
): string | undefined {
  const {projectName, type, fromFragment, flags} = project;
  const cloudwatchTriggerMinutes =
    'cloudwatchTriggerMinutes' in fromFragment ? fromFragment.cloudwatchTriggerMinutes : undefined;
  const alarmEmail = 'alarmEmail' in fromFragment ? fromFragment.alarmEmail : undefined;
  const domainStr = 'domain' in fromFragment ? fromFragment.domain : undefined;
  const webAppName = 'appName' in fromFragment ? fromFragment.appName : undefined;
  let domain: AppDomain | undefined;
  if (domainStr !== undefined) {
    const [subDomain = '', ...rest] = domainStr.split('.');
    const rootDomain = rest.join('.');
    domain = {subDomain, rootDomain};
  }
  if (type === ProjectType.Web) {
    return generateFrontendTerraform(projectName, {
      domain,
    });
  } else if (type === ProjectType.LambdaFunction) {
    return generateLambdaTerraform(workspaceName, projectName, {
      api: false,
      webAppName,
      alarmEmail,
      cloudwatchTriggerMinutes,
      domain,
      authentication: false,
    });
  } else if (type === ProjectType.LambdaApi) {
    return generateLambdaTerraform(workspaceName, projectName, {
      api: true,
      webAppName,
      alarmEmail,
      cloudwatchTriggerMinutes,
      domain,
      authentication: false,
    });
  } else if (type === ProjectType.LambdaWebApi) {
    return generateLambdaTerraform(workspaceName, projectName, {
      api: true,
      webAppName,
      alarmEmail,
      cloudwatchTriggerMinutes,
      domain,
      authentication: flags['AUTHENTICATION'] === 'true',
    });
  } else if (type === ProjectType.NodeScript) {
    return undefined;
  } else if (type === ProjectType.SharedNode) {
    return undefined;
  } else if (type === ProjectType.SharedWeb) {
    return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (type === ProjectType.Shared) {
    return undefined;
  }
  neverHappens(type, 'ProjectType');
}
