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

import type { ApiPromise, SubmittableResult } from '@polkadot/api';
import type { ContractPromise } from '@polkadot/api-contract';
import type { SignerOptions, SubmittableExtrinsic } from '@polkadot/api/submittable/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Registry } from '@polkadot/types-codec/types';
import { genValidContractOptionsWithValue } from './query';
import type { MethodDoesntExistError, RequestArgumentType } from './types';
import type { EventRecord } from '@polkadot/types/interfaces';
import { BN_ZERO } from '@polkadot/util';
import { ContractOptions } from '@polkadot/api-contract/types';

export type SignAndSendSuccessResponse = {
  from: string;
  txHash?: string;
  blockHash?: string;
  result?: SubmittableResult;
  error?: {
    message?: any;
    data?: any;
  };
  events?: {
    [index: string]: any;
  };
};

export async function txSignAndSend(
  nativeAPI: ApiPromise,
  nativeContract: ContractPromise,
  signer: KeyringPair | string,
  title: string,
  eventHandler: (event: EventRecord[]) => {
    [index: string]: any;
  },
  args: readonly RequestArgumentType[] = [],
  contractOptions?: ContractOptions,
  signerOptions?: Partial<SignerOptions>,
) {
  const signerAddress = typeof signer === 'string' ? signer : signer.address;
  const _gasLimitAndValue = await genValidContractOptionsWithValue(nativeAPI, contractOptions);

  // estimate gas limit

  const estimatedGasLimit = (await nativeContract.query[title](signerAddress, _gasLimitAndValue, ...args)).gasRequired;

  const gasLimitAndValueToUse = {
    gasLimit: contractOptions?.gasLimit || estimatedGasLimit,
    value: contractOptions?.value || BN_ZERO,
  };

  const submittableExtrinsic = buildSubmittableExtrinsic(nativeAPI, nativeContract, title, args, gasLimitAndValueToUse);
  return _signAndSend(nativeAPI.registry, submittableExtrinsic, signer, signerOptions, eventHandler);
}

export function buildSubmittableExtrinsic(
  api: ApiPromise,
  nativeContract: ContractPromise,
  title: string,
  args?: readonly RequestArgumentType[],
  options: ContractOptions = {},
) {
  if (nativeContract.tx[title] === null || nativeContract.tx[title] === undefined) {
    const error: MethodDoesntExistError = {
      issue: 'METHOD_DOESNT_EXIST',
      texts: [`Method name: '${title}'`],
    };
    throw error;
  }

  const _args = args || [];

  const submittableExtrinsic = nativeContract.tx[title]!(options, ..._args);

  return submittableExtrinsic;
}

/**
 * (i) For reference, see:
 * 	- https://polkadot.js.org/docs/api/cookbook/tx#how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event
 * 	- `@redspot/patract/buildTx`
 */
export async function _signAndSend(
  registry: Registry,
  extrinsic: SubmittableExtrinsic<'promise'>,
  signer: KeyringPair | string,
  signerOptions: Partial<SignerOptions> = {},
  eventHandler: (event: EventRecord[]) => {
    [index: string]: any;
  },
): Promise<SignAndSendSuccessResponse> {
  const signerAddress = typeof signer === 'string' ? signer : signer.address;

  return new Promise((resolve, reject) => {
    const actionStatus = {
      from: signerAddress.toString(),
      txHash: extrinsic.hash.toHex(),
    } as SignAndSendSuccessResponse;

    extrinsic
      .signAndSend(signer, signerOptions, (result: SubmittableResult) => {
        if (result.status.isInBlock) {
          actionStatus.blockHash = result.status.asInBlock.toHex();
        }

        if (result.status.isFinalized || result.status.isInBlock) {
          actionStatus.events = eventHandler(result.events);

          result.events
            .filter(({ event: { section } }: any): boolean => section === 'system')
            .forEach((event: any): void => {
              const {
                event: { data, method },
              } = event;

              if (method === 'ExtrinsicFailed') {
                const [dispatchError] = data;
                let message = dispatchError.type;

                if (dispatchError.isModule) {
                  try {
                    const mod = dispatchError.asModule;
                    const error = registry.findMetaError(new Uint8Array([mod.index.toNumber(), parseInt(mod.error.toString())]));
                    message = `${error.section}.${error.name}${Array.isArray(error.docs) ? `(${error.docs.join('')})` : error.docs || ''}`;
                  } catch (error) {
                    // swallow
                  }
                }

                actionStatus.error = {
                  message,
                };

                reject(actionStatus);
              } else if (method === 'ExtrinsicSuccess') {
                actionStatus.result = result;
                resolve(actionStatus as SignAndSendSuccessResponse);
              }
            });
        } else if (result.isError) {
          actionStatus.error = {
            data: result,
          };
          actionStatus.events = undefined;

          reject(actionStatus);
        }
      })
      .catch((error: any) => {
        actionStatus.error = {
          message: error.message,
        };

        reject(actionStatus);
      });
  });
}
