// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether")
}

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  const NAME = "Dappcord"
  const SYMBOL = "DC"

  // Deploy
  const Dappcord = await ethers.getContractFactory(NAME)
  const dappcord = await Dappcord.deploy(NAME, SYMBOL)
  await dappcord.deployed()

  console.log(`Deployed ${NAME} at - ${dappcord.address}\n`)

  const DEFAULT_CHANNEL_NAMES = ["general", "intro", "memes"]
  const DEFAULT_COSTS = [tokens(1), tokens(1.5), tokens(0.25)]

  for (let i = 0; i < 3; i++) {
    const transaction = await dappcord.connect(deployer).createChannel(DEFAULT_CHANNEL_NAMES[i], DEFAULT_COSTS[i])
    await transaction.wait()

    console.log(`Created channel ${DEFAULT_CHANNEL_NAMES[i]}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
