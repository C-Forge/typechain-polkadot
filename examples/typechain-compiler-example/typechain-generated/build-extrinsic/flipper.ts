/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { ContractOptionsWithRequiredValue } from '@c-forge/typechain-types';
import { buildSubmittableExtrinsic } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/flipper';
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
   * flip
   *
   */
  flip(__options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'flip', [], __options);
  }

  /**
   * get
   *
   */
  get(__options: ContractOptions) {
    return buildSubmittableExtrinsic(this.__apiPromise, this.__nativeContract, 'get', [], __options);
  }
}
