// psp22/lib.rs
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
            return Err(PSP22Error::Custom(String::from("I hate this account!")));
        }
        pendzl::contracts::psp22::PSP22InternalDefaultImpl::_update_default_impl(
            self, from, to, amount,
        )?;
        // }
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
