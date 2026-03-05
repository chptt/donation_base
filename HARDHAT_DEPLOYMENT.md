# Hardhat Deployment Guide

Complete guide for deploying your DonationPlatform smart contract using Hardhat and deploying the frontend to Vercel.

## Prerequisites

- Node.js 18+ installed
- MetaMask wallet with Base Sepolia ETH
- Basescan API key (optional, for verification)

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Hardhat (smart contract development framework)
- Hardhat Toolbox (verification, testing tools)
- All frontend dependencies

## Step 2: Get Base Sepolia ETH

You need Base Sepolia ETH to deploy the contract. Get it from:

1. **Coinbase Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
2. **Superchain Faucet**: https://app.optimism.io/faucet
3. **Bridge from Sepolia**: https://bridge.base.org/

## Step 3: Configure Environment Variables

### Get Your Private Key from MetaMask

⚠️ **SECURITY WARNING**: Never share your private key or commit it to GitHub!

1. Open MetaMask
2. Click the three dots → Account Details
3. Click "Show Private Key"
4. Enter your password
5. Copy the private key

### Get Basescan API Key (Optional but Recommended)

1. Go to https://basescan.org/
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key

### Update .env.local

Create or update `.env.local` with:

```bash
# Frontend Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=will_be_filled_after_deployment
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532

# Deployment Configuration
PRIVATE_KEY=your_metamask_private_key_here
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key_here
```

## Step 4: Compile the Contract

```bash
npm run compile
```

This compiles your Solidity contract and generates artifacts.

## Step 5: Deploy to Base Sepolia

```bash
npm run deploy
```

This will:
1. Deploy the DonationPlatform contract to Base Sepolia
2. Display the contract address
3. Test the price feed functionality
4. Show next steps

**Expected Output:**
```
Deploying DonationPlatform to Base Sepolia...
Deployment in progress...

✅ DonationPlatform deployed successfully!
📍 Contract Address: 0x1234567890abcdef...

📝 Next steps:
1. Update .env.local with:
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef...

2. Verify contract on Basescan:
   npx hardhat verify --network baseSepolia 0x1234567890abcdef...

3. View on Basescan:
   https://sepolia.basescan.org/address/0x1234567890abcdef...

🧪 Testing contract functions...
✅ Price feed working! ETH/USD: 3000.00
✅ Required ETH for $10 donation: 0.0033 ETH
```

## Step 6: Update Environment Variables

Copy the contract address from the deployment output and update `.env.local`:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

## Step 7: Verify Contract on Basescan (Recommended)

Verification makes your contract source code public and verifiable:

```bash
npx hardhat verify --network baseSepolia YOUR_CONTRACT_ADDRESS
```

Or use the verify script:

```bash
npm run verify YOUR_CONTRACT_ADDRESS
```

**Benefits of Verification:**
- Users can read your contract code
- Better trust and transparency
- Easier debugging
- Basescan shows function names and parameters

## Step 8: Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and test:
- Connect wallet to Base Sepolia
- Create a campaign
- Make a donation
- Withdraw funds

