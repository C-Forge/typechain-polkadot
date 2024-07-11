# Typechain-Polkadot Documentation

Note: The following guide use `pnpm`. If you don't have it, you can install it via `npm`:

```bash
npm i -g pnpm
```

## Packages of Typechain-Polkadot

Typechain Polkadot has 4 main packages:

- `typechain-polkadot` - main package, which contains all logic for generating interfaces for contracts
- `typechain-polkadot-parser` - package for parsing types of contracts received from metadata
- `typechain-compiler` - package that allows you to run typechain easily on the big projects, it automatically compiles all contracts and generates typechain-code for them.
- `typechain-types` - package that contains types for typechain-polkadot, that are used in generated code.

---

## How to use Typechain-Polkadot

If you want to use Typechain-Polkadot, you have few options:

- You can use `typechain-compiler` package, which allows you to run typechain easily on the big projects, it automatically compiles all contracts and generates typechain-code for them.
- You can use `typechain-polkadot` package, which contains all logic for generating interfaces for contracts. You can use it as a library or as a CLI tool.

### Typechain-Compiler case

As was mentioned above, `typechain-compiler` package allows you to run typechain easily on the big projects, it automatically compiles all contracts and generates typechain-code for them.
So let's create a simple project, which will contain 2 contracts, and we will use `typechain-compiler` to generate typechain-code for them.

1. First of all, let's create a project:

```bash
$ mkdir typechain-compiler-example
$ cd typechain-compiler-example
$ npm init -y
```

And add typescript config:
`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

2. Now, let's create directory for contracts:

```bash
$ mkdir contracts
```

3. Let's create 2 contracts, which will be used in our example:

```bash
$ cd contracts
$ cargo contract new flipper
```

4. Let's let flipper be flipper, and use psp22. For this, let's copy folder with psp22 code.
   Here we'll use the code from https://github.com/Pendzl/pendzl/tree/main/examples/psp22.

```toml
# my_psp22/Cargo.toml
[package]
name = "my_psp22"
version = "0.1.1"
previous-authors = ["Brushfam <green@727.ventures>"]
authors = [
    "Konrad Wierzbik <konrad.wierzbik@gmail.com",
    "Łukasz Łakomy <wookie.xp.07@gmail.com>",
]
edition = "2021"

[dependencies]
ink = { version = "5.0.0", default-features = false }

scale = { package = "parity-scale-codec", version = "3.6.9", default-features = false, features = [
    "derive",
] }
scale-info = { version = "2.11", default-features = false, features = [
    "derive",
], optional = true }

# These dependencies
pendzl = { version = "0.2.4-v1calls2", default-features = false, features = ["psp22_impl"] }

[dev-dependencies]
ink_e2e = "5.0.0"

[lib]
name = "my_psp22"
path = "lib.rs"


[features]
default = ["std"]
std = [
    "ink/std",
    "scale/std",
    "scale-info/std",
    # These dependencies
    "pendzl/std",
]
ink-as-dependency = []
e2e-tests = []

[profile.dev]
codegen-units = 16
```

```rust
// my_psp22/lib.rs
// SPDX-License-Identifier: MIT
#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[pendzl::implementation(PSP22)]
#[ink::contract]
pub mod my_psp22 {
    use ink::prelude::string::String;
    #[ink::storage_item]
    #[derive(Debug)]
    pub struct HatedStorage {
        pub hated_account: AccountId,
    }

    #[ink(storage)]
    // derive explained below
    #[derive(StorageFieldGetter)]
    pub struct Contract {
        #[storage_field]
        psp22: PSP22Data,
        #[storage_field]
        hated_storage: HatedStorage,
    }

    #[overrider(PSP22Internal)]
    fn _update(
        &mut self,
        from: Option<&AccountId>,
        to: Option<&AccountId>,
        amount: &Balance,
    ) -> Result<(), PSP22Error> {
        if to == Some(&self.hated_storage.hated_account) {
            return Err(PSP22Error::Custom(String::from(
                "I hate this account!",
            )));
        }
        pendzl::contracts::psp22::PSP22InternalDefaultImpl::_update_default_impl(
            self, from, to, amount,
        )
    }

