const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const nonce = await deployer.getNonce();

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy({ nonce: nonce });

  await voting.deployed();
  console.log("Voting contract deployed to:", voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// require("hardhat");

// async function main() {
//   const Voting = await ethers.deployContract("Voting");

//   await SimpleRecord.waitForDeployment();

//   console.log("Voting Contract Deployed at " + Voting.target);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
