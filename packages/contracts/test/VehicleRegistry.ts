// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import hre from "hardhat";
// import { Signers } from "../types";
// import { expect } from "chai";
// import { deployVehicleRegistryFixture } from "./fixtures/VehicleInformation.fixture";
// import { Bytes, ethers } from "ethers";
// import { sha256 } from "ethers/lib/utils";
// import { VehicleRegistry } from "../typechain";


// let metadataHex: string;
// let metadataHash: string
// let metadataHashBytes: Bytes
// let zeroContentHashBytes: Bytes
// let contract: VehicleRegistry

// describe("Unit tests", async () => {
//     before(async function () {
//         this.signers = {} as Signers
//         const signers: SignerWithAddress[] = await hre.ethers.getSigners();
//         this.signers.admin = signers[0]
//         this.loadFixture = loadFixture;
//         metadataHex = ethers.utils.formatBytes32String('{}');
//         metadataHash = await sha256(metadataHex);
//         metadataHashBytes = ethers.utils.arrayify(metadataHash);

//         zeroContentHashBytes = ethers.utils.arrayify(ethers.constants.HashZero);

//     })
//     describe('VehicleRegistry', async () => {
//         beforeEach(async function () {
//             const { vehicleRegistry } = await this.loadFixture(deployVehicleRegistryFixture)
//             this.vehicleRegistry = vehicleRegistry
//             contract = await this.vehicleRegistry.connect(this.signers.admin)
//         })

//         it('fail to register vehicle without ipfs hash', async function () {
//             const transaction = contract.register({ vin: "0x0", ipfsHash: zeroContentHashBytes })
//             await expect(transaction).to.revertedWith("VehicleRegistry: Invalid IPFS HASH");
//         })

//         it('fail to register vehicle without VIN', async function () {
//             const transaction = contract.register({ vin: "", ipfsHash: metadataHashBytes })
//             await expect(transaction).to.revertedWith("VehicleRegistry: Invalid VIN");
//         })

//         it('fail to update vehicle history', async function () { })
//     })
// })