import { ethers, run } from "hardhat";

async function main() {
  const VehicleRegistry = await ethers.getContractFactory("VehicleRegistry");
  const vehicleRegistry = await VehicleRegistry.deploy();
  await vehicleRegistry.deployed();

  await vehicleRegistry.deployTransaction.wait(3);

  await run("verify:verify", {
    address: vehicleRegistry.address,
    constructorArguments: [],
  });

  console.log(`Vehicle contract deployed to ${vehicleRegistry.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