    impl Contract {
        #[ink(constructor)]
        pub fn new(total_supply: Balance) -> Self {
            let mut instance = Self {
                psp22: Default::default(),
                hated_storage: HatedStorage {
                    hated_account: [255; 32].into(),
                },
            };

            instance
                ._mint_to(&Self::env().caller(), &total_supply)
                .expect("Should mint");

            instance
        }

        #[ink(message)]
        pub fn set_hated_account(&mut self, account: AccountId) {
            self.hated_storage.hated_account = account;
        }
    }
}
```

Alright, now we have 2 contracts, let's create a file, which will contain our configuration for `typechain-compiler`:

> You should be on the root of your project

```bash
$ touch typechain.config.json
```

5. Let's add some configuration to our `typechain.config.json`:

```json
{
  "projectFiles": ["./contracts/**"],
  "artifactsPath": "./artifacts",
  "typechainGeneratedPath": "./typechain-generated"
}
```

To dive deeper into configuration, you can check [typechain-compiler documentation](../packages/typechain-compiler/README.md)

6. And now, let's install `typechain-compiler`. Also we will need to have `@polkadot/api`, `@polkadot/api-contract` and some other packages installed:
   Add the following to your `package.json`:

```json
"dependencies": {
	"@c-forge/typechain-compiler": "^0.2.2",
	"@c-forge/typechain-types": "^0.2.2",
	"@types/node": "^17.0.34",
	"typescript": "^5.2.2",
	"@polkadot/api": "10.9.1",
	"@polkadot/api-contract": "10.9.1",
	"@polkadot/util": "^12.6.2",
	"@types/bn.js": "^5.1.0"
}
```

And install it with `pnpm install`.

> If you're still confused, you can check our examples in [examples](../examples) directory

7. Now, let's run `typechain-compiler`:

```bash
$ npx @c-forge/typechain-compiler --config typechain.config.json
```

8. And now, you can use generated code in your project. For example, you can create a file `index.ts`:

```typescript
// In this example we will deploy & interact with my_psp22 token to transfer some tokens to the owner and get total supply.
import { ApiPromise, Keyring } from '@polkadot/api';
import Deployer from './typechain-generated/deployers/my_psp22';
import Contract from './typechain-generated/contracts/my_psp22';

