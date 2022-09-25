interface Window {
    walletLinkExtension?: any
    ethereum?: {
        isCoinbaseWallet?: true
        isMetaMask?: true
        on?: (...args: any[]) => void
        removeListener?: (...args: any[]) => void
        autoRefreshOnNetworkChange?: boolean
    }
    web3?: Record<string, unknown>
}