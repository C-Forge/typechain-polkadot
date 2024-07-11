import { ApiPromise, Keyring } from '@polkadot/api';
import Deployer from './typechain-generated/deployers/my_psp22';
import Contract from './typechain-generated/contracts/my_psp22';

async function main() {
  const api = await ApiPromise.create();

  const keyring = new Keyring({ type: 'sr25519' });

  const aliceKeyringPair = keyring.addFromUri('//Alice');
  const bobKeyringPair = keyring.addFromUri('//Bob');

  const constructors = new Deployer(api, aliceKeyringPair);

  const {
    contract: { address: TOKEN_ADDRESS },
  } = await constructors.new(10000);

  console.log('Contract deployed at:', TOKEN_ADDRESS);

  const contract = new Contract(TOKEN_ADDRESS, aliceKeyringPair, api);

  const totalSupply = await contract.query.totalSupply();
  const balance = await contract.query.balanceOf(aliceKeyringPair.address);

  console.log(`%c Total supply before transfer: ${totalSupply.value.unwrap().toNumber()}`, 'color: green');
  console.log(`%c Balance of Alice before transfer: ${balance.value.unwrap()}`, 'color: green');

  contract.events.subscribeOnCustomTransferEventEvent((event) => {
    console.log('Custom Transfer event received:', event);
  });

  const mintTx = await contract.tx.transfer(bobKeyringPair.address, 1, []);

  const totalSupplyAfterMint = await contract.query.totalSupply();
  const balanceAfterMint = await contract.query.balanceOf(aliceKeyringPair.address);

  console.log(`%c Total supply after transfer: ${totalSupplyAfterMint.value.unwrap().toNumber()}`, 'color: green');
  console.log(`%c Balance of Alice after transfer: ${balanceAfterMint.value.unwrap()}`, 'color: green');

  await api.disconnect();
}

main().then(() => {
  console.log('done');
  process.exit(0);
});
