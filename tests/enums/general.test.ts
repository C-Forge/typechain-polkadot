import * as PolkadotAPI from '@polkadot/api';
import Contract from '../generated/contracts/contract_with_enums';
import { AnotherEnumBuilder, EnumExampleBuilder } from '../generated/types-arguments/contract_with_enums';
import Constructors from '../generated/deployers/contract_with_enums';
import type { KeyringPair } from '@polkadot/keyring/types';
import { GetAccounts } from '../config';
import { BN } from 'bn.js';
import { expect } from 'chai';

describe('MY_PSP34', () => {
  let api: PolkadotAPI.ApiPromise;
  let contract: Contract;
  let UserAlice: KeyringPair;

  before(async () => {
    api = await PolkadotAPI.ApiPromise.create({ noInitWarn: true });

    const accounts = GetAccounts();

    UserAlice = accounts.UserAlice;
    const factory = new Constructors(api, UserAlice);

    const res = await factory.new();

    contract = new Contract(res.contract.address, UserAlice, api);
  });

  after(async () => {
    await api.disconnect();
  });

  it('Returns proper value', async () => {
    const { query, tx } = contract;

    const resultA = await query.getMessage(EnumExampleBuilder.A('Hello'));
    expect(resultA.value).to.equal('Hello');

    const resultB = await query.getMessage(EnumExampleBuilder.B(new BN(42)));
    expect(resultB.value).to.equal('42');

    const resultC = await query.getMessage(EnumExampleBuilder.C(AnotherEnumBuilder.A([new BN(42)])));
    expect(resultC.value).to.equal('[42]');

    const resultE = await query.getMessage(EnumExampleBuilder.E());
    expect(resultE.value).to.equal('E');
  });
});
