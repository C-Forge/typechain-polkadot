import { Abi } from '@polkadot/api-contract';

export abstract class TypechainPlugin {
  generate?: (abi: Abi, fileName: string, absPathToABIs: string, absPathToOutput: string) => Promise<void> | void;
  beforeAll?: (absPathToABIs: string, absPathToOutput: string) => Promise<void> | void;
  afterAll?: (absPathToABIs: string, absPathToOutput: string) => Promise<void> | void;
}
