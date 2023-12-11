/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from 'wookashwackomytest-typechain-types';
import type { QueryReturnType } from 'wookashwackomytest-typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from 'wookashwackomytest-typechain-types';
import { txSignAndSend } from 'wookashwackomytest-typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp34';
import type * as ReturnTypes from '../types-returns/my_psp34';
import type BN from 'bn.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReturnNumber } from 'wookashwackomytest-typechain-types';
import { getTypeDescription } from './../shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import { decodeEvents } from '../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/my_psp34.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_psp34.json';

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
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @returns { ReturnNumber }
   */
  balanceOf(owner: ArgumentTypes.AccountId, __options: GasLimit): Promise<QueryReturnType<ReturnNumber>> {
    return queryJSON<ReturnNumber>(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp34::balanceOf',
      [owner],
      __options,
      (result) => {
        return new ReturnNumber(result as number | string);
      },
    );
  }

  /**
   * allowance
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { ArgumentTypes.AccountId } operator,
   * @param { ArgumentTypes.Id | null } id,
   * @returns { boolean }
   */
  allowance(
    owner: ArgumentTypes.AccountId,
    operator: ArgumentTypes.AccountId,
    id: ArgumentTypes.Id | null,
    __options: GasLimit,
  ): Promise<QueryReturnType<boolean>> {
    return queryJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::allowance', [owner, operator, id], __options);
  }

  /**
   * transfer
   *
   * @param { ArgumentTypes.AccountId } to,
   * @param { ArgumentTypes.Id } id,
   * @param { Array<(number | string | BN)> } data,
   * @returns { void }
   */
  transfer(to: ArgumentTypes.AccountId, id: ArgumentTypes.Id, data: Array<number | string | BN>, __options: GasLimit) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::transfer',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [to, id, data],
      __options,
    );
  }

  /**
   * collectionId
   *
   * @returns { ReturnTypes.Id }
   */
  collectionId(__options: GasLimit): Promise<QueryReturnType<ReturnTypes.Id>> {
    return queryJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::collectionId', [], __options, (result) => {
      return handleReturnType(result, getTypeDescription(1, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * approve
   *
   * @param { ArgumentTypes.AccountId } operator,
   * @param { ArgumentTypes.Id | null } id,
   * @param { boolean } approved,
   * @returns { void }
   */
  approve(operator: ArgumentTypes.AccountId, id: ArgumentTypes.Id | null, approved: boolean, __options: GasLimit) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::approve',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [operator, id, approved],
      __options,
    );
  }

  /**
   * ownerOf
   *
   * @param { ArgumentTypes.Id } id,
   * @returns { ReturnTypes.AccountId | null }
   */
  ownerOf(id: ArgumentTypes.Id, __options: GasLimit): Promise<QueryReturnType<ReturnTypes.AccountId | null>> {
    return queryJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::ownerOf', [id], __options, (result) => {
      return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * totalSupply
   *
   * @returns { ReturnNumber }
   */
  totalSupply(__options: GasLimit): Promise<QueryReturnType<ReturnNumber>> {
    return queryJSON<ReturnNumber>(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::totalSupply', [], __options, (result) => {
      return new ReturnNumber(result as number | string);
    });
  }

  /**
   * mint
   *
   * @param { ArgumentTypes.AccountId } account,
   * @param { ArgumentTypes.Id } id,
   * @returns { void }
   */
  mint(account: ArgumentTypes.AccountId, id: ArgumentTypes.Id, __options: GasLimit) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34Mintable::mint',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [account, id],
      __options,
    );
  }
}
