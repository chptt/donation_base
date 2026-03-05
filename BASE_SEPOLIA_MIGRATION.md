# Migration Guide: Ethereum Sepolia to Base Sepolia

This guide covers the migration of the Donation Platform from Ethereum Sepolia to Base Sepolia testnet.

## What Changed

### Network Configuration
- **Chain ID**: Changed from `11155111` (Ethereum Sepolia) to `84532` (Base Sepolia)
- **RPC URL**: Changed from `https://sepolia.infura.io/v3/` to `https://sepolia.base.org`
- **Block Explorer**: Changed from `https://sepolia.etherscan.io/` to `https://sepolia.basescan.org`

### Chainlink Price Feed
- **Old Address** (Ethereum Sepolia): `0x694AA1769357215DE4FAC081bf1f309aDC325306`
- **New Address** (Base Sepolia): `0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1`

### Environment Variables
- Renamed `NEXT_PUBLIC_SEPOLIA_CHAIN_ID` to `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID`
- Value changed from `11155111` to `84532`

## Migration Steps

### 1. Update Environment Variables

Update your `.env.local` file:

```bash
# Old
NEXT_PUBLIC_SEPOLIA_CHAIN_ID=11155111

# New
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532
```

### 2. Get Base Sepolia ETH

You'll need Base Sepolia ETH for deployment and testing:

**Option A: Bridge from Ethereum Sepolia**
1. Go to [Base Bridge](https://bridge.base.org/)
2. Connect your wallet
3. Switch to Sepolia testnet
4. Bridge ETH to Base Sepolia

**Option B: Use Coinbase Faucet**
1. Visit [Coinbase Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Connect your wallet
3. Request Base Sepolia ETH

**Option C: Use Superchain Faucet**
1. Visit [Superchain Faucet](https://app.optimism.io/faucet)
2. Select Base Sepolia
3. Request testnet ETH

### 3. Add Base Sepolia to MetaMask

If MetaMask doesn't automatically add Base Sepolia, add it manually:

1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Enter the following details:
   - **Network Name**: Base Sepolia
   - **RPC URL**: `https://sepolia.base.org`
   - **Chain ID**: `84532`
   - **Currency Symbol**: ETH
   - **Block Explorer**: `https://sepolia.basescan.org`

### 4. Redeploy Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Load `contracts/DonationPlatform.sol`
3. Compile with Solidity ^0.8.20
4. Switch MetaMask to Base Sepolia network
5. Deploy contract using "Injected Provider - MetaMask"
6. Copy the new contract address
7. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`

### 5. Verify Contract on Basescan

1. Go to [Base Sepolia Basescan](https://sepolia.basescan.org/)
2. Search for your contract address
3. Click "Contract" → "Verify and Publish"
4. Follow verification steps

### 6. Test the Application

```bash
npm install
npm run dev
```

Test all functionality:
- Connect wallet to Base Sepolia
- Create a campaign
- Make a donation
- Withdraw funds
- Check price feed updates

## Why Base Sepolia?

### Advantages of Base

1. **Lower Gas Fees**: Base typically has lower transaction costs than Ethereum
2. **Faster Transactions**: Faster block times and confirmation
3. **Coinbase Integration**: Better integration with Coinbase ecosystem
4. **Growing Ecosystem**: Active development and growing DeFi ecosystem
5. **EVM Compatible**: Full Ethereum compatibility, easy migration

### Base Network Features

- **Layer 2 Solution**: Built on Optimism's OP Stack
- **Backed by Coinbase**: Strong institutional support
- **Ethereum Security**: Inherits Ethereum's security
- **Low Fees**: Significantly cheaper than Ethereum mainnet

## Troubleshooting

### MetaMask Won't Switch Networks

If MetaMask doesn't automatically switch to Base Sepolia:
1. Manually add Base Sepolia network (see step 3 above)
2. Switch to Base Sepolia in MetaMask
3. Refresh the application

### Can't Get Base Sepolia ETH

If faucets aren't working:
1. Try multiple faucets (listed in step 2)
2. Bridge from Ethereum Sepolia if you have ETH there
3. Check faucet rate limits (usually 24 hours)
4. Join Base Discord for faucet assistance

### Price Feed Not Working

If the Chainlink price feed returns errors:
1. Verify the price feed address: `0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1`
2. Check Base Sepolia network status
3. Ensure contract is deployed correctly
4. Test price feed directly in Remix

### Transactions Failing

If transactions fail on Base Sepolia:
1. Check you have sufficient Base Sepolia ETH
2. Verify contract address is correct
3. Ensure MetaMask is on Base Sepolia network
4. Try increasing gas limit

## Key Differences from Ethereum Sepolia

### Transaction Speed
- **Ethereum Sepolia**: ~12-15 seconds per block
- **Base Sepolia**: ~2 seconds per block

### Gas Costs
- **Base Sepolia**: Typically 10-100x cheaper than Ethereum

### Block Explorer
- Use [Basescan](https://sepolia.basescan.org/) instead of Etherscan
- Same interface and features

### Faucets
- Different faucet ecosystem
- May need to bridge from Ethereum Sepolia

## Resources

### Official Documentation
- [Base Documentation](https://docs.base.org/)
- [Base Sepolia Network Details](https://docs.base.org/network-information)
- [Chainlink Base Price Feeds](https://docs.chain.link/data-feeds/price-feeds/addresses?network=base&page=1)

### Tools and Services
- [Base Bridge](https://bridge.base.org/)
- [Base Sepolia Basescan](https://sepolia.basescan.org/)
- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Remix IDE](https://remix.ethereum.org/)

### Community
- [Base Discord](https://discord.gg/buildonbase)
- [Base Twitter](https://twitter.com/base)
- [Base GitHub](https://github.com/base-org)

## Rollback Instructions

If you need to rollback to Ethereum Sepolia:

1. Revert environment variables:
   ```bash
   NEXT_PUBLIC_SEPOLIA_CHAIN_ID=11155111
   ```

2. Update smart contract price feed address:
   ```solidity
   priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
   ```

3. Update WalletContext.tsx network configuration back to Ethereum Sepolia

4. Redeploy contract on Ethereum Sepolia

## Next Steps

After successful migration:

1. Update all documentation references
2. Notify users of network change
3. Update any external integrations
4. Monitor contract performance on Base Sepolia
5. Consider mainnet deployment on Base when ready

## Support

For migration issues:
- Check this guide first
- Review Base documentation
- Join Base Discord for community support
- Create GitHub issue for project-specific problems
