# Plugins in typechain-polkadot

## About

Typechain-polkadot supports plugin system, that allows you to extend the functionality of typechain-polkadot.

## How to create a plugin

To create a plugin you need to create a class that implements `TypechainPlugin`.

```typescript
export abstract class TypechainPlugin {
  abstract generate: (abi: Abi, fileName: string, absPathToABIs: string, absPathToOutput: string) => void;
  beforeAll?: (absPathToABIs: string, absPathToOutput: string) => void;
  afterAll?: (absPathToABIs: string, absPathToOutput: string) => void;
}
```

Where:
`generate` - function that will be called for each contract
`beforeAll` - function that will be called before all of the plugins
`afterAll` - function that will be called after all of the plugins

## How to use a plugin
