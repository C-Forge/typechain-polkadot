// Copyright (c) 2012-2022 Supercolony
// Copyright (c) 2024 C Forge
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the"Software"),
// to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { Abi } from '@polkadot/api-contract';
import { TypechainPlugin } from '../types/interfaces';
import { copyFileSync } from 'fs';
import PathAPI from 'path';

/**
 * Generates file content for contarct-info/<fileName>.ts using Handlebars
 *
 * @param fileName - The name of the file to write to
 * @param abiJson - The abi of the contract in JSON format
 * @param contractJson - The .contract file in JSON format
 */

export default class ContractInfoPlugin implements TypechainPlugin {
  generate(abi: Abi, fileName: string, absPathToABIs: string, absPathToOutput: string): void {
    copyFileSync(`${absPathToABIs}/${fileName}.json`, PathAPI.resolve(absPathToOutput, `artifacts/${fileName}.json`));
    try {
      copyFileSync(`${absPathToABIs}/${fileName}.wasm`, PathAPI.resolve(absPathToOutput, `artifacts/${fileName}.wasm`));
    } catch (_) {
      console.warn(`Could not read wasm file for ${fileName}`);
    }
    try {
      copyFileSync(`${absPathToABIs}/${fileName}.contract`, PathAPI.resolve(absPathToOutput, `artifacts/${fileName}.contract`));
    } catch (e) {
      console.warn(`Could not read contract file for ${fileName}`);
    }
  }

  name: string = 'ContractInfoPlugin';
  outputDir: string = 'artifacts';
}
