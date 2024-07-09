import fs from 'fs-extra';
import path from 'path';
import { TypechainPlugin } from '../types/interfaces';
import globby from 'globby';

const snakeToCamel = (str: string) => str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const getAllEvents = (absPathToOutput: string) => {
  const paths = globby.sync(path.join(absPathToOutput, 'event-types', '*.ts'));
  const foundEvents: { contractName: string; events: string[] }[] = [];
  for (const p of paths) {
    const data = fs.readFileSync(p, 'utf8');
    const matched = Array.from(data.matchAll(/export interface (.*) {/g))
      .map((match) => match[1])
      .filter((m) => !!m) as string[];
    if (matched.length > 0) foundEvents.push({ contractName: capitalizeFirstLetter(snakeToCamel(path.parse(p).name)), events: matched });
  }
  return foundEvents;
};

async function generate(absPathToOutput: string) {
  const resultFileOutputPath = path.join(absPathToOutput, 'events', 'enum.ts');
  const foundEvents = getAllEvents(absPathToOutput);

  const enumString =
    foundEvents.length === 0
      ? `export type AnyContractEvent = never;
export const ContractsEvents = {};
`
      : `
${foundEvents
  .map(
    ({ contractName, events }) => `
export enum ${contractName}Event {
${events
  .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates
  .map(
    (e, index) => `  ${e} = '${e}'${index === events.length - 1 ? '' : ','}
`,
  )
  .join('')}
}`,
  )
  .join('\n')}
export type AnyContractEvent = ${foundEvents
          .map(({ contractName }, index) => `${contractName}Event${index === foundEvents.length - 1 ? ';' : ' | '}`)
          .join('')}
export const ContractsEvents = {
${foundEvents.map(({ contractName }, index) => `  ${contractName}Event${index === foundEvents.length - 1 ? '' : `,\n`}`).join('')}
}`;
  fs.writeFileSync(resultFileOutputPath, enumString, 'utf8');
}

export default class EventsEnumPlugin implements TypechainPlugin {
  afterAll = (absPathToABIs: string, absPathToOutput: string) => {
    return generate(absPathToOutput);
  };
}
