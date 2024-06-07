/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import { txSignAndSend } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/vester';
import type BN from 'bn.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import type { SignerOptions } from '@polkadot/api/submittable/types';
import { decodeEvents } from '../shared/utils';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/vester.json';

export default class VesterMethods {
  readonly __nativeContract: ContractPromise;
  readonly __keyringPair: KeyringPair;
  readonly __apiPromise: ApiPromise;

  constructor(apiPromise: ApiPromise, nativeContract: ContractPromise, keyringPair: KeyringPair) {
    this.__apiPromise = apiPromise;
    this.__nativeContract = nativeContract;
    this.__keyringPair = keyringPair;
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
    contractOptions?: ContractOptionsWithRequiredValue,
    signerOptions?: Partial<SignerOptions>,
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
      contractOptions,
      signerOptions,
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
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
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
      contractOptions,
      signerOptions,
    );
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
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
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
      contractOptions,
      signerOptions,
    );
  }

  /**
   * nextIdVestOf
   *
   * @param { ArgumentTypes.AccountId } of,
   * @param { ArgumentTypes.AccountId | null } asset,
   * @param { Array<(number | string | BN)> } data,
   */
  nextIdVestOf(
    of: ArgumentTypes.AccountId,
    asset: ArgumentTypes.AccountId | null,
    data: Array<number | string | BN>,
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'generalVest::nextIdVestOf',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [of, asset, data],
      contractOptions,
      signerOptions,
    );
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
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'generalVest::vestingScheduleOf',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [of, asset, id, data],
      contractOptions,
      signerOptions,
    );
  }
}
