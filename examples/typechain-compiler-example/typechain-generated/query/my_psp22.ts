/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import type { QueryReturnType } from '@c-forge/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/my_psp22';
import type * as ReturnTypes from '../types-returns/my_psp22';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/my_psp22.json';
import { bnToBn } from '@polkadot/util';

export default class MyPsp22Methods {
  readonly __nativeContract: ContractPromise;
  readonly __apiPromise: ApiPromise;
  readonly __callerAddress: string;

  constructor(nativeContract: ContractPromise, nativeApi: ApiPromise, callerAddress: string) {
    this.__nativeContract = nativeContract;
    this.__callerAddress = callerAddress;
    this.__apiPromise = nativeApi;
  }

  /**
   * setHatedAccount
   *
   * @param { ArgumentTypes.AccountId } account,
   * @returns { Result<null, ReturnTypes.LangError> }
   */
  setHatedAccount(account: ArgumentTypes.AccountId, __options?: ContractOptions): Promise<QueryReturnType<Result<null, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'setHatedAccount', [account], __options, (result) => {
      return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * totalSupply
   *
   * @returns { Result<BN, ReturnTypes.LangError> }
   */
  totalSupply(__options?: ContractOptions): Promise<QueryReturnType<Result<BN, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::totalSupply', [], __options, (result) => {
      return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @returns { Result<BN, ReturnTypes.LangError> }
   */
  balanceOf(owner: ArgumentTypes.AccountId, __options?: ContractOptions): Promise<QueryReturnType<Result<BN, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::balanceOf', [owner], __options, (result) => {
      return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * allowance
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { ArgumentTypes.AccountId } spender,
   * @returns { Result<BN, ReturnTypes.LangError> }
   */
  allowance(
    owner: ArgumentTypes.AccountId,
    spender: ArgumentTypes.AccountId,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<BN, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::allowance', [owner, spender], __options, (result) => {
      return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * transfer
   *
   * @param { ArgumentTypes.AccountId } to,
   * @param { (string | number | BN) } value,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  transfer(
    to: ArgumentTypes.AccountId,
    value: string | number | BN,
    data: Array<number | string | BN>,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::transfer', [to, value, data], __options, (result) => {
      return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * transferFrom
   *
   * @param { ArgumentTypes.AccountId } from,
   * @param { ArgumentTypes.AccountId } to,
   * @param { (string | number | BN) } value,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  transferFrom(
    from: ArgumentTypes.AccountId,
    to: ArgumentTypes.AccountId,
    value: string | number | BN,
    data: Array<number | string | BN>,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::transferFrom',
      [from, to, value, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * approve
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } value,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  approve(
    spender: ArgumentTypes.AccountId,
    value: string | number | BN,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'psp22::approve', [spender, value], __options, (result) => {
      return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS));
    });
  }

  /**
   * increaseAllowance
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } deltaValue,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  increaseAllowance(
    spender: ArgumentTypes.AccountId,
    deltaValue: string | number | BN,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::increaseAllowance',
      [spender, deltaValue],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }

  /**
   * decreaseAllowance
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } deltaValue,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  decreaseAllowance(
    spender: ArgumentTypes.AccountId,
    deltaValue: string | number | BN,
    __options?: ContractOptions,
  ): Promise<QueryReturnType<Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::decreaseAllowance',
      [spender, deltaValue],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS));
      },
    );
  }
}
