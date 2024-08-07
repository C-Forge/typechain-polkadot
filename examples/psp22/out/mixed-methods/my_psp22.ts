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
import type * as ArgumentTypes from '../types-arguments/my_psp22';
import type * as ReturnTypes from '../types-returns/my_psp22';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import { decodeEvents, decodeEventsLegacy } from '../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/my_psp22.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_psp22.json';
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
   * transfer
   *
   * @param { ArgumentTypes.AccountId } to,
   * @param { (string | number | BN) } value,
   * @param { Array<(number | string | BN)> } data,
   * @returns { void }
   */
  transfer(to: ArgumentTypes.AccountId, value: string | number | BN, data: Array<number | string | BN>, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp22::transfer',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [to, value, data],
      __options,
    );
  }

  /**
   * decreaseAllowance
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } deltaValue,
   * @returns { void }
   */
  decreaseAllowance(spender: ArgumentTypes.AccountId, deltaValue: string | number | BN, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp22::decreaseAllowance',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [spender, deltaValue],
      __options,
    );
  }

  /**
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @returns { BN }
   */
  balanceOf(owner: ArgumentTypes.AccountId, __options: ContractOptions): Promise<QueryReturnType<BN>> {
    return queryJSON<BN>(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::balanceOf', [owner], __options, (result) => {
      return bnToBn(result);
    });
  }

  /**
   * allowance
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { ArgumentTypes.AccountId } spender,
   * @returns { BN }
   */
  allowance(owner: ArgumentTypes.AccountId, spender: ArgumentTypes.AccountId, __options: ContractOptions): Promise<QueryReturnType<BN>> {
    return queryJSON<BN>(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::allowance',
      [owner, spender],
      __options,
      (result) => {
        return bnToBn(result);
      },
    );
  }

  /**
   * increaseAllowance
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } deltaValue,
   * @returns { void }
   */
  increaseAllowance(spender: ArgumentTypes.AccountId, deltaValue: string | number | BN, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp22::increaseAllowance',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [spender, deltaValue],
      __options,
    );
  }

  /**
   * totalSupply
   *
   * @returns { BN }
   */
  totalSupply(__options: ContractOptions): Promise<QueryReturnType<BN>> {
    return queryJSON<BN>(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::totalSupply', [], __options, (result) => {
      return bnToBn(result);
    });
  }

  /**
   * transferFrom
   *
   * @param { ArgumentTypes.AccountId } from,
   * @param { ArgumentTypes.AccountId } to,
   * @param { (string | number | BN) } value,
   * @param { Array<(number | string | BN)> } data,
   * @returns { void }
   */
  transferFrom(
    from: ArgumentTypes.AccountId,
    to: ArgumentTypes.AccountId,
    value: string | number | BN,
    data: Array<number | string | BN>,
    __options: ContractOptions,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp22::transferFrom',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [from, to, value, data],
      __options,
    );
  }

  /**
   * approve
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } value,
   * @returns { void }
   */
  approve(spender: ArgumentTypes.AccountId, value: string | number | BN, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp22::approve',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [spender, value],
      __options,
    );
  }

  /**
   * mint
   *
   * @param { ArgumentTypes.AccountId } account,
   * @param { (string | number | BN) } amount,
   * @returns { void }
   */
  mint(account: ArgumentTypes.AccountId, amount: string | number | BN, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp22Mintable::mint',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [account, amount],
      __options,
    );
  }
}
