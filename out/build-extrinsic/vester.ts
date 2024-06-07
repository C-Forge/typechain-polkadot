/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { ContractOptionsWithRequiredValue } from '@c-forge/typechain-types';
import { buildSubmittableExtrinsic } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/vester';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';

export default class Methods {
  readonly __nativeContract: ContractPromise;
  readonly __apiPromise: ApiPromise;

  constructor(nativeContract: ContractPromise, apiPromise: ApiPromise) {
    this.__nativeContract = nativeContract;
    this.__apiPromise = apiPromise;
  }
  /**
   * createVest
   *
   * @param { ArgumentTypes.AccountId } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (string | number | BN) } amount,
   * @param { ArgumentTypes.VestingSchedule } schedule,
   * @param { Array<(number | string | BN)> } data,
   */
  createVest(
    receiver: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    amount: string | number | BN,
    schedule: ArgumentTypes.VestingSchedule,
    data: Array<number | string | BN>,
    __options: ContractOptionsWithRequiredValue,
  ) {
    return buildSubmittableExtrinsic(
      this.__apiPromise,
      this.__nativeContract,
      'generalVest::createVest',
      [receiver, asset, amount, schedule, data],
      __options,
    );
  }

  /**
   * release
   *
   * @param { ArgumentTypes.AccountId | null } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { Array<(number | string | BN)> } data,
   */
  release(
    receiver: ArgumentTypes.AccountId | null,
    asset: ArgumentTypes.AccountId | null,
    data: Array<number | string | BN>,
    __options: ContractOptions,
  ) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'generalVest::release', [receiver, asset, data], __options);
  }

  /**
   * releaseByVestId
   *
   * @param { ArgumentTypes.AccountId | null } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (number | string | BN) } id,
   * @param { Array<(number | string | BN)> } data,
   */
  releaseByVestId(
    receiver: ArgumentTypes.AccountId | null,
    asset: ArgumentTypes.AccountId | null,
    id: number | string | BN,
    data: Array<number | string | BN>,
    __options: ContractOptions,
  ) {
    return buildSubmittableExtrinsic(
      this.__apiPromise,
      this.__nativeContract,
      'generalVest::releaseByVestId',
      [receiver, asset, id, data],
      __options,
    );
  }

  /**
   * nextIdVestOf
   *
   * @param { ArgumentTypes.AccountId } of,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { Array<(number | string | BN)> } data,
   */
  nextIdVestOf(of: ArgumentTypes.AccountId, asset: ArgumentTypes.AccountId | null, data: Array<number | string | BN>, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'generalVest::nextIdVestOf', [of, asset, data], __options);
  }

  /**
   * vestingScheduleOf
   *
   * @param { ArgumentTypes.AccountId } of,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (number | string | BN) } id,
   * @param { Array<(number | string | BN)> } data,
   */
  vestingScheduleOf(
    of: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    id: number | string | BN,
    data: Array<number | string | BN>,
    __options: ContractOptions,
  ) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'generalVest::vestingScheduleOf', [of, asset, id, data], __options);
  }
}
