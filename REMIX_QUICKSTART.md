# Remix Quick Start - 5 Minutes ⚡

Deploy your contract to Base Sepolia using Remix in 5 easy steps!

## ✅ Before You Start

- [ ] MetaMask installed
- [ ] Base Sepolia added to MetaMask
- [ ] Base Sepolia ETH in wallet

**Need Base Sepolia ETH?** Get from: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

**Need to add Base Sepolia?** Visit: https://chainlist.org/?search=base+sepolia&testnets=true

---

## 🚀 5-Step Deployment

### Step 1: Open Remix (30 seconds)

Go to: **https://remix.ethereum.org/**

### Step 2: Create & Paste Contract (1 minute)

1. Click "Create New File" 📄
2. Name it: `DonationPlatform.sol`
3. Open `contracts/DonationPlatform.sol` from your project
4. Copy ALL the code
5. Paste into Remix

### Step 3: Compile (30 seconds)

1. Click "Solidity Compiler" icon 📝 (left sidebar)
2. Select version: **0.8.20**
3. Click "Compile DonationPlatform.sol"
4. Wait for ✅ green checkmark

### Step 4: Deploy (2 minutes)

1. Click "Deploy & Run" icon 🚀 (left sidebar)
2. Environment: Select **"Injected Provider - MetaMask"**
3. MetaMask pops up → Click "Connect"
4. **IMPORTANT**: Switch MetaMask to **Base Sepolia** network
5. Contract: Select **"DonationPlatform"**
6. Click orange **"Deploy"** button
7. MetaMask pops up → Click "Confirm"
8. Wait 10-30 seconds ⏳

### Step 5: Copy Contract Address (30 seconds)

1. Look at bottom of Remix (console area)
2. Find "Deployed Contracts" section
3. Click to expand your contract
4. Copy the address (starts with 0x...)

**Example**: `0x1234567890abcdef1234567890abcdef12345678`

---

## 📝 Update Your Project

Open `.env.local` and update:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressFromRemix
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532
```

---

## 🧪 Test Locally

```bash
npm run dev
```

Open: http://localhost:3000

Test:
- Connect wallet
- Create campaign
- Donate
- Withdraw

---

## 🌐 Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import: `github.com/chptt/donation_base`
3. Add environment variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Your address from Remix
   - `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID`: `84532`
4. Click "Deploy"

---

## ✅ Checklist

- [ ] Contract deployed via Remix
- [ ] Contract address copied
- [ ] `.env.local` updated
- [ ] Tested locally (`npm run dev`)
- [ ] Deployed to Vercel
- [ ] Tested on production

---

## 🆘 Quick Fixes

**"Wrong network"**
→ Switch MetaMask to Base Sepolia

**"Insufficient funds"**
→ Get more Base Sepolia ETH from faucet

**"Transaction failed"**
→ Increase gas limit or try again

**"Contract not found"**
→ Check contract address in `.env.local`

---

## 📚 Full Guide

Need more details? See: **REMIX_DEPLOYMENT.md**

---

**Total Time**: ~5 minutes
**Difficulty**: Easy
**Cost**: Free (testnet)

🎉 **You're ready to deploy!**
