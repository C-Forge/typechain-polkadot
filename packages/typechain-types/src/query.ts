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

import type { ContractPromise } from '@polkadot/api-contract';
import type { ContractCallOutcome, ContractOptions } from '@polkadot/api-contract/types';
import type { AnyJson } from '@polkadot/types-codec/types';
import type { RequestArgumentType, QueryCallError, QueryOkCallError, ContractOptionsWithRequiredValue } from './types';
import { Result } from './types';
import { Weight, WeightV2 } from '@polkadot/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { BN_ONE, BN_ZERO, BN_HUNDRED, bnToBn } from '@polkadot/util';
import BN from 'bn.js';
import { convertWeight } from '@polkadot/api-contract/base/util';

const MAX_CALL_GAS = new BN(5_000_000_000_000).isub(BN_ONE);

export type QueryReturnType<T> = {
  value: T;
  gasConsumed: Weight;
  gasRequired: Weight;
  debugMessage: string;
};

/**
 * @throws { QueryCallError }
 */
export async function queryJSON<T>(
  api: ApiPromise,
  nativeContract: ContractPromise,
  callerAddress: string,
  title: string,
  args?: readonly RequestArgumentType[],
  contractOptions?: ContractOptionsWithRequiredValue,
  handler: (json: AnyJson) => T = (json: AnyJson): T => {
    return json as unknown as T;
  },
): Promise<QueryReturnType<T>> {
  const { output, gasConsumed, gasRequired, debugMessage } = await queryOutput(api, nativeContract, callerAddress, title, args, contractOptions);

  let _value = output.toJSON();

  if (_value && typeof _value === 'object') {
    if ('err' in _value) {
      const error: QueryOkCallError = {
        issue: 'READ_ERR_IN_BODY',
        _err: _value.err,
        debugMessage,
      };
      throw error;
    }
    if ('ok' in _value) _value = _value.ok;
  }

  return {
    debugMessage,
    value: handler(output.toJSON()),
    gasConsumed,
    gasRequired,
  };
}

/**
 * For mutating methods, that return { ok, err } responses.
 *
 * @throws { QueryOkCallError }
 */
export async function queryOkJSON<T>(
  api: ApiPromise,
  nativeContract: ContractPromise,
  callerAddress: string,
  //
  title: string,
  args?: readonly RequestArgumentType[],
  contractOptions?: ContractOptionsWithRequiredValue,
  handler: (json: AnyJson) => T = (json: AnyJson): T => {
    return json as unknown as T;
  },
): Promise<QueryReturnType<T>> {
  const { output, gasConsumed, gasRequired, debugMessage } = await queryOutput(api, nativeContract, callerAddress, title, args, contractOptions);
  const _value = output.toJSON();

  if (_value === null || _value === undefined || typeof _value !== 'object') {
    const error: QueryOkCallError = {
      issue: 'BODY_ISNT_OKERR',
      value: _value,
      debugMessage,
    };
    throw error;
  }

  return {
    debugMessage,
    value: handler(_value),
    gasConsumed,
    gasRequired,
  };
}

/**
 * @throws { QueryCallError }
 */
export async function queryOutput(
  api: ApiPromise,
  nativeContract: ContractPromise,
  callerAddress: string,
  //
  title: string,
  args?: readonly RequestArgumentType[],
  contractOptions?: ContractOptionsWithRequiredValue,
) {
  const contractAddress = nativeContract.address.toString();
  if (nativeContract.query[title] === null || nativeContract.query[title] === undefined) {
    const error: QueryCallError = {
      issue: 'METHOD_DOESNT_EXIST',
      texts: [`Method name: '${title}'`],
    };
    throw error;
  }

  const _args = args || [];
  const _contractOptions = await genValidContractOptionsWithValue(api, contractOptions);

  let response: ContractCallOutcome;
  let error: QueryCallError | undefined;
  try {
    response = await nativeContract.query[title]!(callerAddress, _contractOptions, ..._args);
  } catch (caughtError) {
    error = {
      issue: 'FAIL_AT_CALL',
      caughtError,
    };
    console.error(`\nContract.queryString(${title}) error:`, `\n > error:`, error, '\n');
    throw error;
  }

  const { gasConsumed, result, output, gasRequired, debugMessage } = response;

  const resValueStr = output ? output.toString() : null;
  const resValueJSON = output ? output.toJSON() : null;

  if (result.isErr)
    error = {
      issue: 'FAIL_AFTER_CALL::IS_ERROR',
      _resultIsOk: result.isOk,
      _asError: result.isErr ? result.asErr : undefined,
      debugMessage: debugMessage.toHuman(),
    };

  if (result.isOk === false)
    error = {
      issue: 'FAIL_AFTER_CALL::RESULT_NOT_OK',
      _asError: result.isErr ? result.asErr : undefined,
      debugMessage: debugMessage.toHuman(),
    };

  if (error) throw error;

  return {
    debugMessage: debugMessage.toHuman(),
    output: output!,
    gasConsumed: gasConsumed,
    gasRequired: gasRequired,
  };
}

