const ansiRegex = new RegExp(
  [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|'),
  'gu'
);
const stripAnsi = (s: string): string => s.replace(ansiRegex, '');

type AlignType = 'l' | 'r';
type Cell = string | number;

interface TextTableOptions {
  align?: AlignType[];
}

function formatCell(cell: Cell): string {
  return typeof cell === 'string' ? cell : cell.toLocaleString();
}

function padString(value: string, indent: number, right: boolean): string {
  let valueStr = value;
  for (let i = 0; i < indent; i++) {
    valueStr = right ? `${valueStr} ` : ` ${valueStr}`;
  }
  return valueStr;
}

export function table(data: Cell[][], options?: TextTableOptions): string {
  if (data.length === 0) {
    return '';
  }
  const {align = []} = options ?? {};
  const maxWidths: number[] = [];
  for (const line of data) {
    for (const [columnIndex, cell] of line.entries()) {
      maxWidths[columnIndex] = Math.max(
        maxWidths[columnIndex] ?? 0,
        stripAnsi(formatCell(cell)).length
      );
    }
  }

  return data
    .map(line =>
      line
        .map((cell, colIndex) => {
          const content = formatCell(cell);
          return padString(
            content,
            (maxWidths[colIndex] ?? 0) - stripAnsi(content).length,
            align[colIndex] !== 'l'
          );
        })
        .join(' ')
    )
    .join('\n');
}
