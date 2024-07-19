import * as PathAPI from 'path';
import * as FsAPI from 'fs';
import logger from './logger';
import chalk from 'chalk';
export interface Config {
  projectFiles: string[];
  lint: boolean;
  artifactsPath: string;
  typechainGeneratedPath: string;
  contractsRootPath?: string;
  verifiable: boolean;
}

const getDefaultConfig = (): Config => ({
  projectFiles: ['./**/Cargo.toml'],
  lint: true,
  artifactsPath: './artifacts',
  typechainGeneratedPath: './typechain-generated',
  verifiable: false,
});

export function readConfigOrDefault(relativeCfgPath: string): Config {
  try {
    const cwdPath = process.cwd();
    const absPathToConfig = PathAPI.resolve(cwdPath, `./${relativeCfgPath}`);
    const configStr = FsAPI.readFileSync(absPathToConfig, 'utf8');
    const config = JSON.parse(configStr);

    if (config.projectFiles === undefined) {
      config.projectFiles = getDefaultConfig().projectFiles;
    }

    if (config.lint === undefined) {
      config.lint = getDefaultConfig().artifactsPath;
    }

    if (config.artifactsPath === undefined) {
      config.artifactsPath = getDefaultConfig().artifactsPath;
    }

    if (config.typechainGeneratedPath === undefined) {
      config.typechainGeneratedPath = getDefaultConfig().typechainGeneratedPath;
    }
    if (config.verifiable === undefined) {
      config.verifiable = getDefaultConfig().verifiable;
    }

    return config;
  } catch {
    logger.log(chalk.magenta(`Config not provided or failed to parse - using defaults`));
    return getDefaultConfig();
  }
}
