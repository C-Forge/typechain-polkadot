# Examples

This directory contains examples of parsed contracts and pieces of advice how to use the typechain-polkadot in your project.

### General usage

- Create a new project with `pnpm init`
- Create a new directory for your contracts' abi's (for example /artifacts)
- Add to your package.json file the following and install it with `pnpm i`:

```json
"dependencies": {
	"@c-forge/typechain-polkadot": "0.2.2",
	"@c-forge/typechain-types": "0.2.2",
	"@types/node": "^17.0.34",
	"typescript": "^4.6.4",
	"@polkadot/api": "10.9.1",
	"@polkadot/api-contract": "10.9.1",
	"@types/bn.js": "^5.1.0"
}
```

- Run typechain with

```bash
npx @c-forge/typechain-polkadot --in path/to/artifacts --out path/to/output
```

> Note: you should move metadata.json to artifacts directory and rename it to <contract-name>.json, also if you want to deploy the contract you should also move <contract-name>.contract to artifacts directory from your target dir
