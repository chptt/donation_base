# Donation Platform

A decentralized donation platform built with Next.js 14 and Solidity, featuring NFT-based campaigns with Chainlink price feeds.

## Features

- NFT-based fundraising campaigns
- USD-stabilized donations using Chainlink price feeds
- Multiple campaign types: Housing, Meals, Medical, Education, Equipment, River Cleaning
- Real-time ETH/USD conversion
- MetaMask integration

## Tech Stack

- Next.js 14 with TypeScript
- Solidity ^0.8.20
- OpenZeppelin contracts
- Chainlink Price Feeds
- Base Sepolia Testnet
- Tailwind CSS
- ethers.js v6

## Setup

```bash
npm install
```

Configure `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532
```

Run development server:
```bash
npm run dev
```└── package.json                 # Dependencies and scripts
```

## Smart Contract Functions

### Core Functions
- `mintMyNFT()` - Create a new fundraising campaign
- `donate()` - Donate $10 worth of ETH to a campaign
- `withdraw()` - Withdraw raised funds (campaign creator only)
- `getCampaignsByCreator()` - Get all campaigns by a specific creator
- `viewRequiredETH()` - Get current ETH amount for $10 donation
- `getLatestPrice()` - Get current ETH/USD price from Chainlink

## Deployment

Deploy the smart contract using Remix IDE:
1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create `DonationPlatform.sol` and paste contract code
3. Compile with Solidity ^0.8.20
4. Deploy to Base Sepolia using MetaMask
5. Copy contract address to `.env.local`

## License

MIT   - Deploy contract
6. Copy deployed contract address to `.env.local`

#### Contract Verification (Optional)
1. Go to [Base Sepolia Basescan](https://sepolia.basescan.org/)
2. Find your contract and click "Verify and Publish"
3. Upload source code and verify

### 4. Frontend Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Production Deployment

#### Deploy to Vercel
```bash
npm run build
# Deploy to Vercel or your preferred platform
```

Set environment variables in your deployment platform:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID`

## Usage Guide

### For Campaign Creators
1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Create Campaign**: 
   - Go to "Create Campaign"
   - Select charity type
   - Set goal amount in USD
   - Add campaign name and image
   - Submit transaction
3. **Manage Campaigns**: 
   - View dashboard for campaign statistics
   - Withdraw funds when ready
   - Track donation progress

### For Donors
1. **Connect Wallet**: Connect MetaMask to Base Sepolia testnet
2. **Browse Campaigns**: View active campaigns on home page
3. **Donate**: 
   - Click on campaign to view details
   - Click "Donate $10" button
   - Confirm transaction in MetaMask
4. **Track Contributions**: View donation history in "My Contributions"

## Key Features Explained

### USD-Stabilized Donations
- All donations are fixed at $10 USD
- Chainlink price feed converts USD to current ETH amount
- Price updates every 30 seconds for accuracy
- Protects against ETH price volatility

### NFT Campaign System
- Each campaign is an ERC721 NFT owned by creator
- Allows multiple campaigns per wallet (uses `_mint` not `_safeMint`)
- NFT ownership enables withdrawal permissions
- Transparent on-chain campaign data

### Security Features
- ReentrancyGuard prevents reentrancy attacks
- Ownable contract for admin functions
- Input validation and error handling
- Safe withdrawal patterns

## Chainlink Integration

The contract uses Chainlink's ETH/USD price feed on Base Sepolia:
- **Address**: `0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1`
- **Decimals**: 8
- **Update Frequency**: ~1 minute
- **Deviation Threshold**: 0.5%

## Testing

### Local Testing
```bash
npm run dev
```

### Contract Testing
1. Deploy to Base Sepolia testnet
2. Test all functions through frontend
3. Verify transactions on Base Sepolia Basescan

### Test Scenarios
- Create campaigns with different charity types
- Make donations and verify ETH conversion
- Withdraw funds and check balances
- Test wallet connection/disconnection
- Verify price feed updates

## Troubleshooting

### Common Issues

**MetaMask Connection Issues**
- Ensure MetaMask is installed and unlocked
- Switch to Base Sepolia testnet
- Check if site is connected in MetaMask

**Transaction Failures**
- Ensure sufficient Base Sepolia ETH for gas
- Check contract address in environment variables
- Verify network is Base Sepolia (Chain ID: 84532)

**Price Feed Issues**
- Chainlink price feeds may have delays
- Check Base Sepolia network status
- Verify price feed contract address

**Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review documentation and code comments

## Roadmap

- [ ] Multi-token support (USDC, DAI)
- [ ] Campaign categories and filtering
- [ ] Social sharing features
- [ ] Mobile app development
- [ ] Mainnet deployment
- [ ] Advanced analytics dashboard