export async function genValidContractOptionsWithValue(
  api: ApiPromise,
  contractOptions?: ContractOptions,
): Promise<{ gasLimit: WeightV2; value: BN }> {
  if (contractOptions === null || contractOptions === undefined) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gasLimit: api.registry.createType('WeightV2', {
        refTime: convertWeight(
          api.consts.system.blockWeights
            ? (
                api.consts.system.blockWeights as unknown as {
                  maxBlock: WeightV2;
                }
              ).maxBlock
            : (api.consts.system.maximumBlockWeight as Weight),
        )
          .v1Weight.muln(64)
          .div(BN_HUNDRED),
        proofSize: MAX_CALL_GAS,
      }) as WeightV2,
      value: BN_ZERO,
    };
  }

  let { value, gasLimit } = contractOptions;

  if (!value) value = BN_ZERO;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (gasLimit === null || gasLimit === undefined)
    gasLimit = api.registry.createType('WeightV2', {
      refTime: convertWeight(
        api.consts.system.blockWeights
          ? (
              api.consts.system.blockWeights as unknown as {
                maxBlock: WeightV2;
              }
            ).maxBlock
          : (api.consts.system.maximumBlockWeight as Weight),
      )
        .v1Weight.muln(64)
        .div(BN_HUNDRED),
      proofSize: MAX_CALL_GAS,
    }) as WeightV2;

  // if (typeof gasLimit === 'number' || typeof gasLimit === 'string') gasLimit = bnToBn(gasLimit);
  // if (typeof gasLimit === 'bigint') gasLimit = bnToBn(gasLimit.toString(10));

  return { value: bnToBn(value), gasLimit: gasLimit as WeightV2 }; //TODO
}

export function handleReturnType(result: any, typeDescription: any): any {
  const tryReturnAsNumber = () => {
    return typeof result === 'number' ? bnToBn(result) : result;
  };
  if (typeof result === 'undefined' || typeof typeDescription === 'undefined') return result;
  if (result === null || result === undefined || typeDescription === null || typeDescription === undefined) return result;
  if (typeof result === 'object' && typeof typeDescription === 'object' && (typeDescription.isResult || typeDescription.name.startsWith('Result<'))) {
    return new Result(handleReturnType(result.ok, typeDescription.body.ok), handleReturnType(result.err, typeDescription.body.err));
  }
  if (typeDescription.name === 'BN') return bnToBn(result);
  if (typeof typeDescription === 'object' && typeDescription.name === 'Option')
    return result !== null ? handleReturnType(result, typeDescription.body[0]) : handleReturnType(result, typeDescription.body[1]);
  if (typeof result !== 'object' || typeof typeDescription !== 'object' || typeDescription.isPrimitive) return tryReturnAsNumber();
  if (typeDescription.name === 'Array') {
    Object.entries(result).forEach(([key, value]) => {
      result[key] = handleReturnType(value, typeDescription.body[0]);
    });
    return result;
  }
  Object.entries(result).forEach((obj) => {
    result[obj[0]] = handleReturnType(obj[1], typeDescription.body[obj[0]]);
  });
  return tryReturnAsNumber();
}

export function handleEventReturn(result: any, eventDescription: any): any {
  if (typeof result === 'undefined') return result;

  Object.entries(result).forEach((obj) => {
    result[obj[0]] = handleReturnType(obj[1], eventDescription.body[obj[0]]);
  });

  return result;
}
