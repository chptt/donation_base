# Base Sepolia Network Configuration

Quick reference for Base Sepolia testnet configuration.

## Network Details

| Parameter | Value |
|-----------|-------|
| Network Name | Base Sepolia |
| Chain ID | 84532 (0x14A34 in hex) |
| Currency | ETH |
| RPC URL | https://sepolia.base.org |
| WebSocket | wss://sepolia.base.org |
| Block Explorer | https://sepolia.basescan.org |

## Contract Addresses

### Chainlink Price Feeds

| Pair | Address |
|------|---------|
| ETH/USD | 0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1 |

### Your Deployed Contracts

| Contract | Address | Status |
|----------|---------|--------|
| DonationPlatform | Update after deployment | Pending |

## Environment Variables

```bash
# Base Sepolia Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532
```

## MetaMask Configuration

### Manual Network Addition

```javascript
{
  chainId: '0x14A34',
  chainName: 'Base Sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org']
}
```

## Faucets

Get Base Sepolia ETH from:

1. **Coinbase Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
2. **Superchain Faucet**: https://app.optimism.io/faucet
3. **Bridge from Sepolia**: https://bridge.base.org/

## Useful Links

- **Base Docs**: https://docs.base.org/
- **Basescan**: https://sepolia.basescan.org/
- **Base Bridge**: https://bridge.base.org/
- **Chainlink Docs**: https://docs.chain.link/data-feeds/price-feeds/addresses?network=base
- **Base Status**: https://status.base.org/

## Gas Configuration

Base Sepolia typically uses:
- **Gas Limit**: 21000 (transfers) to 500000 (complex contracts)
- **Gas Price**: Dynamic, usually very low
- **Priority Fee**: Optional, usually not needed on testnet

## Block Information

- **Block Time**: ~2 seconds
- **Finality**: ~12 seconds (soft) / ~10 minutes (hard)
- **Max Block Size**: 30M gas

## API Endpoints

### JSON-RPC
```
https://sepolia.base.org
```

### WebSocket
```
wss://sepolia.base.org
```

### Basescan API
```
https://api-sepolia.basescan.org/api
```

## Smart Contract Verification

When verifying on Basescan:
- **Compiler**: Solidity 0.8.20
- **Optimization**: Enabled (200 runs)
- **License**: MIT
- **EVM Version**: Paris

## Common Chain IDs Reference

| Network | Chain ID |
|---------|----------|
| Ethereum Mainnet | 1 |
| Ethereum Sepolia | 11155111 |
| Base Mainnet | 8453 |
| Base Sepolia | 84532 |
| Optimism Mainnet | 10 |
| Arbitrum Mainnet | 42161 |

## Migration Checklist

- [ ] Update environment variables
- [ ] Get Base Sepolia ETH
- [ ] Add Base Sepolia to MetaMask
- [ ] Deploy contract to Base Sepolia
- [ ] Verify contract on Basescan
- [ ] Update frontend configuration
- [ ] Test all functionality
- [ ] Update documentation

## Support Resources

- **Base Discord**: https://discord.gg/buildonbase
- **Base Twitter**: https://twitter.com/base
- **Base GitHub**: https://github.com/base-org
- **Developer Docs**: https://docs.base.org/
