import * as PolkadotAPI from '@polkadot/api';
import Contract from '../generated/contracts/my_psp34';
import { IdBuilder } from '../generated/types-arguments/my_psp34';
import Constructors from '../generated/deployers/my_psp34';
import type { KeyringPair } from '@polkadot/keyring/types';
import { GetAccounts } from '../config';
import { BN } from 'bn.js';
import { expect } from 'chai';

describe('MY_PSP34', () => {
  let api: PolkadotAPI.ApiPromise;
  let contract: Contract;
  let UserAlice: KeyringPair, UserBob: KeyringPair;

  before(async () => {
    api = await PolkadotAPI.ApiPromise.create({ noInitWarn: true });

    const accounts = GetAccounts();

    UserAlice = accounts.UserAlice;
    UserBob = accounts.UserBob;

    const factory = new Constructors(api, UserAlice);

    const res = await factory.new();

    contract = new Contract(res.contract.address, UserAlice, api);
  });

  after(async () => {
    await api.disconnect();
  });

  it('Returns total supply', async () => {
    const { query, tx } = contract;

    const resultBefore = Number((await query.totalSupply()).value);

    await tx.mint(UserAlice.address, IdBuilder.U8(new BN(resultBefore.valueOf() + 1)));

    const resultAfter = (await query.totalSupply()).value;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await expect(resultAfter.valueOf() - resultBefore.valueOf()).to.equal(1);
  });

  it('Transfer works', async () => {
    const { query, tx } = contract;

    const totalSupply = Number((await query.totalSupply()).value);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await tx.mint(UserAlice.address, IdBuilder.U16(totalSupply.valueOf() + 1));

    await tx.transfer(UserBob.address, IdBuilder.U16(new BN(totalSupply.valueOf() + 1)), []);
  });

  it('Can mint any Id', async () => {
    const { query, tx } = contract;

    const totalSupply = Number((await query.totalSupply()).value);

    const id = totalSupply + 1;

    await tx.mint(UserAlice.address, IdBuilder.U8(new BN(id)));
    await tx.mint(UserAlice.address, IdBuilder.U16(new BN(id)));
    await tx.mint(UserAlice.address, IdBuilder.U32(new BN(id)));
    await tx.mint(UserAlice.address, IdBuilder.U64(new BN(id)));
    await tx.mint(UserAlice.address, IdBuilder.U128(new BN(id)));
    await tx.mint(UserAlice.address, IdBuilder.Bytes([new BN(id)]));

    const totalSupplyAfter = Number((await query.totalSupply()).value);

    await expect(totalSupplyAfter.valueOf() - totalSupply.valueOf()).to.equal(6);
  });
});
