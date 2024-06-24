import YARGS from 'yargs';
import * as PathAPI from 'path';
import * as FsAPI from 'fs-extra';
import { readConfigOrDefault } from './src/types';
import globby from 'globby';
import { execSync } from 'child_process';
import {
  __assureDirExists,
  __writeFileSync,
  compileContractByNameAndCopyArtifacts,
  getAllContractNamesAndFolderNames,
  getContractNameFromToml,
} from './src/utils';
import chalk from 'chalk';
import logger from './src/logger';
import dotenv from 'dotenv';

function runTypechain(input: string, output: string) {
  execSync(`npx @c-forge/typechain-polkadot --in ${input} --out ${output}`);
}

async function main() {
  const _argv = YARGS(process.argv)
    .option('config', {
      alias: ['c'],
      demandOption: 'Please, specify, where to take config file',
      description: 'Config file path',
      type: 'string',
      default: './config.json',
    })
    .option('release', {
      alias: ['r'],
      demandOption: 'Please, specify, if you want to compile with release',
      description: 'Compile with release',
      type: 'boolean',
      default: false,
    })
    .option('noCompile', {
      alias: ['nc'],
      demandOption: 'Please, specify, if you want to compile',
      description: 'Compile',
      type: 'boolean',
      default: false,
    })
    .option('noTypechain', {
      alias: ['nt'],
      demandOption: 'Please, specify, if you want to compile typechain code',
      description: 'Compile typechain code',
      type: 'boolean',
      default: false,
    })
    .option('toolchain', {
      alias: ['toolchain'],
      demandOption: 'Force toolchain you want to use (nightly, stable)',
      description: 'Compile typechain code',
      type: 'string',
    })
    .array('files')
    .describe('files', 'Files to compile')
    .boolean('skipLinting')
    .describe('skipLinting', 'Skip linting')
    .string('artifactsPath')
    .describe('artifactsPath', 'Artifacts path')
    .string('typechainGeneratedPath')
    .describe('typechainGeneratedPath', 'Typechain generated path')
    .string('contractsRoot')
    .describe('contractsRoot', 'Contracts root path')
    .string('regex')
    .describe('regex', 'Regex to filter contract names')
    .help()
    .alias('h', 'help').argv;

  const argv = _argv as Awaited<typeof _argv>;

  const cwdPath = process.cwd();
  const isRelease = argv.release;
  const shouldCompile = !argv.noCompile;
  const shouldRunTypechain = !argv.noTypechain;
  const toolchain = argv.toolchain;
  const regex = argv.regex;

  const config = readConfigOrDefault(argv.config);

  if (argv.files !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.projectFiles = argv.files;
  }
  if (argv.skipLinting !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.skipLinting = argv.skipLinting;
  }
  if (argv.artifactsPath !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.artifactsPath = argv.artifactsPath;
  }
  if (argv.typechainGeneratedPath !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.typechainGeneratedPath = argv.typechainGeneratedPath;
  }
  if (argv.contractsRootPath !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.contractsRootPath = argv.contractsRoot;
  }

  if (!shouldCompile) {
    for (const fileGlob of config.projectFiles) {
      const searchResult = getAllContractNamesAndFolderNames(fileGlob, regex);

      if (searchResult.length > 0) {
        logger.log(chalk.magenta('======== Found contracts ========'));
      } else {
        logger.log(chalk.magenta('======== No contracts found ========'));
        return;
      }
      const outputPath = PathAPI.resolve(cwdPath, config.artifactsPath);
      FsAPI.ensureDirSync(outputPath);
      for (const [name, fullPath] of searchResult) {
        await compileContractByNameAndCopyArtifacts(outputPath, fullPath, name, {
          toolchain,
          isRelease,
          skipLinting: config.skipLinting,
        });
      }
    }

    logger.log(chalk.greenBright(`======== Compiled all contracts ========`));
  }

  // path to artifacts
  if (!shouldRunTypechain) {
    logger.log(chalk.magenta(`======== Compiling Typechain' code ========`));

    runTypechain(config.artifactsPath, config.typechainGeneratedPath);

    logger.log(chalk.greenBright(`======== Compiled Typechain' code ========`));
  }
}

main();
