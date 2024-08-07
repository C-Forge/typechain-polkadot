/* This file is auto-generated */
// @ts-nocheck

import type * as EventTypes from '../event-types/my_psp34';
import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_psp34.json';
import { getEventTypeDescription } from '../shared/utils';
import { handleEventReturn } from '@c-forge/typechain-types';

export default class EventsClass {
  readonly __nativeContract: ContractPromise;
  readonly __api: ApiPromise;

  constructor(nativeContract: ContractPromise, api: ApiPromise) {
    this.__nativeContract = nativeContract;
    this.__api = api;
  }

  private __subscribeOnEvent(callback: (args: any[], event: any) => void, filter: (eventName: string) => boolean = () => true) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.__api.query.system.events((events) => {
      events.forEach((record: any) => {
        const { event } = record;

        if (event.method == 'ContractEmitted') {
          const [address] = record.event.data;

          if (address.toString() === this.__nativeContract.address.toString()) {
            const { args, event } = this.__nativeContract.abi.decodeEvent(record);

            if (filter(event.identifier.toString())) callback(args, event);
          }
        }
      });
    });
  }
}
