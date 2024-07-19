import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import globby from 'globby';
import { default as PathAPI, default as path } from 'path';
import toml from 'toml';
import logger from './logger';

export const getLineSeparator = () => '='.repeat(process.stdout.columns - 20 ?? 60);

export const compileContract = async (contractPath: string, buildParams: BuildParams) => {
  const command = 'cargo';
  const args = [
    'contract',
    ...(buildParams.toolchain ? [`+${buildParams.toolchain}`] : []),
    'build',
    ...(process.env.BUILD_PROD || buildParams.isRelease ? ['--release'] : []),
    ...(buildParams.lint ? [] : ['--lint']),
    ...(buildParams.verifiable ? ['--verifiable'] : []),
  ];
  logger.log(getLineSeparator());
  logger.log(chalk.bgGreen(`running ${command} ${args.join(' ')} in ${contractPath}...`));
  logger.log(getLineSeparator());

  return new Promise<number>((resolve, reject) => {
    const process = spawn(command, args, { cwd: contractPath, stdio: 'inherit' });
    process.stdout?.on('data', (data) => {
      logger.log(data);
    });
    process.stderr?.on('data', (data) => {
      logger.log(data);
    });
    process.on('exit', function (code) {
      if (code === null || code === 0) resolve(code ?? 0);
      reject(code);
    });
    process.on('error', function (err) {
      reject(err);
    });
  });
};

function copyArtifactsInternal(
  compileOutputPath: string,
  contractName: string,
  artifactsOutputPath: string,
  outputContractName: string = contractName,
) {
  logger.log(`Copying from ${compileOutputPath} to ${artifactsOutputPath}...`);
  fs.ensureDirSync(artifactsOutputPath);
  fs.copyFileSync(path.join(compileOutputPath, `${contractName}.contract`), path.join(artifactsOutputPath, `${outputContractName}.contract`));
  fs.copyFileSync(path.join(compileOutputPath, `${contractName}.wasm`), path.join(artifactsOutputPath, `${outputContractName}.wasm`));
  fs.copyFileSync(path.join(compileOutputPath, `${contractName}.json`), path.join(artifactsOutputPath, `${outputContractName}.json`));
}

export const copyArtifacts = (artifactsOutputPath: string, fullPath: string, contractName: string) => {
  const contractFolderName = path.dirname(fullPath).split(path.sep).pop();
  const contractFolderPath = path.parse(fullPath).dir;
  const contractNameSanitized = contractName.replace(/-/g, '_');
  const workspaceArtifactsCompileOutputPath = path.join('src', 'target', 'ink', contractNameSanitized);
  const localArtifactsCompileOutputPath = process.env.CARGO_TARGET_DIR
    ? path.join(process.env.CARGO_TARGET_DIR, 'ink')
    : path.join(contractFolderPath, 'target', 'ink');
  logger.log(`Copying artifacts of ${contractName} using name ${contractFolderName} as an output name...`);
  try {
    copyArtifactsInternal(localArtifactsCompileOutputPath, contractNameSanitized, artifactsOutputPath, contractFolderName);
  } catch (_) {
    logger.log('copying from local failed, trying from workspace');
    try {
      copyArtifactsInternal(workspaceArtifactsCompileOutputPath, contractNameSanitized, artifactsOutputPath, contractFolderName);
    } catch (e) {
      logger.error('Failed to copy artifacts');
      throw e;
    }
  }
};

type BuildParams = {
  toolchain?: string;
  isRelease: boolean;
  lint: boolean;
  verifiable: boolean;
};
export const compileContractByNameAndCopyArtifacts = async (
  artifactsOutputPath: string,
  fullPath: string,
  contractName: string,
  buildParams: BuildParams,
) => {
  const contractFolderPath = path.parse(fullPath).dir;
  logger.log(getLineSeparator());
  logger.log(chalk.bgGreen(`Compiling contract ${contractName} from ${contractFolderPath}...`));
  logger.log(getLineSeparator());
  try {
    await compileContract(contractFolderPath, buildParams);

    logger.log(getLineSeparator());
    logger.log(chalk.bgGreen(`Compiled contract ${contractName} from ${contractFolderPath}...`));
    logger.log(getLineSeparator());
  } catch (e) {
    logger.error(`Contract ${contractName} failed to compile`);
    throw e;
  }

  logger.log(getLineSeparator());
  logger.log(chalk.bgGreen(`Copying artifacts of ${contractName}...`));
  logger.log(getLineSeparator());

  copyArtifacts(artifactsOutputPath, fullPath, contractName);

  logger.log(getLineSeparator());
  logger.log(chalk.bgGreen(`Copied artifacts of ${contractName}...`));
  logger.log(getLineSeparator());
};

export function getContractNameFromToml(tomlPath: string): string {
  const tomlStr = fs.readFileSync(tomlPath, 'utf8');
  const tomlParsed = toml.parse(tomlStr);

  return tomlParsed.package.name;
}

export function __assureDirExists(absPathToBase: string, relPathToDir: string) {
  const absPath = PathAPI.resolve(absPathToBase, `./${relPathToDir}`);
  if (!fs.existsSync(absPath)) fs.mkdirSync(absPath);
}

export function __writeFileSync(absPathToBase: string, relFilePath: string, contents: string) {
  fs.writeFileSync(PathAPI.resolve(absPathToBase, `./${relFilePath}`), contents);
}

export const getAllContractNamesAndFolderNames = (contractsRootPathOrGlobPath: string, regexFilter?: string | undefined) => {
  const names: [string, string][] = [];
  const isGlobPathEndingWithToml = contractsRootPathOrGlobPath.endsWith('.toml');
  const paths = globby.sync(
    isGlobPathEndingWithToml
      ? contractsRootPathOrGlobPath
      : `${contractsRootPathOrGlobPath}${contractsRootPathOrGlobPath.endsWith('/') ? '' : '/'}**/Cargo.toml`,
  );
  const maybeRegexFilter = regexFilter ? new RegExp(regexFilter) : null;
  for (const p of paths) {
    const data = fs.readFileSync(p, 'utf8');
    if (data.includes(`[package]\nname =`)) {
      const result = data.match(/\[package\]\nname =( ){0,}"(.*)"/);
      if (!result) {
        logger.warn(`Found Cargo.toml in ${p} but failed to determine contract name`);
        continue;
      }
      //if has no ink dependency log and continue
      if (!data.match(/ink\s=/)) {
        logger.warn(`Found Cargo.toml in ${p} but failed to determine ink dependency`);
        continue;
      }

      const contractName = result[2];
      if (contractName && (!maybeRegexFilter || contractName.match(maybeRegexFilter))) {
        logger.log(`Found contract ${contractName}! in ${p}`);
        names.push([contractName, p]);
      }
    }
  }
  return names;
};
