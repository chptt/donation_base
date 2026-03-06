# Deploy to Base Sepolia Using Remix IDE

Simple guide to deploy your smart contract using Remix (no private key needed!)

## 🎯 Prerequisites

- MetaMask installed
- Base Sepolia network added to MetaMask
- Base Sepolia ETH in your wallet

## Step 1: Add Base Sepolia to MetaMask

### Option A: Automatic (Recommended)

Visit: https://chainlist.org/?search=base+sepolia&testnets=true
1. Click "Connect Wallet"
2. Find "Base Sepolia"
3. Click "Add to MetaMask"

### Option B: Manual

In MetaMask:
1. Click network dropdown
2. Click "Add Network" → "Add a network manually"
3. Enter:
   - **Network Name**: Base Sepolia
   - **RPC URL**: https://sepolia.base.org
   - **Chain ID**: 84532
   - **Currency Symbol**: ETH
   - **Block Explorer**: https://sepolia.basescan.org

## Step 2: Get Base Sepolia ETH

Get free testnet ETH from:
- **Coinbase Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- **Superchain Faucet**: https://app.optimism.io/faucet

## Step 3: Open Remix IDE

Go to: https://remix.ethereum.org/

## Step 4: Create Contract File

1. In Remix, click "File Explorer" (📁 icon)
2. Click "Create New File" button
3. Name it: `DonationPlatform.sol`
4. Copy the contract code from your project

## Step 5: Copy Contract Code

Copy this entire contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";

interface AggregatorV3Interface {
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 price,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract DonationPlatform is ERC721, ReentrancyGuard, Ownable {
    AggregatorV3Interface internal priceFeed;
    
    enum CharityType { Housing, Meals, Medical, Education, Equipment, RiverCleaning }
    
    struct Campaign {
        uint256 tokenId;
        CharityType charityType;
        uint256 goalAmount; // in USD (with 18 decimals)
        uint256 totalDonations; // in ETH (with 18 decimals)
        address creator;
        string influencerName;
        string profileImageURL;
        bool active;
        uint256 createdAt;
    }
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public creatorCampaigns;
    mapping(address => mapping(uint256 => uint256)) public userDonations; // user => tokenId => amount
    mapping(address => uint256[]) public userContributions; // user => tokenIds donated to
    
    uint256 private _tokenIdCounter;
    uint256 public constant DONATION_AMOUNT_USD = 10 * 10**18; // $10 in wei format
    
    event CampaignCreated(uint256 indexed tokenId, address indexed creator, CharityType charityType, uint256 goalAmount);
    event DonationMade(uint256 indexed tokenId, address indexed donor, uint256 amount);
    event Withdrawal(uint256 indexed tokenId, address indexed creator, uint256 amount);
    
    constructor() ERC721("DonationCampaign", "DONATE") Ownable(msg.sender) {
        // Base Sepolia ETH/USD Price Feed
        priceFeed = AggregatorV3Interface(0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1);
    }
    
    function mintMyNFT(
        CharityType _charityType,
        uint256 _goalAmount,
        string memory _influencerName,
        string memory _profileImageURL
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Use _mint instead of _safeMint to allow multiple campaigns per wallet
        _mint(msg.sender, tokenId);
        
        campaigns[tokenId] = Campaign({
            tokenId: tokenId,
            charityType: _charityType,
            goalAmount: _goalAmount,
            totalDonations: 0,
            creator: msg.sender,
            influencerName: _influencerName,
            profileImageURL: _profileImageURL,
            active: true,
            createdAt: block.timestamp
        });
        
        creatorCampaigns[msg.sender].push(tokenId);
        
        emit CampaignCreated(tokenId, msg.sender, _charityType, _goalAmount);
        return tokenId;
    }
    
    function donate(uint256 _tokenId) public payable nonReentrant {
        require(campaigns[_tokenId].active, "Campaign not active");
        require(msg.value > 0, "Donation must be greater than 0");
        
        campaigns[_tokenId].totalDonations += msg.value;
        userDonations[msg.sender][_tokenId] += msg.value;
        
        // Add to user contributions if first donation to this campaign
        if (userDonations[msg.sender][_tokenId] == msg.value) {
            userContributions[msg.sender].push(_tokenId);
        }
        
        emit DonationMade(_tokenId, msg.sender, msg.value);
    }
    
    function withdraw(uint256 _tokenId) public nonReentrant {
        require(ownerOf(_tokenId) == msg.sender, "Not campaign owner");
        require(campaigns[_tokenId].totalDonations > 0, "No donations to withdraw");
        
        uint256 amount = campaigns[_tokenId].totalDonations;
        campaigns[_tokenId].totalDonations = 0;
        campaigns[_tokenId].active = false;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit Withdrawal(_tokenId, msg.sender, amount);
    }
    
    function getCampaignsByCreator(address _creator) public view returns (uint256[] memory) {
        return creatorCampaigns[_creator];
    }
    
    function viewRequiredETH() public view returns (uint256) {
        int256 price = getLatestPrice();
        require(price > 0, "Invalid price");
        
        // Convert USD to ETH: (USD amount * 10^18) / (price * 10^8) * 10^18
        uint256 ethAmount = (DONATION_AMOUNT_USD * 10**8) / uint256(price);
        return ethAmount;
    }
    
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price; // Price has 8 decimals
    }
    
    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](_tokenIdCounter);
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }
    
    function getUserContributions(address _user) public view returns (uint256[] memory) {
        return userContributions[_user];
    }
    
    function getUserDonationAmount(address _user, uint256 _tokenId) public view returns (uint256) {
        return userDonations[_user][_tokenId];
    }
    
    function getTotalCampaigns() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