async function main() {
  // Connect to the local node
  const api = await ApiPromise.create();

  // Create keyring pair for Alice and Bob
  const keyring = new Keyring({ type: 'sr25519' });

  const aliceKeyringPair = keyring.addFromUri('//Alice');
  const bobKeyringPair = keyring.addFromUri('//Bob');

  // Create instance of constructors, that will be used to deploy contracts
  // Deployer contains all constructors from the contract
  const constructors = new Deployer(api, aliceKeyringPair);

  // Deploy contract via constructor
  const {
    contract: { address: TOKEN_ADDRESS },
  } = await constructors.new(10000);

  console.log('Contract deployed at:', TOKEN_ADDRESS);

  const contract = new Contract(TOKEN_ADDRESS, aliceKeyringPair, api);

  const totalSupply = await contract.query.totalSupply();
  const balance = await contract.query.balanceOf(aliceKeyringPair.address);

  console.log(`%c Total supply before transfer: ${totalSupply.value.unwrap().toNumber()}`, 'color: green');
  console.log(`%c Balance of Alice before transfer: ${balance.value.unwrap()}`, 'color: green');

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
```

9. To interact with our contract, we need to have `substrate-contracts-node` installed and running:
   Download the latest release from [substrate-contracts-node](https://github.com/paritytech/substrate-contracts-node/releases) and run it:

````bash
$ ./substrate-contracts-node --dev
```bash

10. And now, you can run it with `tsx`:

```bash
$ npx tsx index.ts
````

Whoa! We've just deployed and interacted with our contract! 🎉

> Link to the full example: [typechain-compiler-example](https://github.com/C-Forge/typechain-polkadot/tree/main/examples/typechain-compiler-example)

### Events

In this section we will handle smart contract events!

1. Let's add `event` to our contract, so the final code will look like this:

```rust
// my_psp22/lib.rs
// SPDX-License-Identifier: MIT
#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[pendzl::implementation(PSP22)]
#[ink::contract]
pub mod my_psp22 {
    use ink::prelude::string::String;
    #[ink::storage_item]
    #[derive(Debug)]
    pub struct HatedStorage {
        pub hated_account: AccountId,
    }

    #[ink(storage)]
    // derive explained below
    #[derive(StorageFieldGetter)]
    pub struct Contract {
        #[storage_field]
        psp22: PSP22Data,
        #[storage_field]
        hated_storage: HatedStorage,
    }

    #[overrider(PSP22Internal)]
    fn _update(
        &mut self,
        from: Option<&AccountId>,
        to: Option<&AccountId>,
        amount: &Balance,
    ) -> Result<(), PSP22Error> {
        if to == Some(&self.hated_storage.hated_account) {
            return Err(PSP22Error::Custom(String::from(
                "I hate this account!",
            )));
        }
        pendzl::contracts::psp22::PSP22InternalDefaultImpl::_update_default_impl(
            self, from, to, amount,
        )
        ink::env::emit_event::<ink::env::DefaultEnvironment, CustomTransferEvent>(
            CustomTransferEvent {
                from: from.and_then(|v| Some(*v)),
                to: to.and_then(|v| Some(*v)),
                value: *amount,
            },
        );
        Ok(())
    }

    #[ink::event]
    #[derive(Debug)]
    pub struct CustomTransferEvent {
        #[ink(topic)]
        pub from: Option<AccountId>,
        #[ink(topic)]
        pub to: Option<AccountId>,
        pub value: Balance,
    }


    impl Contract {
        #[ink(constructor)]
        pub fn new(total_supply: Balance) -> Self {
            let mut instance = Self {
                psp22: Default::default(),
                hated_storage: HatedStorage {
                    hated_account: [255; 32].into(),
                },
            };

            instance
                ._mint_to(&Self::env().caller(), &total_supply)
                .expect("Should mint");

            instance
        }

        #[ink(message)]
        pub fn set_hated_account(&mut self, account: AccountId) {
            self.hated_storage.hated_account = account;
        }
    }
}
```

2. And now, let's run `typechain-compiler` in the root of our project:

```bash
$ npx @c-forge/typechain-compiler --config typechain.config.json
```

3. And now, let's add subscription to the events, so the final code will look like this:

```typescript
// index.ts
// In this example we will deploy & interact with my_psp22 token to mint some tokens to the owner and get total supply.
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
```

4. And now, let's run it:

```bash
$ npx tsx index.ts
```

And you should see something like this:

```bash
Contract deployed at: 5Cc95McifGEqPsc9kfBNvWgAkDZeZ2BkQ5BCBXkHXmsNYavM
 Total supply before transfer: 10000
 Balance of Alice before transfer: 10000
Transfer event received: {
  from: null,
  to: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  value:  <BN: 2710>
}
Transfer event received: {
  from: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  to: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  value: <BN: 1>
}
 Total supply after transfer: 10000
 Balance of Alice after transfer: 9999
done
```

Wow, we have successfully subscribed to events and got them!

## How to use it directly via `typechain-polkadot`?

Let's use previous example, but instead of using `typechain-compiler`, we will use `typechain-polkadot` directly.

1. We need to compile our contracts:

```bash
cd ./contracts/my_psp22
cargo contract build
cd ../flipper
cargo contract build
```

2. And now, let's install `typechain-polkadot`:

```bash
$ pnpm install @c-forge/typechain-polkadot
```

3. Let's create a directory with artifacts:

```bash
$ mkdir artifacts
```

4. And now, let's copy our artifacts to the `artifacts` directory:

```bash
$ cp ./contracts/my_psp22/target/ink/my_psp22.* artifacts
$ cp ./contracts/flipper/target/ink/flipper.* artifacts
```

5. Let's run `typechain-polkadot`:

```bash
$ npx @c-forge/typechain-polkadot --in ./artifacts --out ./typechain-generated
```

Wow! We've just generated code for our contracts using typechain directly! 🎉

> For more information about `typechain-polkadot` you can check [typechain-polkadot documentation](../packages/typechain-polkadot/README.md)
