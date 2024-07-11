/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { QueryReturnType } from '@c-forge/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/flipper';
import type * as ReturnTypes from '../types-returns/flipper';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/flipper.json';
import { bnToBn } from '@polkadot/util';

export default class FlipperMethods {
  readonly __nativeContract: ContractPromise;
  readonly __apiPromise: ApiPromise;
  readonly __callerAddress: string;

  constructor(nativeContract: ContractPromise, nativeApi: ApiPromise, callerAddress: string) {
    this.__nativeContract = nativeContract;
    this.__callerAddress = callerAddress;
    this.__apiPromise = nativeApi;
  }

  /**
   * flip
   *
   * @returns { Result<null, ReturnTypes.LangError> }
   */
  flip(__options?: ContractOptions): Promise<QueryReturnType<Result<null, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'flip', [], __options, (result) => {
      return handleReturnType(result, getTypeDescription(2, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * get
   *
   * @returns { Result<boolean, ReturnTypes.LangError> }
   */
  get(__options?: ContractOptions): Promise<QueryReturnType<Result<boolean, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'get', [], __options, (result) => {
      return handleReturnType(result, getTypeDescription(5, DATA_TYPE_DESCRIPTIONS));
    });
  }
}
