/* This file is auto-generated */
// @ts-nocheck

import type * as EventTypes from '../event-types/my_psp22';
import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/my_psp22.json';
import { getEventTypeDescription } from '../shared/utils';
import { handleEventReturn } from '@c-forge/typechain-types';

export default class EventsClass {
  readonly __nativeContract: ContractPromise;
  readonly __api: ApiPromise;

  constructor(nativeContract: ContractPromise, api: ApiPromise) {
    this.__nativeContract = nativeContract;
    this.__api = api;
  }

  public subscribeOnCustomTransferEventEvent(callback: (event: EventTypes.CustomTransferEvent) => void) {
    const callbackWrapper = (args: any[], event: any) => {
      const _event: Record<string, any> = {};

      for (let i = 0; i < args.length; i++) {
        _event[event.args[i]!.name] = args[i]!.toJSON();
      }

      callback(
        handleEventReturn(
          _event,
          getEventTypeDescription('0x5bcc39cd537d30ca7f8e745cb69046762ad0890f44cd5c1fd5ca1042003c0efb', EVENT_DATA_TYPE_DESCRIPTIONS),
        ) as EventTypes.CustomTransferEvent,
      );
    };
    return this.__subscribeOnEvent(
      callbackWrapper,
      (signatureTopic: string) => signatureTopic === '0x5bcc39cd537d30ca7f8e745cb69046762ad0890f44cd5c1fd5ca1042003c0efb',
    );
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
    return this.__subscribeOnEvent(
      callbackWrapper,
      (signatureTopic: string) => signatureTopic === '0xb5b61a3e6a21a16be4f044b517c28ac692492f73c5bfd3f60178ad98c767f4cb',
    );
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
    return this.__subscribeOnEvent(
      callbackWrapper,
      (signatureTopic: string) => signatureTopic === '0x1a35e726f5feffda199144f6097b2ba23713e549bfcbe090c0981e3bcdfbcc1d',
    );
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