```

Paste this into your `DonationPlatform.sol` file in Remix.

## Step 6: Compile Contract

1. Click "Solidity Compiler" icon (📝) in left sidebar
2. Select compiler version: **0.8.20** or higher
3. Click "Compile DonationPlatform.sol"
4. Wait for green checkmark ✅

## Step 7: Switch MetaMask to Base Sepolia

**IMPORTANT**: Before deploying, make sure:
1. Open MetaMask
2. Click network dropdown at top
3. Select "Base Sepolia"
4. Verify you see your Base Sepolia ETH balance

## Step 8: Deploy Contract

1. Click "Deploy & Run Transactions" icon (🚀) in left sidebar
2. In "ENVIRONMENT" dropdown, select: **Injected Provider - MetaMask**
3. MetaMask will pop up - click "Connect"
4. Verify it shows:
   - Network: "Base Sepolia"
   - Your account address
   - Your ETH balance
5. In "CONTRACT" dropdown, select: **DonationPlatform**
6. Click orange "Deploy" button
7. MetaMask will pop up - review and click "Confirm"
8. Wait for deployment (10-30 seconds)

## Step 9: Copy Contract Address

After deployment:
1. Look in Remix console at bottom
2. Find the deployed contract
3. Click to expand it
4. Copy the contract address (starts with 0x...)

**Example**: `0x1234567890abcdef1234567890abcdef12345678`

## Step 10: Update .env.local

Open your `.env.local` file and update:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourNewContractAddressHere
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID=84532
```

## Step 11: Test Contract in Remix (Optional)

In Remix, you can test your deployed contract:

1. Expand the deployed contract in "Deployed Contracts" section
2. Try calling functions:
   - `getLatestPrice` - Should return ETH price
   - `viewRequiredETH` - Should return ETH needed for $10
   - `getTotalCampaigns` - Should return 0 initially

## Step 12: Verify Contract on Basescan (Optional)

1. Go to: https://sepolia.basescan.org/
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Fill in:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: v0.8.20
   - License: MIT
6. Paste your contract code
7. Click "Verify and Publish"

## Step 13: Test Your Frontend

```bash
npm run dev
```

Open http://localhost:3000 and test:
- Connect wallet
- Create campaign
- Make donation
- Withdraw funds

## Step 14: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import: `https://github.com/chptt/donation_base`
3. Add environment variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Your contract address from Step 9
   - `NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID`: `84532`
4. Click "Deploy"

## 🎉 Done!

Your donation platform is now live on Base Sepolia!

## 📊 What You Should See in Remix

### During Deployment:
```
[vm] from: 0xYourAddress
to: DonationPlatform.(constructor)
value: 0 wei
data: 0x608060...
logs: 0
hash: 0x123...
```

### After Deployment:
```
✅ Contract deployed at: 0x1234567890abcdef...
```

## 🚨 Troubleshooting

### "Gas estimation failed"
- Make sure you have enough Base Sepolia ETH
- Try increasing gas limit manually

### "Wrong network"
- Switch MetaMask to Base Sepolia
- Refresh Remix page

### "Transaction failed"
- Check you have Base Sepolia ETH (not regular Sepolia)
- Try again with higher gas

### "Cannot find module"
- Wait for OpenZeppelin imports to load
- Refresh Remix if needed

## 📝 Important Notes

✅ **No private key needed** - Remix uses MetaMask directly
✅ **Safer** - Your private key never leaves MetaMask
✅ **Easier** - Just click and deploy
✅ **Works with Vercel** - Frontend deployment is the same

## 🔗 Quick Links

- **Remix IDE**: https://remix.ethereum.org/
- **Base Sepolia Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- **Basescan**: https://sepolia.basescan.org/
- **Chainlist**: https://chainlist.org/?search=base+sepolia&testnets=true

---

**Need Help?** Check the troubleshooting section or create a GitHub issue!
