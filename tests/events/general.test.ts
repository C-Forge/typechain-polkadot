import { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { BN } from 'bn.js';
import { expect } from 'chai';
import { GetAccounts } from '../config';
import Contract from '../generated/contracts/my_psp34_events';
import Constructors from '../generated/deployers/my_psp34_events';
import { IdBuilder as IdBuilderArgs } from '../generated/types-arguments/my_psp34_events';
import { IdBuilder } from '../generated/types-returns/my_psp34_events';

describe('Events', () => {
  let api: ApiPromise;
  let contract: Contract;
  let UserAlice: KeyringPair, UserBob: KeyringPair;

  beforeEach(async () => {
    api = await ApiPromise.create({ noInitWarn: true });

    const accounts = GetAccounts();

    UserAlice = accounts.UserAlice;
    UserBob = accounts.UserBob;

    const factory = new Constructors(api, UserAlice);

    const {
      contract: { address },
    } = await factory.new();

    contract = new Contract(address, UserAlice, api);
  });

  afterEach(async () => {
    await api.disconnect();
  });

  it('Subscription to events works', async () => {
    let eventsCount = 0;

    const eventsToBeSent = [
      {
        from: null,
        to: UserAlice.address,
        id: IdBuilder.U128(new BN(1)),
      },
      {
        from: UserAlice.address,
        to: UserBob.address,
        id: IdBuilder.U128(new BN(1)),
      },
    ];

    contract.events.subscribeOnTransferEvent((event) => {
      expect(event).to.deep.equal(eventsToBeSent[eventsCount]!);
      eventsCount++;
    });

    await contract.tx.mint(UserAlice.address, IdBuilderArgs.U128(new BN(1)));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await contract.tx.transfer(UserBob.address, IdBuilderArgs.U128(new BN(1)), []);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(eventsCount).to.equal(eventsToBeSent.length);
  });

  it('Test events on submittables U32', async () => {
    const result = await contract.tx.mint(UserAlice.address, IdBuilderArgs.U32(new BN(1)));

    expect(result.events!.length).to.equal(1);

    expect(result.events![0]).to.deep.equal({
      name: 'Transfer',
      args: {
        from: null,
        to: UserAlice.address.toString(),
        id: IdBuilder.U32(new BN(1)),
      },
    });
  });

  it('Test events on submittables U128', async () => {
    const result2 = await contract.tx.mint(UserAlice.address, IdBuilderArgs.U128(new BN(1)));

    expect(result2.events!.length).to.equal(1);

    expect(result2.events![0]).to.deep.equal({
      name: 'Transfer',
      args: {
        from: null,
        to: UserAlice.address.toString(),
        id: IdBuilder.U128(new BN(1)),
      },
    });
  });
});
