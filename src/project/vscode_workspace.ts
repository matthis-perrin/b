import {join} from 'node:path';

import {maybeReadFile, prettyJson, writeRawFile} from '@src/fs';
import {ProjectName, WorkspaceFragment, WorkspaceFragmentType} from '@src/models';
import {DEFAULT_REGION, getProjectsFromWorkspaceFragment} from '@src/project/generate_workspace';
import {
  asBoolean,
  asMap,
  asMapArray,
  asNumber,
  asString,
  asStringOrThrow,
  removeUndefined,
} from '@src/type_utils';

export function generateCodeWorkspace(
  workspaceName: string,
  workspaceFragments: WorkspaceFragment[]
): Record<string, unknown> {
  const projects = workspaceFragments.flatMap(f => getProjectsFromWorkspaceFragment(f));
  const projectNames = projects.map(p => p.projectName);
  return {
    folders: [
      ...projectNames.map(p => ({path: p})),
      {path: 'terraform'},
      {path: '.', name: 'root'},
    ],
    settings: {
      'window.title': `${workspaceName}\${separator}\${activeEditorShort}`,
      'files.exclude': Object.fromEntries([
        ...projectNames.map(p => [p, true]),
        ['terraform', true],
      ]),
      'editor.acceptSuggestionOnCommitCharacter': false,
      'editor.suggestSelection': 'first',
      'vsintellicode.modify.editor.suggestSelection': 'automaticallyOverrodeDefaultValue',
      'explorer.confirmDelete': false,
      'git.autofetch': true,
      'git.confirmSync': false,
      'typescript.preferences.importModuleSpecifier': 'non-relative',
      'eslint.lintTask.enable': true,
      'eslint.useESLintClass': true,
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll': 'never',
        'source.fixAll.eslint': 'explicit',
      },
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.linkedEditing': true,
      'emmet.showExpandedAbbreviation': 'never',
      'files.associations': {
        '*.tf': 'terraform',
      },
      '[typescript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
      },
      '[typescriptreact]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
      },
      '[terraform]': {
        'editor.defaultFormatter': 'hashicorp.terraform',
      },
    },
    extensions: {
      recommendations: [
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'VisualStudioExptTeam.vscodeintellicode',
        'styled-components.vscode-styled-components',
        'naumovs.color-highlight',
        'eamodio.gitlens',
        'hashicorp.terraform',
      ],
    },
  };
}

export interface FileHash {
  path: string;
  hash: string;
}

export interface WorkspaceOptions {
  region: string;
}

export interface Workspace {
  fragments: WorkspaceFragment[];
  version: string;
  files: FileHash[];
  options: WorkspaceOptions;
}

export async function readWorkspace(workspacePath: string): Promise<Workspace | undefined> {
  const workspaceContent = await maybeReadFile(join(workspacePath, '.workspace'));
  if (workspaceContent === undefined) {
    return undefined;
  }
  const workspaceData = asMap(JSON.parse(workspaceContent), {});

  const fragments = removeUndefined(
    asMapArray(workspaceData['fragments'], []).map<WorkspaceFragment | undefined>(fragData => {
      const type = asString<WorkspaceFragmentType>(fragData['type']);
      if (type === undefined) {
        return undefined;
      } else if (type === WorkspaceFragmentType.Shared) {
        const frag: WorkspaceFragment = {type: WorkspaceFragmentType.Shared};
        return frag;
      } else if (type === WorkspaceFragmentType.SharedWeb) {
        const frag: WorkspaceFragment = {type: WorkspaceFragmentType.SharedWeb};
        return frag;
      } else if (type === WorkspaceFragmentType.SharedNode) {
        const frag: WorkspaceFragment = {type: WorkspaceFragmentType.SharedNode};
        return frag;
      } else if (type === WorkspaceFragmentType.WebApp) {
        const alarmEmail = asString(fragData['alarmEmail']);
        const appName = asStringOrThrow(fragData['appName']);
        const authenticationData = asMap(fragData['authentication'], {});
        const enabled = asBoolean(authenticationData['enabled'], false);
        const domain = asString(fragData['domain']);
        const frag: WorkspaceFragment = {
          type: WorkspaceFragmentType.WebApp,
          alarmEmail,
          appName,
          authentication: {enabled},
          domain,
        };
        return frag;
      } else if (type === WorkspaceFragmentType.StaticWebsite) {
        const websiteName = asStringOrThrow<ProjectName>(fragData['websiteName']);
        const domain = asString(fragData['domain']);
        const frag: WorkspaceFragment = {
          type: WorkspaceFragmentType.StaticWebsite,
          websiteName,
          domain,
        };
        return frag;
      } else if (type === WorkspaceFragmentType.ApiLambda) {
        const alarmEmail = asString(fragData['alarmEmail']);
        const apiName = asStringOrThrow<ProjectName>(fragData['apiName']);
        const domain = asString(fragData['domain']);
        const frag: WorkspaceFragment = {
          type: WorkspaceFragmentType.ApiLambda,
          alarmEmail,
          apiName,
          domain,
        };
        return frag;
      } else if (type === WorkspaceFragmentType.NodeScript) {
        const scriptName = asStringOrThrow<ProjectName>(fragData['scriptName']);
        const frag: WorkspaceFragment = {
          type: WorkspaceFragmentType.NodeScript,
          scriptName,
        };
        return frag;
      }
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      else if (type === WorkspaceFragmentType.StandaloneLambda) {
        const lambdaName = asStringOrThrow<ProjectName>(fragData['lambdaName']);
        const alarmEmail = asString(fragData['alarmEmail']);
        const cloudwatchTriggerMinutes = asNumber(fragData['cloudwatchTriggerMinutes']);
        const frag: WorkspaceFragment = {
          type: WorkspaceFragmentType.StandaloneLambda,
          lambdaName,
          alarmEmail,
          cloudwatchTriggerMinutes,
        };
        return frag;
      }
      return undefined;
    })
  );

  const version = asStringOrThrow(workspaceData['version']);
  const files = removeUndefined(
    asMapArray(workspaceData['files'], []).map<FileHash | undefined>(fileData => {
      const path = asString(fileData['path']);
      const hash = asString(fileData['hash']);
      if (path === undefined || hash === undefined) {
        return undefined;
      }
      return {path, hash};
    })
  );

  const optionsData = asMap(workspaceData['options'], {});
  const region = asString(optionsData['region'], DEFAULT_REGION);
  const options: WorkspaceOptions = {region};

  return {fragments, version, files, options};
}

export async function writeWorkspace(workspacePath: string, workspace: Workspace): Promise<void> {
  workspace.files.sort((f1, f2) => f1.path.localeCompare(f2.path));
  await writeRawFile(join(workspacePath, '.workspace'), await prettyJson(workspace));
}
