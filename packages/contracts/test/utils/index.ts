import bs58 from 'bs58'
function revertReason(reason: string) {
    return `VM Exception while processing transaction: reverted with reason string '${reason}'`
}

export function getBytes32FromIpfsHash(ipfsListing: any) {
    return "0x" + bs58.decode(ipfsListing).slice(2).toString()
}

export function getIpfsHashFromBytes32(bytes32Hex: any) {
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
}