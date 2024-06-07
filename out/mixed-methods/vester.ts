/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { QueryReturnType } from '@c-forge/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@c-forge/typechain-types';
import { txSignAndSend } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/vester';
import type * as ReturnTypes from '../types-returns/vester';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import { decodeEvents } from '../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/vester.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/vester.json';
import { bnToBn } from '@polkadot/util';

export default class Methods {
  readonly __nativeContract: ContractPromise;
  readonly __keyringPair: KeyringPair;
  readonly __callerAddress: string;
  readonly __apiPromise: ApiPromise;

  constructor(apiPromise: ApiPromise, nativeContract: ContractPromise, keyringPair: KeyringPair) {
    this.__apiPromise = apiPromise;
    this.__nativeContract = nativeContract;
    this.__keyringPair = keyringPair;
    this.__callerAddress = keyringPair.address;
  }

  /**
   * createVest
   *
   * @param { ArgumentTypes.AccountId } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (string | number | BN) } amount,
   * @param { ArgumentTypes.VestingSchedule } schedule,
   * @param { Array<(number | string | BN)> } data,
   * @returns { void }
   */
  createVest(
    receiver: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    amount: string | number | BN,
    schedule: ArgumentTypes.VestingSchedule,
    data: Array<number | string | BN>,
    __options: ContractOptionsWithRequiredValue,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'generalVest::createVest',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
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
   * @returns { void }
   */
  release(
    receiver: ArgumentTypes.AccountId | null,
    asset: ArgumentTypes.AccountId | null,
    data: Array<number | string | BN>,
    __options: ContractOptions,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'generalVest::release',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [receiver, asset, data],
      __options,
    );
  }

  /**
   * releaseByVestId
   *
   * @param { ArgumentTypes.AccountId | null } receiver,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { (number | string | BN) } id,
   * @param { Array<(number | string | BN)> } data,
   * @returns { void }
   */
  releaseByVestId(
    receiver: ArgumentTypes.AccountId | null,
    asset: ArgumentTypes.AccountId | null,
    id: number | string | BN,
    data: Array<number | string | BN>,
    __options: ContractOptions,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'generalVest::releaseByVestId',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
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
   * @returns { Result<BN, ReturnTypes.LangError> }
   */
  nextIdVestOf(
    of: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    data: Array<number | string | BN>,
    __options: ContractOptions,
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
    __options: ContractOptions,
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
