import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ADDRESS_ZERO, Signers } from "../types";
import hre from 'hardhat'
import { deployRoleControlFixture } from "./fixtures/Role.fixture";
import { expect } from "chai";
describe("RoleControl", async function () {
    before(async function () {
        this.signers = {} as Signers
        const signers: SignerWithAddress[] = await hre.ethers.getSigners();
        this.signers.admin = signers[0]
        this.signers.sp1 = signers[1]
        this.signers.sp2 = signers[2]
        this.signers.sp3 = signers[3]
        this.signers.sp4 = signers[4]
        this.loadFixture = loadFixture;
    })

    describe("RoleControl Tests", async function () {
        beforeEach(async function () {
            const { roleControl } = await this.loadFixture(deployRoleControlFixture)
            this.roleControl = roleControl
        })

        it('should fail to add new service provider', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            const transaction = contract.addServiceProvider(ADDRESS_ZERO);
            await expect(transaction).to.revertedWith("RoleControl: INVALID_ADDRESS");
        })

        it('should fail to add new admin', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            const transaction = contract.addAdmin(ADDRESS_ZERO);
            await expect(transaction).to.revertedWith("RoleControl: INVALID_ADDRESS");
        })

        it('should return true for new service provider', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            await contract.addServiceProvider(this.signers.sp1.address);
            const isServiceProvider = await contract.isServiceProvider(this.signers.sp1.address)
            await expect(isServiceProvider).to.equal(true)
        })

        it('should return true for new admin', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            await contract.addAdmin(this.signers.sp1.address);
            const isAdmin = await contract.isAdmin(this.signers.sp1.address)
            await expect(isAdmin).to.equal(true)
        })

        it('should fail to remove service provider', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            const transaction = contract.removeServiceProvider(ADDRESS_ZERO);

            await expect(transaction).to.be.revertedWith("RoleControl: INVALID_ADDRESS")
        })

        it('should remove service provider', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            await contract.addServiceProvider(this.signers.sp1.address);
            await contract.removeServiceProvider(this.signers.sp1.address);
            const isServiceProvider = await contract.isServiceProvider(this.signers.sp1.address);

            await expect(isServiceProvider).to.equal(false)
        })

        it('should renounce admin', async function () {
            const contract = await this.roleControl.connect(this.signers.admin);
            await contract.renounceAdmin();
            const isAdmin = await contract.isAdmin(this.signers.admin.address);

            await expect(isAdmin).to.equal(false)
        })
    })
})