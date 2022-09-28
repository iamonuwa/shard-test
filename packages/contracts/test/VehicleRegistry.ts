import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre from "hardhat";
import { Signers } from "../types";
import { expect } from "chai";
import { deployVehicleRegistryFixture } from "./fixtures/VehicleInformation.fixture";
import { Bytes, ethers } from "ethers";
import { deployRoleControlFixture } from "./fixtures/Role.fixture";

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

        metadataHashBytes = ethers.utils.base58.decode("QmRLr6ddTgtmFXsp5jHKGpX9ZiaCn9SEQ8gQmwbxF4qgnA").slice(2)

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
            const contract = this.vehicleRegistry.connect(this.signers.sp1)
            expect(contract.register(metadataHashBytes, "VIN")).to.revertedWith("RoleControl: Restricted to service provider.");
        })

        it('fail to register vehicle without VIN', async function () {
            const roleControl = this.roleControl.connect(this.signers.admin)
            await roleControl.addServiceProvider(this.signers.sp1.address)
            const transaction = this.vehicleRegistry.connect(this.signers.sp1)
            expect(transaction.register(metadataHashBytes, "")).to.revertedWith("VehicleRegistry: Invalid VIN");
        })

        it('fail to register vehicle without metadata', async function () {
            const roleControl = this.roleControl.connect(this.signers.admin)
            await roleControl.addServiceProvider(this.signers.sp1.address)
            const contract = this.vehicleRegistry.connect(this.signers.sp1)
            const transaction = contract.register(zeroContentHashBytes, "VIN")
            expect(transaction).to.revertedWith("VehicleRegistry: Invalid IPFS HASH");
        })
    })
})