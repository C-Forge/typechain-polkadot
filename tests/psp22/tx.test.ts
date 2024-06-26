import Contract from '../generated/contracts/my_psp22';
import { GetAccounts } from '../config';
import Constructors from '../generated/deployers/my_psp22';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ApiPromise } from '@polkadot/api';

describe("Correctness of the PSP22 contract' methods types tx", () => {
  let api: ApiPromise;
  let contract: Contract;
  let UserAlice: KeyringPair, UserBob: KeyringPair;

  before(async () => {
    api = await ApiPromise.create({ noInitWarn: true });

    const accounts = GetAccounts();

    UserAlice = accounts.UserAlice;
    UserBob = accounts.UserBob;

    const factory = new Constructors(api, UserAlice);

    const res = await factory.new('10000000000000000000000');

    contract = new Contract(res.contract.address, UserAlice, api);

    await contract.tx.mint(UserAlice.address, '10000000000000000000000');
    await contract.tx.mint(UserBob.address, '10000000000000000000000');
  });

  after(async () => {
    await api.disconnect();
  });

  it('`PSP22::total_supply`', async () => {
    await contract.tx.totalSupply();
  });

  it('`PSP22::balance_of`', async () => {
    await contract.tx.balanceOf(UserAlice.address);
  });

  it('`PSP22Mintable::mint`', async () => {
    await contract.tx.mint(UserAlice.address, '1000000');
  });

  it('`PSP22::allowance`', async () => {
    await contract.query.allowance(UserAlice.address, UserAlice.address);
  });

  it('`PSP22::increase_allowance` & `PSP22::decrease_allowance`', async () => {
    await contract.tx.increaseAllowance(UserAlice.address, '1000000');
    await contract.tx.decreaseAllowance(UserAlice.address, '1000000');
  });

  it('`PSP22::transfer`', async () => {
    await contract.query.transfer(UserBob.address, '10', []);
  });
});
