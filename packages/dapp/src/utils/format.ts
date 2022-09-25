
export function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
        hex.length - length
    )}`;
}

export function formatEtherscanLink(
    type: "Account" | "Transaction",
    data: [number, string]
) {
    switch (type) {
        case "Account": {
            const [address] = data;
            return `https://goerli.etherscan.io/address/${address}`;
        }
        case "Transaction": {
            const [hash] = data;
            return `https://goerli.etherscan.io/tx/${hash}`;
        }
    }
}