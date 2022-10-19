import {DetailedError, GlobalError, ParsedError} from '@src/webpack-runner/error_parser';

export interface GroupedErrors {
  errorsByProjectByFile: Map<string, Map<string, DetailedError[]>>;
  globalErrors: GlobalError[];
}

export function groupAndSortErrors(errors: ParsedError[]): GroupedErrors {
  const errorsByProjectByFile = new Map<string, Map<string, DetailedError[]>>();
  const globalErrors: GlobalError[] = [];
  for (const err of errors) {
    if (!('type' in err)) {
      globalErrors.push(err);
    } else {
      let projectErrors = errorsByProjectByFile.get(err.project);
      if (!projectErrors) {
        projectErrors = new Map<string, DetailedError[]>();
        errorsByProjectByFile.set(err.project, projectErrors);
      }
      let fileErrors = projectErrors.get(err.loc.absolutePath);
      if (!fileErrors) {
        fileErrors = [];
        projectErrors.set(err.loc.absolutePath, fileErrors);
      }
      fileErrors.push(err);
    }
  }
  for (const byFile of errorsByProjectByFile.values()) {
    for (const errors of byFile.values()) {
      errors.sort((err1, err2) => {
        if (!err1.loc.start) {
          return -1;
        } else if (!err2.loc.start) {
          return 1;
        }
        return err1.loc.start.line - err2.loc.start.line;
      });
    }
  }
  return {errorsByProjectByFile, globalErrors};
}
