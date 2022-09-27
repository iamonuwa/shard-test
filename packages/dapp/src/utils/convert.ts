import bs58 from 'bs58'
import CID from 'cids'

export const convertMetadataToJSON = (data: any) => {
    const config: {
        [key: string]: string;
    } = {};
    (Object.keys(data) as Array<keyof typeof data>).forEach((key, index) => {
        config[index] = data[key];
    });

    return config;
};

export const hashToBytes32 = (hash: string) => '0x' + bs58.decode(hash).slice(2).toString()

export function IpfsHashToBytes32(hash: string) {
    return new CID(hash).toV0().multihash.subarray(2)
}

export function bytes32ToIpfsHash(bytes: string) {
    // @ts-ignore
    return new CID(new Uint8Array([18, 32, ...bytes])).toString()
}

export function getBytes32FromIpfsHash(ipfsHash: string) {
    return "0x" + bs58.decode(ipfsHash).slice(2).toString()
}

export function getIpfsHashFromBytes32(bytes32Hex: string) {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
}