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
import type * as ArgumentTypes from '../types-arguments/flipper';
import type * as ReturnTypes from '../types-returns/flipper';
import type BN from 'bn.js';
import { getTypeDescription } from './../shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import { decodeEvents, decodeEventsLegacy } from '../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/flipper.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/flipper.json';
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
   * flip
   *
   * @returns { void }
   */
  flip(__options: ContractOptions) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'flip',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [],
      __options,
    );
  }

  /**
   * get
   *
   * @returns { Result<boolean, ReturnTypes.LangError> }
   */
  get(__options: ContractOptions): Promise<QueryReturnType<Result<boolean, ReturnTypes.LangError>>> {
    return queryOkJSON(this.__apiPromise, this.__nativeContract, this.__callerAddress, 'get', [], __options, (result) => {
      return handleReturnType(result, getTypeDescription(5, DATA_TYPE_DESCRIPTIONS));
    });
  }
}
