import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";
import { RoleControl, RoleControl__factory } from "../../typechain";

export async function deployRoleControlFixture(): Promise<{ roleControl: RoleControl }> {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const admin: SignerWithAddress = signers[0];

    const roleControlFactory: RoleControl__factory = <RoleControl__factory>await ethers.getContractFactory("RoleControl");
    const roleControl: RoleControl = <RoleControl>await roleControlFactory.connect(admin).deploy(admin.address)
    await roleControl.deployed();

    return { roleControl };
}