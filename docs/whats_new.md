# Introducing the Latest Enhancements to Typechain-Polkadot

Typechain-Polkadot has been a cornerstone tool for developers working with Polkadot smart contracts, bridging the gap between Rust-based ink! smart contracts and TypeScript applications. We are excited to announce a series of significant enhancements that not only improve the developer experience but also extend the functionality and reliability of the tool. This article delves into the latest updates, detailing how they simplify development workflows and enhance performance.

## Table of Contents

1. [Removed ReturnNumber](#1-removed-returnnumber)
2. [Updated to ink! 5](#2-updated-to-ink-5)
3. [Simplified & Enhanced Deployment Classes](#3-simplified--enhanced-deployment-classes)
4. [Improved Typechain-Compiler](#4-improved-typechain-compiler)
5. [Enhanced Result/Error Handling](#5-enhanced-resulterror-handling)
6. [Generated Enums for Events](#6-generated-enums-for-events)
7. [Resolved Other Bugs & Issues](#7-resolved-other-bugs--issues)
8. [Docker Build Integration](#8-docker-build-integration)
9. [Included Comments in the Generated API](#9-included-comments-in-the-generated-api)

---

## 1. Removed ReturnNumber

### Simplifying Number Handling with BN.js

One of the significant pain points in previous versions of Typechain-Polkadot was the use of the `ReturnNumber` wrapper class. While designed to handle numerical returns from smart contract calls, it introduced unnecessary complexity, runtime bugs, and led to false assumptions about the data being handled. Recognizing this, we have removed `ReturnNumber` and replaced it with `BN`.

### Benefits

- **Improved Code Readability**: Developers no longer need to unwrap numbers from a custom class. Using `BN` simplifies the handling of large numbers and aligns with standard practices.
- **Reduced Bugs**: Eliminating `ReturnNumber` removes a layer where bugs could (and used to) occur, leading to more stable and predictable code.
- **Consistency**: Using the same class as polkadot.js across all cases of using numbers, ensures consistency across different parts of your application.

### Example

Before:

```typescript
const result: ReturnNumber = await contract.query.getBalance(account);
const balance = result.toNumber();
```

After:

```typescript
const result: BN = await contract.query.getBalance(account);
const balance = result.toNumber();
```

### Migration Guide

For projects migrating from an older version of Typechain-Polkadot, replace instances of `ReturnNumber` with `BN`. Since `BN` provides similar methods for number conversion, the transition should be straightforward.

---

## 2. Updated to ink! 5

### Embracing the Latest ink! Version

With the release of ink! 5, the smart contract language for Substrate and Polkadot ecosystems has brought in numerous improvements and changes, particularly in how events are handled in the ABI (Application Binary Interface). Typechain-Polkadot has been updated to be fully compatible with ink! 5, ensuring that developers can leverage the latest features without any hitches.

### Backward Compatibility

Understanding that the adoption of ink! 5 might be gradual, we've ensured that Typechain-Polkadot maintains compatibility with previous versions of ink!. This means you can continue to work with your existing contracts while planning or gradually migrating to ink! 5.

### Key Improvements

- **Event Handling**: Proper parsing and generation of event interfaces from the ABI, reflecting the changes introduced in ink! 5.
- **Enhanced Metadata Support**: Improved support for the updated metadata format, ensuring accurate code generation.

---

## 3. Simplified & Enhanced Deployment Classes

### Redesigned for Intuitiveness and Safety

Deploying contracts should be a seamless experience. In previous iterations, developers faced challenges due to issues with ABI handling and the complexity of deployment classes. We've overhauled the code generation for deployment classes, making them more intuitive and runtime-safe.

### Introducing `deployCode` Method

Beyond just deploying contracts via constructors, we've added the `deployCode` method. This allows you to upload the contract's code to the blockchain without instantiating it immediately, giving you greater flexibility and control over the deployment process.

### Benefits

- **Flexibility**: Choose between deploying code only or deploying and instantiating in one step.
- **Control**: Manage the lifecycle of your contracts more granularly.
- **Intuitive API**: Simplified method names and clearer parameters make the deployment process more straightforward.

### Example Usage

````typescript
const myContractDeployer = new MyContractDeployer(api, signer);
const deployResult = await myContractDeployer.deployCode();

// You can now instantiate the contract at a later time or manage the code hash directly
console.log('Code Hash:', deployResult.codeHash);

## 4. Improved Typechain-Compiler

### Reliability Out of the Box

The `typechain-compiler` is an essential tool that automates the compilation of smart contracts and the generation of TypeScript definitions and runtime code. We've focused on ensuring it works reliably for both workspace and non-workspace projects.

### Key Enhancements

- **Correct Rust Version Inference**: The compiler now accurately infers the Rust version from `rust-toolchain.toml` files, ensuring compatibility and preventing version mismatch errors.
- **Improved Logging**: Enhanced logging provides better visibility into the compilation process, making it easier to diagnose issues.
- **Stable Artifact Handling**: Optimizations in how artifacts are managed prevent errors, especially in larger projects with big contracts.

### Usage

The usage remains straightforward:

```bash
npx @c-forge/typechain-compiler --config path/to/config.json
````

### Sample Configuration

```json
{
  "projectFiles": ["./contracts/**"],
  "artifactsPath": "./artifacts",
  "typechainGeneratedPath": "./typechain-generated",
  "lint": true,
  "contractsRoot": "./contracts",
  "verifiable": false
}
```

### Workspace Support

Whether your project uses Cargo workspaces or standalone contracts, `typechain-compiler` now handles both scenarios gracefully.

---

## 5. Enhanced Result/Error Handling

### Intuitive Error Messages

Handling errors effectively is crucial for a smooth development experience. Previously, transaction errors often resulted in ambiguous messages like `error: { message: 'Module' }`, leaving developers puzzled. We've overhauled the error handling to decode and present detailed error messages.

### Benefits

- **Clarity**: Understand exactly what went wrong without digging into obscure error structures.
- **Efficiency**: Faster debugging and issue resolution.
- **User-Friendly**: Error messages are now presented in a developer-friendly format.

### Example

```typescript
try {
  await myContract.withSigner(nobody()).tx.someTx();
} catch (error) {
  console.log(error.message); // e.error.message: contracts.ContractNotFound(No contract was found at the specified address.)
}
```

### Improved Result Handling

We've fixed some bugs related to result handling. Now, you can expect more consistent and reliable behavior when working with contract query call results that return `Result` types.

---

## 6. Generated Enums for Events

### Streamlining Event Handling

Working with smart contract events in TypeScript can be challenging without proper typing and structure. To address this, we've introduced generated enums for events, making it easier to work with event listeners and handlers.

### Benefits

- **Strong Typing**: Enums provide a set of predefined constants, reducing errors due to typos or incorrect event names.
- **Improved Intellisense**: Enhanced editor support with autocompletion and type checking.
- **Unified Event Access**: A single place to access all events from all contracts simplifies cross-contract event handling.

### Example

```typescript
export enum MyPsp34EventsEvent {
  Transfer = 'Transfer',
}

export enum MyPsp34EventsInk5Event {
  Transfer = 'Transfer',
  Approval = 'Approval',
}

export type AnyContractEvent = MyPsp34EventsEvent | MyPsp34EventsInk5Event;

export const ContractsEvents = {
  MyPsp34EventsEvent,
  MyPsp34EventsInk5Event,
};
```

### Usage Example

```typescript
contract.events.subscribe((event) => {
  switch (event.name) {
    case MyPsp34EventsEvent.Transfer:
      // Handle transfer event
      break;
    case MyPsp34EventsEvent.Approval:
      // Handle approval event
      break;
    default:
      console.warn('Unknown event:', event);
  }
});
```

---

## 7. Resolved Other Bugs & Issues

Beyond the headline features, we've dedicated effort to resolving various bugs and issues reported by the community and encountered during development. This includes addressing all feature related open issues in the [Typechain-Polkadot issue tracker](https://github.com/Brushfam/typechain-polkadot/issues).

## 8. Docker Build Integration

### Simplifying Builds with Docker

Setting up a consistent build environment can be a challenge, especially when dealing with different versions of dependencies or operating systems. We've integrated Docker build support into Typechain, allowing developers to perform verifiable builds using typechain-compiler.

### Benefits

- **Environment Consistency**: Docker ensures that your build environment is the same every time resulting in the same code hash for the same code on every machine.
- **Verifiable Builds**: Produce builds that can be independently verified, increasing trust and security.
- **Ease of Use**: Simply pass a flag, and the tooling handles the rest.

### How to Use

Add the `--verifiable` flag when running `typechain-compiler`:

```bash
npx @c-forge/typechain-compiler --config path/to/config.json --verifiable
```

### Requirements

- **Docker Installed**: Ensure that Docker is installed and running on your machine.

Note: The Docker image version is determined by `cargo contract`.

## 9. Included Comments in the Generated API

### Enhancing Documentation and Readability

Good documentation is vital for maintaining and scaling projects. Previously, method comments from the contract's metadata were not included in the generated TypeScript code, leading to a lack of context when working with contract interfaces. We've rectified this by ensuring that comments present in the `docs` field of the metadata are now included in the autogenerated code.

### Benefits

- **Better Documentation**: Developers have immediate access to method descriptions and usage notes directly in their code editors.
- **Improved Readability**: Comments provide context, making it easier to understand what each method does without referring back to the original Rust code.
- **Developer Efficiency**: Faster onboarding for new team members and reduced time spent searching for documentation.

### Example

Given a smart contract method with documentation:

```rust
/// Transfers tokens from the caller to the specified address.
#[ink(message)]
pub fn transfer(&mut self, to: AccountId, amount: Balance) -> Result<(), PSP22Error> {
    // method implementation
}
```

The generated TypeScript code will include these comments:

```typescript
/**
 * transfer
 * Transfers tokens from the caller to the specified address.
 *
 * @param { ArgumentTypes.AccountId } to,
 * @param { (string | number | BN) } value,
 * @param { Array<(number | string | BN)> } data,
 * @returns { void }
*/
transfer(to: ArgumentTypes.AccountId, value: string | number | BN, data: Array<number | string | BN>, __options: ContractOptions) {
```

### Editor Experience

With the comments included, developers benefit from enhanced Intellisense support:

- **Hover Tooltips**: See method documentation when hovering over method names.
- **Parameter Hints**: Get descriptions of what each parameter represents.
- **Autocomplete Suggestions**: Improved suggestions with context.

---

## Conclusion

The latest enhancements to Typechain-Polkadot represent a significant step forward in improving the developer experience when working with Polkadot smart contracts. From simplifying number handling and deployment processes to enhancing error messages and documentation, these updates aim to make your development workflow smoother and more efficient.

We encourage you to update to the latest version and take advantage of these improvements. We welcome feedback and contributions from the community to continue refining and enhancing Typechain-Polkadot.

---

## Getting Started with the New Version

To start using the latest version with all these enhancements:

1. **Update Typechain-Polkadot**: Ensure you have the latest version installed.

   ```bash
   pnpm install @c-forge/typechain-polkadot@latest
   pnpm install @c-forge/typechain-compiler@latest
   pnpm install @c-forge/typechain-types@latest
   ```

2. **Review Breaking Changes**: If you're upgrading from an older version, review the migration guides and adjust your code accordingly.

3. **Leverage New Features**: Update your deployment scripts to use the new `deployCode` method, handle errors using the improved messages, and enjoy better event handling with generated enums.
