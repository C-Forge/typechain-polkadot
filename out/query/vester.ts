/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { QueryReturnType } from '@c-forge/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/vester';
import type * as ReturnTypes from '../types-returns/vester';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/vester.json';
import { bnToBn } from '@polkadot/util';

export default class VesterMethods {
  readonly __nativeContract: ContractPromise;
  readonly __apiPromise: ApiPromise;
  readonly __callerAddress: string;

  constructor(nativeContract: ContractPromise, nativeApi: ApiPromise, callerAddress: string) {
    this.__nativeContract = nativeContract;
    this.__callerAddress = callerAddress;
    this.__apiPromise = nativeApi;
  }

  /**
   * createVest
   *
   * @param { ArgumentTypes.AccountId } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (string | number | BN) } amount,
   * @param { ArgumentTypes.VestingSchedule } schedule,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.VestingError>, ReturnTypes.LangError> }
   */
  createVest(
    receiver: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    amount: string | number | BN,
    schedule: ArgumentTypes.VestingSchedule,
    data: Array<number | string | BN>,
    __options?: ContractOptionsWithRequiredValue,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.VestingError>, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'generalVest::createVest',
      [receiver, asset, amount, schedule, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * release
   *
   * @param { ArgumentTypes.AccountId | null } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.VestingError>, ReturnTypes.LangError> }
   */
  release(
    receiver: ArgumentTypes.AccountId | null,
    asset: ArgumentTypes.AccountId | null,
    data: Array<number | string | BN>,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.VestingError>, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'generalVest::release',
      [receiver, asset, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * releaseByVestId
   *
   * @param { ArgumentTypes.AccountId | null } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (number | string | BN) } id,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.VestingError>, ReturnTypes.LangError> }
   */
  releaseByVestId(
    receiver: ArgumentTypes.AccountId | null,
    asset: ArgumentTypes.AccountId | null,
    id: number | string | BN,
    data: Array<number | string | BN>,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.VestingError>, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'generalVest::releaseByVestId',
      [receiver, asset, id, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * nextIdVestOf
   *
   * @param { ArgumentTypes.AccountId } of,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<BN, ReturnTypes.LangError> }
   */
  nextIdVestOf(
    of: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    data: Array<number | string | BN>,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<BN, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'generalVest::nextIdVestOf',
      [of, asset, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * vestingScheduleOf
   *
   * @param { ArgumentTypes.AccountId } of,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (number | string | BN) } id,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<ReturnTypes.VestingData | null, ReturnTypes.LangError> }
   */
  vestingScheduleOf(
    of: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    id: number | string | BN,
    data: Array<number | string | BN>,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<ReturnTypes.VestingData | null, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'generalVest::vestingScheduleOf',
      [of, asset, id, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }
}
