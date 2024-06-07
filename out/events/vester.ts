/* This file is auto-generated */
// @ts-nocheck

import type * as EventTypes from '../event-types/vester';
import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/vester.json';
import { getEventTypeDescription } from '../shared/utils';
import { handleEventReturn } from '@c-forge/typechain-types';

export default class EventsClass {
  readonly __nativeContract: ContractPromise;
  readonly __api: ApiPromise;

  constructor(nativeContract: ContractPromise, api: ApiPromise) {
    this.__nativeContract = nativeContract;
    this.__api = api;
  }

  public subscribeOnTransferEvent(callback: (event: EventTypes.Transfer) => void) {
    const callbackWrapper = (args: any[], event: any) => {
      const _event: Record<string, any> = {};

      for (let i = 0; i < args.length; i++) {
        _event[event.args[i]!.name] = args[i]!.toJSON();
      }

      callback(
        handleEventReturn(
          _event,
          getEventTypeDescription('0xb5b61a3e6a21a16be4f044b517c28ac692492f73c5bfd3f60178ad98c767f4cb', EVENT_DATA_TYPE_DESCRIPTIONS),
        ) as EventTypes.Transfer,
      );
    };

    return this.__subscribeOnEvent(callbackWrapper, (eventName: string) => eventName === 'Transfer');
  }

  public subscribeOnApprovalEvent(callback: (event: EventTypes.Approval) => void) {
    const callbackWrapper = (args: any[], event: any) => {
      const _event: Record<string, any> = {};

      for (let i = 0; i < args.length; i++) {
        _event[event.args[i]!.name] = args[i]!.toJSON();
      }

      callback(
        handleEventReturn(
          _event,
          getEventTypeDescription('0x1a35e726f5feffda199144f6097b2ba23713e549bfcbe090c0981e3bcdfbcc1d', EVENT_DATA_TYPE_DESCRIPTIONS),
        ) as EventTypes.Approval,
      );
    };

    return this.__subscribeOnEvent(callbackWrapper, (eventName: string) => eventName === 'Approval');
  }

  public subscribeOnTokenReleasedEvent(callback: (event: EventTypes.TokenReleased) => void) {
    const callbackWrapper = (args: any[], event: any) => {
      const _event: Record<string, any> = {};

      for (let i = 0; i < args.length; i++) {
        _event[event.args[i]!.name] = args[i]!.toJSON();
      }

      callback(
        handleEventReturn(
          _event,
          getEventTypeDescription('0xde8c338ca79d8805352d1d92f36574a15658653f461ebd4f627be5d542e7363b', EVENT_DATA_TYPE_DESCRIPTIONS),
        ) as EventTypes.TokenReleased,
      );
    };

    return this.__subscribeOnEvent(callbackWrapper, (eventName: string) => eventName === 'TokenReleased');
  }

  public subscribeOnVestingScheduledEvent(callback: (event: EventTypes.VestingScheduled) => void) {
    const callbackWrapper = (args: any[], event: any) => {
      const _event: Record<string, any> = {};

      for (let i = 0; i < args.length; i++) {
        _event[event.args[i]!.name] = args[i]!.toJSON();
      }

      callback(
        handleEventReturn(
          _event,
          getEventTypeDescription('0xc5a44e3ce50f6ecdb81b76c25cea0615b745a129563c4ad611b6067ae1e0eb32', EVENT_DATA_TYPE_DESCRIPTIONS),
        ) as EventTypes.VestingScheduled,
      );
    };

    return this.__subscribeOnEvent(callbackWrapper, (eventName: string) => eventName === 'VestingScheduled');
  }

  private __subscribeOnEvent(callback: (args: any[], event: any) => void, filter: (eventName: string) => boolean = () => true) {
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

            if (filter(decodeResult.event.identifier.toString())) callback(decodeResult.args, decodeResult.event);
          }
        }
      });
    });
  }
}
