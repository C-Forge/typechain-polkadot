/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import { txSignAndSend } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp34';
import type BN from 'bn.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import type { SignerOptions } from '@polkadot/api/submittable/types';
import { decodeEvents, decodeEventsLegacy } from '../shared/utils';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_psp34.json';

export default class MyPsp34Methods {
  readonly __nativeContract: ContractPromise;
  readonly __keyringPair: KeyringPair;
  readonly __apiPromise: ApiPromise;

  constructor(apiPromise: ApiPromise, nativeContract: ContractPromise, keyringPair: KeyringPair) {
    this.__apiPromise = apiPromise;
    this.__nativeContract = nativeContract;
    this.__keyringPair = keyringPair;
  }

  /**
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   */
  balanceOf(owner: ArgumentTypes.AccountId, contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::balanceOf',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [owner],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * allowance
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { ArgumentTypes.AccountId } operator,
   * @param { ArgumentTypes.Id | null } id,
   */
  allowance(
    owner: ArgumentTypes.AccountId,
    operator: ArgumentTypes.AccountId,
    id: ArgumentTypes.Id | null,
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::allowance',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [owner, operator, id],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * transfer
   *
   * @param { ArgumentTypes.AccountId } to,
   * @param { ArgumentTypes.Id } id,
   * @param { Array<(number | string | BN)> } data,
   */
  transfer(
    to: ArgumentTypes.AccountId,
    id: ArgumentTypes.Id,
    data: Array<number | string | BN>,
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::transfer',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [to, id, data],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * collectionId
   *
   */
  collectionId(contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::collectionId',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * approve
   *
   * @param { ArgumentTypes.AccountId } operator,
   * @param { ArgumentTypes.Id | null } id,
   * @param { boolean } approved,
   */
  approve(
    operator: ArgumentTypes.AccountId,
    id: ArgumentTypes.Id | null,
    approved: boolean,
    contractOptions?: ContractOptions,
    signerOptions?: Partial<SignerOptions>,
  ) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::approve',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [operator, id, approved],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * ownerOf
   *
   * @param { ArgumentTypes.Id } id,
   */
  ownerOf(id: ArgumentTypes.Id, contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::ownerOf',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [id],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * totalSupply
   *
   */
  totalSupply(contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34::totalSupply',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * mint
   *
   * @param { ArgumentTypes.AccountId } account,
   * @param { ArgumentTypes.Id } id,
   */
  mint(account: ArgumentTypes.AccountId, id: ArgumentTypes.Id, contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'psp34Mintable::mint',
      (events: EventRecord[]) => {
        return decodeEventsLegacy(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [account, id],
      contractOptions,
      signerOptions,
    );
  }
}
