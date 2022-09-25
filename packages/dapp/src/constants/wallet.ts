import { ChainId } from "utils/chainId";

export const INFURA_KEY =
    process.env.NEXT_INFURA_KEY || `b6611b1efc64497fa183f7dd59608581`;

// TODO add NEXT_PUBLIC_NETWORK_URL to prod
if (typeof INFURA_KEY === "undefined") {
    throw new Error("missing env: INFURA_KEY");
}

export const RPC = {
    [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [ChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    [ChainId.POLYGON]: "https://rpc-mainnet.maticvigil.com",
    [ChainId.POLYGON_TESTNET]: `https://polygon-testnet.infura.io/v3/${INFURA_KEY}`,
    [ChainId.BSC]: "https://bsc-dataseed.binance.org/",
    [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    [ChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
    [ChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,
};

export const SUPPORTED_CHAINS: number[] = [
    5, // goerli testnet
];