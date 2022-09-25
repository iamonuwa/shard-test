import { Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { RPC, SUPPORTED_CHAINS } from "constants/wallet";
import getLibrary from "utils/getLibrary";
import { NetworkConnector } from "./NetworkConnector";

export const NETWORK_CHAIN_ID: number = parseInt(
    process.env.NEXT_PUBLIC_CHAIN_ID || "5"
);

export const network = new NetworkConnector({
    urls: RPC,
    defaultChainId: NETWORK_CHAIN_ID,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary =
        networkLibrary ?? getLibrary(network.provider as any));
}

export const walletconnect = new WalletConnectConnector({
    supportedChainIds: SUPPORTED_CHAINS,
    rpc: RPC,
    qrcode: true,
});

export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAINS,
});
export interface WalletInfo {
    description: string;
    connector?: AbstractConnector;
    href?: string;
    name: string;
    mobile?: boolean;
    icon?: string;
    mobileOnly?: boolean;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    INJECTED: {
        connector: injected,
        name: "Injected",
        icon: "metamask_wallet_logo.png",
        description: "Injected web3 provider.",
        href: undefined,
    },
    METAMASK: {
        description: "Easy-to-use browser extension.",
        connector: injected,
        name: "Metamask",
        mobile: false,
        icon: "metamask_wallet_logo.png",
    },
    WALLET_CONNECT: {
        description: "Connect to Trust Wallet, Rainbow Wallet and more...",
        connector: walletconnect,
        name: "Wallet Connect",
        mobile: true,
        icon: "wallet_connect_logo.png",
    },
};