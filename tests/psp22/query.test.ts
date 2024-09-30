import Contract from '../generated/contracts/my_psp22';
import Constructors from '../generated/deployers/my_psp22';
import { ApiPromise, Keyring } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { GetAccounts } from '../config';
import { expect } from 'chai';
import BN from 'bn.js';
import { nobody } from '@polkadot/keyring/pair/nobody';

describe("Correctness of the PSP22 contract' methods types query", () => {
  let api: ApiPromise;
  let contract: Contract;
  let UserAlice: KeyringPair, UserBob: KeyringPair, UserCharlie: KeyringPair;

  before(async () => {
    api = await ApiPromise.create({ noInitWarn: true });

    const accounts = GetAccounts();

    UserAlice = accounts.UserAlice;
    UserBob = accounts.UserBob;
    UserCharlie = accounts.UserCharlie;

    const factory = new Constructors(api, UserAlice);

    const res = await factory['new']('10000000000000000000000', {});

    contract = new Contract(res.contract.address, UserAlice, api);

    await contract.tx.mint(UserAlice.address, '10000000000000000000000');
    await contract.tx.mint(UserBob.address, '10000000000000000000000');
  });

  after(async () => {
    await api.disconnect();
  });

  it('`PSP22::total_supply`', async () => {
    const { value, gasRequired } = await contract.query.totalSupply();
    expect(['string', 'number', 'object'].includes(typeof value)).to.equal(true);
    expect(_isAmount(value.unwrapRecursively())).to.equal(true);
  });

  it('`PSP22::balance_of`', async () => {
    const { value } = await contract.query.balanceOf(UserAlice.address);
    expect(['string', 'number', 'object'].includes(typeof value)).to.equal(true);
    expect(_isAmount(value.unwrapRecursively())).to.equal(true);
  });

  it('`PSP22::balance_of`', async () => {
    await contract.query.balanceOf(UserCharlie.address);
  });

  it('`mint_to`', async () => {
    const { value } = await contract.query.mint(UserAlice.address, '1000000');
    expect(value.unwrapRecursively() === null).to.equal(true);
  });

  it('`PSP22Mintable::mint`', async () => {
    const { value } = await contract.query.mint(UserAlice.address, '1000000');
    expect(value.unwrapRecursively() === null).to.equal(true);
    const { value: value2 } = await contract.query.mint(UserAlice.address, 1000000);
    expect(value2.unwrapRecursively() === null).to.equal(true);
  });

  it('`PSP22::allowance`', async () => {
    const { value } = await contract.query.allowance(UserCharlie.address, UserCharlie.address);
    expect(['string', 'number', 'object'].includes(typeof value)).to.equal(true);
    expect(_isAmount(value.unwrapRecursively())).to.equal(true);
  });

  it('`PSP22::increase_allowance` & `PSP22::decrease_allowance`', async () => {
    const { value } = await contract.query.increaseAllowance(UserAlice.address, '1000000');
    expect(value.unwrapRecursively() === null).to.equal(true);
    await contract.tx.increaseAllowance(UserAlice.address, '1000000');
    const { value: value2 } = await contract.query.decreaseAllowance(UserAlice.address, '1000000');
    expect(value2.unwrapRecursively() === null).to.equal(true);
  });

  it('`PSP22::transfer`', async () => {
    await contract.tx.mint(UserAlice.address, '10');

    const { value } = await contract.query.transfer(UserBob.address, '10', []);
    expect(value.unwrapRecursively() === null).to.equal(true);
  });

  it('mint_to throws correct, readable error', async () => {
    try {
      await contract.withAddress(nobody().address).tx.mint(UserAlice.address, '1000000');

      throw new Error('Should not pass with an invalid contract address');
    } catch (e: any) {
      expect(e.blockHash).to.be.a('string');
      expect(e.error.message).to.be.eq('contracts.ContractNotFound(No contract was found at the specified address.)');
      expect(e.events).to.be.an('array');
      expect(e.events).to.be.empty;
      expect(e.from).to.be.a('string');
      expect(e.txHash).to.be.a('string');
    }
  });
});

function _isAmount(value: BN | undefined) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0;
}
