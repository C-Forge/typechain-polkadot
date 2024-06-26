import { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { expect } from 'chai';
import { GetAccounts } from '../config';
import Contract from '../generated/contracts/my_psp22';
import Constructors from '../generated/deployers/my_psp22';

describe("Correctness of the PSP22 contract' methods types", () => {
  let api: ApiPromise;
  let contract: Contract;
  let contract_bob: Contract;
  let UserAlice: KeyringPair, UserBob: KeyringPair;

  beforeEach(async () => {
    api = await ApiPromise.create({ noInitWarn: true });

    const accounts = GetAccounts();

    UserAlice = accounts.UserAlice;
    UserBob = accounts.UserBob;

    const factory = new Constructors(api, UserAlice);

    const {
      contract: { address },
    } = await factory.new('10', {});

    contract = new Contract(address, UserAlice, api);
    contract_bob = new Contract(address, UserBob, api);

    await contract.tx.mint(UserAlice.address, '10');
    await contract.tx.mint(UserBob.address, '20');
  });

  afterEach(async () => {
    await api.disconnect();
  });

  it('total_supply works', async () => {
    expect((await contract.query.totalSupply()).value.unwrapRecursively().toNumber()).to.equal(40);
  });

  it('balance_of works', async () => {
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);
  });

  it('allowance works', async () => {
    expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(0);
    expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(0);

    await contract.tx.approve(UserBob.address, '10');

    expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(10);
    expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(0);

    await contract.tx.increaseAllowance(UserBob.address, '10');

    expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(0);

    await contract.tx.decreaseAllowance(UserBob.address, '20');

    expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(0);
    expect((await contract.query.allowance(UserBob.address, UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(0);
  });

  it('Transfer works', async () => {
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);

    await contract.tx.transfer(UserBob.address, '10', []);

    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(10);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(30);

    await contract_bob.tx.transfer(UserAlice.address, '10', []);

    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);
  });

  it('Cannot transfer above the amount', async () => {
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);

    try {
      await contract.tx.transfer(UserBob.address, '30', []);

      throw new Error('Should not be able to transfer more than the balance');
    } catch (e) {
      expect(e.error.message).to.include('contracts.InvalidSchedule');
    }
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);
  });

  it('TransferFrom works', async () => {
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);

    await contract.tx.approve(UserBob.address, '10');

    await contract_bob.tx.transferFrom(UserAlice.address, UserBob.address, '10', []);

    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(10);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(30);

    expect((await contract.query.allowance(UserAlice.address, UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(0);

    await contract_bob.tx.transfer(UserAlice.address, '10', []);

    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);
  });

  it('Transfer without approval should fail', async () => {
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);

    try {
      await contract_bob.tx.transferFrom(UserAlice.address, UserBob.address, '10', []);

      throw new Error('Should not be able to transfer without approval');
    } catch (e) {
      expect(e.error.message).to.include('contracts.InvalidSchedule');
    }

    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);
    expect((await contract.query.balanceOf(UserBob.address)).value.unwrapRecursively().toNumber()).to.equal(20);
  });

  it('PSP22Mintable::mint works', async () => {
    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(20);

    await contract.tx.mint(UserAlice.address, '10');

    expect((await contract.query.balanceOf(UserAlice.address)).value.unwrapRecursively().toNumber()).to.equal(30);
  });

  it('PSP22', async () => {
    await contract.tx.mint(UserAlice.address, '1000000000000000000000000');
  });
});
