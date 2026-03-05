# Quick Start Guide

Get your donation platform running in 5 minutes!

## 🚀 Fast Track Deployment

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Get Base Sepolia ETH (2 min)

Visit: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

### 3. Configure Environment (1 min)

Create `.env.local`:

```bash
# Get your private key from MetaMask (Account Details → Show Private Key)
PRIVATE_KEY=your_private_key_here

# These are pre-configured
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

### 4. Deploy Contract (1 min)

```bash
npm run deploy
```

Copy the contract address from output and add to `.env.local`:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
```

### 5. Run Locally

```bash
npm run dev
```

Visit: http://localhost:3000

## 🌐 Deploy to Vercel (Optional)

### Quick Deploy

1. Push to GitHub (already done!)
2. Go to https://vercel.com/new
3. Import: `https://github.com/chptt/donation_base`
4. Add environment variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Your contract address
   - `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID`: `84532`
5. Click Deploy!

## 📋 Commands Cheat Sheet

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Smart Contract
npm run compile      # Compile contracts
npm run deploy       # Deploy to Base Sepolia
npm run verify       # Verify on Basescan
```

## ✅ Verification Checklist

After deployment, test:

- [ ] Connect MetaMask to Base Sepolia
- [ ] Create a campaign
- [ ] Make a donation ($10 worth of ETH)
- [ ] View campaign details
- [ ] Withdraw funds (as creator)
- [ ] Check dashboard
- [ ] View contributions

## 🆘 Quick Troubleshooting

**Problem**: "insufficient funds"
**Fix**: Get more Base Sepolia ETH from faucet

**Problem**: "wrong network"
**Fix**: Switch MetaMask to Base Sepolia (Chain ID: 84532)

**Problem**: "contract not found"
**Fix**: Check `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`

## 📚 Full Documentation

- **Detailed Deployment**: See `HARDHAT_DEPLOYMENT.md`
- **Migration Guide**: See `BASE_SEPOLIA_MIGRATION.md`
- **Network Config**: See `NETWORK_CONFIG.md`
- **Project Overview**: See `README.md`

## 🎯 What's Next?

1. Verify your contract on Basescan
2. Deploy to Vercel for public access
3. Share with users
4. Gather feedback
5. Consider mainnet deployment

---

Need help? Check the full guides or open an issue on GitHub!
