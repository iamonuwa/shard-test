import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

export interface Signers {
    admin: SignerWithAddress;
    sp1: SignerWithAddress
    sp2: SignerWithAddress
    sp3: SignerWithAddress
    sp4: SignerWithAddress
}
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"