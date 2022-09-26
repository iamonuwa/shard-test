import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre from "hardhat";
import { Signers } from "../types";
import { expect } from "chai";
import { deployVehicleRegistryFixture } from "./fixtures/VehicleInformation.fixture";
import { Bytes, ethers } from "ethers";
import { sha256 } from "ethers/lib/utils";
import { deployRoleControlFixture } from "./fixtures/Role.fixture";

let metadataHex: string;
let metadataHash: string
let metadataHashBytes: Bytes
let zeroContentHashBytes: Bytes

describe("Unit tests", async () => {
    before(async function () {
        this.signers = {} as Signers
        const signers: SignerWithAddress[] = await hre.ethers.getSigners();
        this.signers.admin = signers[0]
        this.signers.sp1 = signers[1]
        this.signers.sp2 = signers[2]
        this.signers.sp3 = signers[3]
        this.signers.sp4 = signers[4]

        this.loadFixture = loadFixture;

        metadataHex = ethers.utils.formatBytes32String('{}');
        metadataHash = await sha256(metadataHex);
        metadataHashBytes = ethers.utils.arrayify(metadataHash);

        zeroContentHashBytes = ethers.utils.arrayify(ethers.constants.HashZero);

        const { roleControl } = await this.loadFixture(deployRoleControlFixture)
        this.roleControl = roleControl

    })
    describe('VehicleRegistry', async () => {
        beforeEach(async function () {
            const { vehicleRegistry } = await this.loadFixture(deployVehicleRegistryFixture)
            this.vehicleRegistry = vehicleRegistry
        })

        it('fail to register vehicle when account is not a service provider', async function () {
            const contract = await this.vehicleRegistry.connect(this.signers.admin)
            const transaction = contract.register({ vin: "0x0", ipfsHash: metadataHashBytes })
            await expect(transaction).to.revertedWith("RoleControl: Restricted to service provider.");
        })

        // it('fail to register vehicle without VIN', async function () {
        //     const roleControl = await this.roleControl.connect(this.signers.admin)
        //     await roleControl.addServiceProvider(this.signers.sp1.address)
        //     const contract = await this.vehicleRegistry.connect(this.signers.sp1)
        //     const transaction = contract.register({ vin: "", ipfsHash: metadataHashBytes })
        //     await expect(transaction).to.revertedWith("VehicleRegistry: Invalid VIN");
        // })

        // it('fail to register vehicle without metadata', async function () {
        //     const roleControl = await this.roleControl.connect(this.signers.admin)
        //     await roleControl.addServiceProvider(this.signers.sp1.address)
        //     const contract = await this.vehicleRegistry.connect(this.signers.sp1)
        //     const transaction = contract.register({ vin: "", ipfsHash: zeroContentHashBytes })
        //     await expect(transaction).to.revertedWith("VehicleRegistry: Invalid IPFS HASH");
        // })

        it('fail to update vehicle history', async function () { })
    })
})