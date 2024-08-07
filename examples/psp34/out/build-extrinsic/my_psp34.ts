/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { ContractOptionsWithRequiredValue } from '@c-forge/typechain-types';
import { buildSubmittableExtrinsic } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp34';
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
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   */
  balanceOf(owner: ArgumentTypes.AccountId, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::balanceOf', [owner], __options);
  }

  /**
   * allowance
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { ArgumentTypes.AccountId } operator,
   * @param { ArgumentTypes.Id | null } id,
   */
  allowance(owner: ArgumentTypes.AccountId, operator: ArgumentTypes.AccountId, id: ArgumentTypes.Id | null, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::allowance', [owner, operator, id], __options);
  }

  /**
   * transfer
   *
   * @param { ArgumentTypes.AccountId } to,
   * @param { ArgumentTypes.Id } id,
   * @param { Array<(number | string | BN)> } data,
   */
  transfer(to: ArgumentTypes.AccountId, id: ArgumentTypes.Id, data: Array<number | string | BN>, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::transfer', [to, id, data], __options);
  }

  /**
   * collectionId
   *
   */
  collectionId(__options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::collectionId', [], __options);
  }

  /**
   * approve
   *
   * @param { ArgumentTypes.AccountId } operator,
   * @param { ArgumentTypes.Id | null } id,
   * @param { boolean } approved,
   */
  approve(operator: ArgumentTypes.AccountId, id: ArgumentTypes.Id | null, approved: boolean, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::approve', [operator, id, approved], __options);
  }

  /**
   * ownerOf
   *
   * @param { ArgumentTypes.Id } id,
   */
  ownerOf(id: ArgumentTypes.Id, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::ownerOf', [id], __options);
  }

  /**
   * totalSupply
   *
   */
  totalSupply(__options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34::totalSupply', [], __options);
  }

  /**
   * mint
   *
   * @param { ArgumentTypes.AccountId } account,
   * @param { ArgumentTypes.Id } id,
   */
  mint(account: ArgumentTypes.AccountId, id: ArgumentTypes.Id, __options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'psp34Mintable::mint', [account, id], __options);
  }
}
