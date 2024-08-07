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
import type * as ArgumentTypes from '../types-arguments/my_psp34_enumerable';
import type * as ReturnTypes from '../types-returns/my_psp34_enumerable';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import { decodeEvents, decodeEventsLegacy } from '../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/my_psp34_enumerable.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_psp34_enumerable.json';
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
   * collectionId
   *
   * @returns { ReturnTypes.Id }
   */
  collectionId(__options: ContractOptions): Promise<QueryReturnType<ReturnTypes.Id>> {
    return queryJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::collectionId', [], __options, (result) => {
      return handleReturnType(result, getTypeDescription(1, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * totalSupply
   *
   * @returns { BN }
   */
  totalSupply(__options: ContractOptions): Promise<QueryReturnType<BN>> {
    return queryJSON<BN>(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::totalSupply', [], __options, (result) => {
      return bnToBn(result);
    });
  }

  /**
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @returns { BN }
   */
  balanceOf(owner: ArgumentTypes.AccountId, __options: ContractOptions): Promise<QueryReturnType<BN>> {
    return queryJSON<BN>(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::balanceOf', [owner], __options, (result) => {
      return bnToBn(result);
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
  approve(operator: ArgumentTypes.AccountId, id: ArgumentTypes.Id | null, approved: boolean, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::approve',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [operator, id, approved],
      __options,
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
    __options: ContractOptions,
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
  transfer(to: ArgumentTypes.AccountId, id: ArgumentTypes.Id, data: Array<number | string | BN>, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::transfer',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [to, id, data],
      __options,
    );
  }

  /**
   * ownerOf
   *
   * @param { ArgumentTypes.Id } id,
   * @returns { ReturnTypes.AccountId | null }
   */
  ownerOf(id: ArgumentTypes.Id, __options: ContractOptions): Promise<QueryReturnType<ReturnTypes.AccountId | null>> {
    return queryJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp34::ownerOf', [id], __options, (result) => {
      return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * mint
   *
   * @param { ArgumentTypes.AccountId } account,
   * @param { ArgumentTypes.Id } id,
   * @returns { void }
   */
  mint(account: ArgumentTypes.AccountId, id: ArgumentTypes.Id, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34Mintable::mint',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [account, id],
      __options,
    );
  }

  /**
   * burn
   *
   * @param { ArgumentTypes.AccountId } account,
   * @param { ArgumentTypes.Id } id,
   * @returns { void }
   */
  burn(account: ArgumentTypes.AccountId, id: ArgumentTypes.Id, __options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34Burnable::burn',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [account, id],
      __options,
    );
  }

  /**
   * tokenByIndex
   *
   * @param { (string | number | BN) } index,
   * @returns { Result<ReturnTypes.Id, ReturnTypes.PSP34Error> }
   */
  tokenByIndex(index: string | number | BN, __options: ContractOptions): Promise<QueryReturnType<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp34Enumerable::tokenByIndex',
      [index],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * ownersTokenByIndex
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { (string | number | BN) } index,
   * @returns { Result<ReturnTypes.Id, ReturnTypes.PSP34Error> }
   */
  ownersTokenByIndex(
    owner: ArgumentTypes.AccountId,
    index: string | number | BN,
    __options: ContractOptions,
  ): Promise<QueryReturnType<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp34Enumerable::ownersTokenByIndex',
      [owner, index],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }
}
