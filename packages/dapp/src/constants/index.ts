export const BLOCKCHAIN_EXPLORER_PREFIXES = {
    1: "etherscan.io",
    5: "goerli.etherscan.io",
    56: "bscscan.com",
    97: "testnet.bscscan.com",
    137: "polygonscan.com",
    80001: "mumbai.polygonscan.com",
    42161: "arbiscan.io",
    421611: "rinkeby-explorer.arbitrum.io",
};

export const NetworkContextName = `${new Date().getTime()}`;
export const IS_IN_IFRAME =
    typeof window !== "undefined" && window.parent !== window;

export const DEFAULT_TXN_DISMISS_MS = 5000;
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30;
export const CONTRACT_ADDRESS = process.env.NEXT_CONTRACT_ADDRESS as string
