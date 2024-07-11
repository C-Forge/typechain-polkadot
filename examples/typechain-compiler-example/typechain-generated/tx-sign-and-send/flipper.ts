/* This file is auto-generated */
// @ts-nocheck

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { ContractOptionsWithRequiredValue, Result } from '@c-forge/typechain-types';
import type { ContractOptions } from '@polkadot/api-contract/types';
import { txSignAndSend } from '@c-forge/typechain-types';
import type * as ArgumentTypes from '../types-arguments/flipper';
import type BN from 'bn.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventRecord } from '@polkadot/types/interfaces';
import type { SignerOptions } from '@polkadot/api/submittable/types';
import { decodeEvents, decodeEventsLegacy } from '../shared/utils';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/flipper.json';

export default class FlipperMethods {
  readonly __nativeContract: ContractPromise;
  readonly __keyringPair: KeyringPair;
  readonly __apiPromise: ApiPromise;

  constructor(apiPromise: ApiPromise, nativeContract: ContractPromise, keyringPair: KeyringPair) {
    this.__apiPromise = apiPromise;
    this.__nativeContract = nativeContract;
    this.__keyringPair = keyringPair;
  }

  /**
   * flip
   *
   */
  flip(contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'flip',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [],
      contractOptions,
      signerOptions,
    );
  }

  /**
   * get
   *
   */
  get(contractOptions?: ContractOptions, signerOptions?: Partial<SignerOptions>) {
    return txSignAndSend(
      this.__apiPromise,
      this.__nativeContract,
      this.__keyringPair,
      'get',
      (events: EventRecord[]) => {
        return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
      },
      [],
      contractOptions,
      signerOptions,
    );
  }
}
