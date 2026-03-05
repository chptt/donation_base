const hre = require("hardhat");

async function main() {
  console.log("Deploying DonationPlatform to Base Sepolia...");

  // Get the contract factory
  const DonationPlatform = await hre.ethers.getContractFactory("DonationPlatform");
  
  // Deploy the contract
  console.log("Deployment in progress...");
  const donationPlatform = await DonationPlatform.deploy();
  
  await donationPlatform.waitForDeployment();
  
  const address = await donationPlatform.getAddress();
  
  console.log("\n✅ DonationPlatform deployed successfully!");
  console.log("📍 Contract Address:", address);
  console.log("\n📝 Next steps:");
  console.log("1. Update .env.local with:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log("\n2. Verify contract on Basescan:");
  console.log(`   npx hardhat verify --network baseSepolia ${address}`);
  console.log("\n3. View on Basescan:");
  console.log(`   https://sepolia.basescan.org/address/${address}`);
  
  // Test the contract
  console.log("\n🧪 Testing contract functions...");
  
  try {
    const price = await donationPlatform.getLatestPrice();
    console.log("✅ Price feed working! ETH/USD:", (Number(price) / 100000000).toFixed(2));
    
    const requiredETH = await donationPlatform.viewRequiredETH();
    console.log("✅ Required ETH for $10 donation:", hre.ethers.formatEther(requiredETH), "ETH");
  } catch (error) {
    console.log("⚠️  Price feed test failed (this is normal on testnet):", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
