import * as PolkadotAPI from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { BN } from 'bn.js';
import { expect } from 'chai';
import { GetAccounts } from '../config';
import Contract from '../generated/contracts/my_psp34';
import Constructors from '../generated/deployers/my_psp34';
import { IdBuilder } from '../generated/types-arguments/my_psp34';

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

  it('Approve', async () => {
    const { query } = contract;

    const totalSupply = Number((await query.totalSupply()).value);
    const id = totalSupply + 1;

    await contract.tx.mint(UserAlice.address, IdBuilder.U8(new BN(id)));

    const result = await query.approve(UserBob.address, IdBuilder.U8(new BN(id)), true);

    expect(result.value.ok).to.equal(null);
  });

  it('Transfer', async () => {
    const { query, tx } = contract;

    const totalSupply = Number((await query.totalSupply()).value);

    await tx.mint(UserAlice.address, IdBuilder.U16(new BN(totalSupply.valueOf() + 1)));

    const result = await query.transfer(UserBob.address, IdBuilder.U16(new BN(totalSupply.valueOf() + 1)), []);

    expect(result.value.ok).to.equal(null);
  });

  it('Can mint any Id', async () => {
    const { query } = contract;

    const totalSupply = Number((await query.totalSupply()).value);
    const id = totalSupply + 1;

    let result = await query.mint(UserAlice.address, IdBuilder.U8(new BN(id)));
    expect(result.value.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U16(new BN(id)));
    expect(result.value.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U32(new BN(id)));
    expect(result.value.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U64(new BN(id)));
    expect(result.value.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U128(new BN(id)));
    expect(result.value.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.Bytes([new BN(id)]));
    expect(result.value.ok).to.equal(null);
  });

  it('Allowance', async () => {
    const { query } = contract;

    const totalSupply = Number((await query.totalSupply()).value);
    const id = totalSupply + 1;

    await contract.tx.mint(UserAlice.address, IdBuilder.U8(new BN(id)));

    const result = await query.allowance(UserAlice.address, UserBob.address, IdBuilder.U8(new BN(id)));

    expect(result.value).to.equal(false);
  });

  it('BalanceOf', async () => {
    const { query } = contract;

    await query.balanceOf(UserAlice.address);
  });

  it('OwnerOf', async () => {
    const { query } = contract;

    await query.ownerOf(IdBuilder.U8(new BN(1)));
  });

  it('TotalSupply', async () => {
    const { query } = contract;

    await query.totalSupply();
  });
});
