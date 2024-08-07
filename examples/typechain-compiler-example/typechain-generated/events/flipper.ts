/* This file is auto-generated */
// @ts-nocheck

import type * as EventTypes from '../event-types/flipper';
import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/flipper.json';
import { getEventTypeDescription } from '../shared/utils';
import { handleEventReturn } from '@c-forge/typechain-types';

export default class EventsClass {
  readonly __nativeContract: ContractPromise;
  readonly __api: ApiPromise;

  constructor(nativeContract: ContractPromise, api: ApiPromise) {
    this.__nativeContract = nativeContract;
    this.__api = api;
  }

  private __subscribeOnEvent(callback: (args: any[], event: any) => void, filter: (signatureTopic: string) => boolean = () => true) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.__api.query.system.events((events) => {
      events.forEach((record: any) => {
        const { event } = record;

        if (event.method === 'ContractEmitted') {
          const [address, data] = record.event.data;

          if (address.toString() === this.__nativeContract.address.toString()) {
            const decodeResult =
              this.__nativeContract.abi.events[
                (this.__nativeContract.abi.json as any).spec.events.findIndex((e: any) => e.signature_topic === record.topics[0].toString())
              ].fromU8a(data);

            if (filter(decodeResult.event.signatureTopic.toString())) callback(decodeResult.args, decodeResult.event);
          }
        }
      });
    });
  }
}
