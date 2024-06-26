import * as PolkadotAPI from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { BN } from 'bn.js';
import { expect } from 'chai';
import { GetAccounts } from '../config';
import Contract from '../generated/contracts/my_psp34_events_ink5';
import Constructors from '../generated/deployers/my_psp34_events_ink5';
import { IdBuilder } from '../generated/types-arguments/my_psp34_events_ink5';
import { Approval } from '../generated/event-types/my_psp34_events_ink5';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('MY_PSP34 (ink5)', () => {
  let api: PolkadotAPI.ApiPromise;
  let contract: Contract;
  let UserAlice: KeyringPair, UserBob: KeyringPair;

  beforeEach(async () => {
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

    const totalSupply = (await query.totalSupply()).value.ok?.toNumber();
    const id = totalSupply! + 1;

    await contract.tx.mint(UserAlice.address, IdBuilder.U8(new BN(id)));

    const result = await query.approve(UserBob.address, IdBuilder.U8(new BN(id)), true);

    expect(result.value.ok?.ok).to.equal(null);
  });

  it('Transfer', async () => {
    const { query, tx } = contract;

    const totalSupply = (await query.totalSupply()).value.ok?.toNumber();

    await tx.mint(UserAlice.address, IdBuilder.U16(new BN(totalSupply!.valueOf() + 1)));

    const result = await query.transfer(UserBob.address, IdBuilder.U16(new BN(totalSupply!.valueOf() + 1)), []);

    expect(result.value.ok?.ok).to.equal(null);
  });

  it('Can mint any Id', async () => {
    const { query } = contract;

    const totalSupply = (await query.totalSupply()).value.ok?.toNumber();
    const id = totalSupply! + 1;

    let result = await query.mint(UserAlice.address, IdBuilder.U8(new BN(id)));
    expect(result.value.ok?.err).to.be.undefined;
    expect(result.value.ok?.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U16(new BN(id)));
    expect(result.value.ok?.err).to.be.undefined;
    expect(result.value.ok?.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U32(new BN(id)));
    expect(result.value.ok?.err).to.be.undefined;
    expect(result.value.ok?.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U64(new BN(id)));
    expect(result.value.ok?.err).to.be.undefined;
    expect(result.value.ok?.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.U128(new BN(id)));
    expect(result.value.ok?.err).to.be.undefined;
    expect(result.value.ok?.ok).to.equal(null);

    result = await query.mint(UserAlice.address, IdBuilder.Bytes([new BN(id)]));
    expect(result.value.ok?.err).to.be.undefined;
    expect(result.value.ok?.ok).to.equal(null);
  });

  it('Allowance', async () => {
    const { query } = contract;

    const totalSupply = (await query.totalSupply()).value.ok?.toNumber();
    const id = totalSupply! + 1;

    await contract.tx.mint(UserAlice.address, IdBuilder.U8(new BN(id)));

    const result = await query.allowance(UserAlice.address, UserBob.address, IdBuilder.U8(new BN(id)));

    expect(result.value.ok).to.equal(false);
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

  it('listen on approval event', async () => {
    const totalSupply = (await contract.query.totalSupply()).value.ok?.toNumber();
    const id = totalSupply! + 1;

    await contract.tx.mint(UserAlice.address, IdBuilder.U8(new BN(id)));

    const result = await contract.query.approve(UserBob.address, IdBuilder.U8(new BN(id)), true);

    expect(result.value.ok?.ok).to.equal(null);
    expect(result.value.ok?.err).to.be.undefined;

    const capturedEvents: Approval[] = [];
    contract.events.subscribeOnApprovalEvent((res) => {
      capturedEvents.push(res);
    });

    const tx = contract.tx.approve(UserBob.address, IdBuilder.U8(new BN(id)), true);

    await expect(tx).to.eventually.be.fulfilled;
    const txRes = await tx;
    expect(capturedEvents.length).to.equal(1);
    expect(capturedEvents[0].owner).to.equal(UserAlice.address);
    expect(capturedEvents[0].operator).to.equal(UserBob.address);
    expect(capturedEvents[0].id).not.to.be.undefined;
    expect(capturedEvents[0].id!.u8?.toString()).to.equal(id.toString());
    expect(capturedEvents[0].approved).to.equal(true);
    expect(txRes.events).not.to.be.undefined;
    expect(Object.values(txRes.events!).length).to.equal(1);
    expect(txRes.events![0].name).to.equal('pendzl_contracts::token::psp34::Approval');
    expect(txRes.events![0].args.owner).to.equal(UserAlice.address);
    expect(txRes.events![0].args.operator).to.equal(UserBob.address);
    expect(txRes.events![0].args.id).not.to.be.undefined;
    expect(txRes.events![0].args.id!.u8?.toString()).to.equal(id.toString());
    expect(txRes.events![0].args.approved).to.equal(true);
  });
});
