import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";
import { VehicleRegistry__factory } from "../../typechain/factories/VehicleRegistry__factory";
import { VehicleRegistry } from "../../typechain/VehicleRegistry";

export async function deployVehicleRegistryFixture(): Promise<{ vehicleRegistry: VehicleRegistry }> {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const admin: SignerWithAddress = signers[0];

    const vehicleInformationFactory: VehicleRegistry__factory = <VehicleRegistry__factory>await ethers.getContractFactory("VehicleRegistry");
    const vehicleRegistry: VehicleRegistry = <VehicleRegistry>await vehicleInformationFactory.connect(admin).deploy();
    await vehicleRegistry.deployed();

    return { vehicleRegistry };
}