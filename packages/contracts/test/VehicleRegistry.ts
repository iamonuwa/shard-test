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
            const contract = this.vehicleRegistry.connect(this.signers.sp1)
            expect(contract.register({ vin: "0x0", ipfsHash: metadataHashBytes })).to.revertedWith("RoleControl: Restricted to service provider.");
        })

        it('fail to register vehicle without VIN', async function () {
            const roleControl = this.roleControl.connect(this.signers.admin)
            await roleControl.addServiceProvider(this.signers.sp1.address)
            const transaction = this.vehicleRegistry.connect(this.signers.sp1)
            expect(transaction.register({ vin: "", ipfsHash: metadataHashBytes })).to.revertedWith("VehicleRegistry: Invalid VIN");
        })

        it('fail to register vehicle without metadata', async function () {
            const roleControl = this.roleControl.connect(this.signers.admin)
            await roleControl.addServiceProvider(this.signers.sp1.address)
            const contract = this.vehicleRegistry.connect(this.signers.sp1)
            const transaction = contract.register({ vin: "", ipfsHash: zeroContentHashBytes })
            expect(transaction).to.revertedWith("VehicleRegistry: Invalid IPFS HASH");
        })

        it('update vehicle history', async function () {
            const VIN = "0x0"
            const roleControl = this.roleControl.connect(this.signers.admin)
            await roleControl.addServiceProvider(this.signers.sp1.address)
            const contract = await this.vehicleRegistry.connect(this.signers.sp1)
            await contract.register({ vin: VIN, ipfsHash: metadataHashBytes })
            // await contract.addRepairHistory(VIN, "Hello World")
            console.log(await contract.vehicleRepairHistory(VIN))
            // expect(contract.vehicleRepairHistory(VIN)).to.equal(VIN)
        })
    })
})