## Step 9: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository: `https://github.com/chptt/donation_base`
5. Configure environment variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Your deployed contract address
   - `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID`: `84532`
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and set environment variables when asked
```

### Environment Variables for Vercel

In Vercel dashboard, add these environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Your deployed contract address |
| `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID` | `84532` |

⚠️ **Important**: Do NOT add `PRIVATE_KEY` or `BASESCAN_API_KEY` to Vercel. These are only for local deployment.

## Step 10: Verify Deployment

After Vercel deployment:

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Connect MetaMask to Base Sepolia
3. Test all features:
   - Create campaign
   - Donate
   - Withdraw
   - View dashboard

## Project Structure

```
donation-platform/
├── contracts/
│   └── DonationPlatform.sol      # Smart contract
├── scripts/
│   ├── deploy.js                 # Deployment script
│   └── verify.js                 # Verification script
├── app/                          # Next.js frontend
├── components/                   # React components
├── contexts/                     # React contexts
├── hardhat.config.js            # Hardhat configuration
├── .env.local                   # Environment variables (local)
└── package.json                 # Dependencies and scripts
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run compile` | Compile smart contracts |
| `npm run deploy` | Deploy to Base Sepolia |
| `npm run verify` | Verify contract on Basescan |

## Troubleshooting

### Error: "insufficient funds for intrinsic transaction cost"

**Solution**: You need more Base Sepolia ETH. Get from faucets listed in Step 2.

### Error: "invalid private key"

**Solution**: 
- Check your private key in `.env.local`
- Make sure it starts with `0x`
- Don't include spaces or quotes

### Error: "network does not support ENS"

**Solution**: This is a warning, not an error. Deployment should still work.

### Contract Verification Fails

**Solution**:
- Wait a few minutes after deployment
- Make sure you have a Basescan API key
- Try manual verification on Basescan website

### Vercel Build Fails

**Solution**:
- Make sure environment variables are set in Vercel dashboard
- Check build logs for specific errors
- Ensure `npm run build` works locally

### MetaMask Shows Wrong Network

**Solution**:
- Manually switch to Base Sepolia in MetaMask
- Clear browser cache
- Disconnect and reconnect wallet

## Security Best Practices

### For Development

✅ **DO:**
- Use `.env.local` for sensitive data
- Add `.env.local` to `.gitignore`
- Use separate wallets for testnet and mainnet
- Keep private keys secure

❌ **DON'T:**
- Commit private keys to GitHub
- Share your `.env.local` file
- Use mainnet private keys on testnet
- Deploy with unverified contracts

### For Production

When deploying to mainnet:
1. Audit your smart contract
2. Use a hardware wallet
3. Test thoroughly on testnet first
4. Consider multi-sig wallets
5. Set up monitoring and alerts

## Cost Estimates

### Deployment Costs (Base Sepolia)
- Contract Deployment: ~0.001-0.003 ETH (testnet)
- Contract Verification: Free

### Transaction Costs (Base Sepolia)
- Create Campaign: ~0.0001-0.0003 ETH
- Donate: ~0.00005-0.0001 ETH
- Withdraw: ~0.00005-0.0001 ETH

### Vercel Hosting
- Free tier: Unlimited deployments
- Pro tier: $20/month (optional)

## Next Steps After Deployment

1. ✅ Share your Vercel URL with users
2. ✅ Monitor contract on Basescan
3. ✅ Test all features thoroughly
4. ✅ Gather user feedback
5. ✅ Consider mainnet deployment

## Resources

### Documentation
- [Hardhat Docs](https://hardhat.org/docs)
- [Base Docs](https://docs.base.org/)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

### Tools
- [Base Sepolia Basescan](https://sepolia.basescan.org/)
- [Hardhat](https://hardhat.org/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MetaMask](https://metamask.io/)

### Community
- [Base Discord](https://discord.gg/buildonbase)
- [Hardhat Discord](https://discord.gg/hardhat)
- [Vercel Discord](https://discord.gg/vercel)

## Support

Need help? Check:
1. This deployment guide
2. Project README.md
3. BASE_SEPOLIA_MIGRATION.md
4. GitHub Issues
5. Base Discord community

---

**Deployment Checklist:**

- [ ] Install dependencies (`npm install`)
- [ ] Get Base Sepolia ETH
- [ ] Configure `.env.local` with private key
- [ ] Compile contract (`npm run compile`)
- [ ] Deploy contract (`npm run deploy`)
- [ ] Update contract address in `.env.local`
- [ ] Verify contract on Basescan
- [ ] Test locally (`npm run dev`)
- [ ] Deploy to Vercel
- [ ] Set environment variables in Vercel
- [ ] Test production deployment
- [ ] Share with users!

Good luck with your deployment! 🚀
