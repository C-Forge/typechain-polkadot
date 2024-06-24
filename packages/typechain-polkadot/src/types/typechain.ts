import { TypechainPlugin } from './interfaces';
import { generateProjectStructureAndCopyRawFiles } from '../utils/directories';
import FsAPI from 'fs';
import PathAPI from 'path';
import { preprocessABI } from '../utils/abi';
import TypesArgumentsPlugin from '../generators/types-arguments';
import TypesReturnsPlugin from '../generators/types-returns';
import QueryPlugin from '../generators/query';
import BuildExtrinsicPlugin from '../generators/build-extrinsic';
import TxSignAndSendPlugin from '../generators/tx-sign-and-send';
import MixedMethodsPlugin from '../generators/mixed-methods';
import DataPlugin from '../generators/data';
import ContractPlugin from '../generators/contract';
import DeployerPlugin from '../generators/deployer';
import EventTypesPlugin from '../generators/events-types';
import EventsPlugin from '../generators/events';
import EventDataPlugin from '../generators/event-data';
import ContractInfoPlugin from '../generators/artifacts';
import EventsEnumPlugin from '../generators/events-enum';

export default class TypechainPolkadot {
  plugins: TypechainPlugin[] = [];

  constructor(...plugins: TypechainPlugin[]) {
    this.plugins = plugins;
  }

  loadDefaultPlugins() {
    this.plugins.push(...defaultPlugins);
  }

  async run(absPathToABIs: string, absPathToOutput: string) {
    generateProjectStructureAndCopyRawFiles(absPathToOutput);

    for (const plugin of this.plugins) {
      if (plugin.beforeAll) {
        await plugin.beforeAll(absPathToABIs, absPathToOutput);
      }
    }

    const fullFileNames = FsAPI.readdirSync(absPathToABIs);

    for (const fullFileName of fullFileNames) {
      if (!fullFileName.endsWith('.json') || fullFileName.endsWith('.rustc_info.json')) continue;

      const fileName = fullFileName.slice(0, -5);
      const _abiStr = FsAPI.readFileSync(PathAPI.resolve(absPathToABIs, fullFileName), 'utf8');
      const abi = preprocessABI(_abiStr);

      for (const plugin of this.plugins) {
        await plugin.generate?.(abi, fileName, absPathToABIs, absPathToOutput);
      }
    }
    for (const plugin of this.plugins) {
      if (plugin.afterAll) {
        await plugin.afterAll(absPathToABIs, absPathToOutput);
      }
    }
  }

  async loadPluginsFromFiles(fileNames: string[]) {
    const plugins: TypechainPlugin[] = [];
    for (const fileName of fileNames) {
      const plugin = await import(fileName);
      plugins.push(new plugin.default());
    }

    console.log('Succesfully loaded plugins: ', plugins.map((p) => p.constructor.name).join(', '));

    this.plugins.push(...plugins);

    return plugins;
  }

  async loadPluginsRaw(...plugins: TypechainPlugin[]) {
    this.plugins.push(...plugins);
  }
}

export const defaultPlugins: TypechainPlugin[] = [
  new ContractInfoPlugin(),
  new TypesArgumentsPlugin(),
  new TypesReturnsPlugin(),
  new QueryPlugin(),
  new BuildExtrinsicPlugin(),
  new TxSignAndSendPlugin(),
  new MixedMethodsPlugin(),
  new DataPlugin(),
  new ContractPlugin(),
  new DeployerPlugin(),
  new EventTypesPlugin(),
  new EventsPlugin(),
  new EventDataPlugin(),
  new EventsEnumPlugin(),
];
