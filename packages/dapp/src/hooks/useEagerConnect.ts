import { injected } from "connectors";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useEffect, useState } from "react";

export function useEagerConnect() {
    const { activate, active } = useActiveWeb3React();
    const [tried, setTried] = useState(false);

    useEffect(() => {
        if (!active) {
            injected.isAuthorized().then((isAuthorized) => {
                if (isAuthorized) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true);
                    });
                }
            });
        }
    }, [activate, active]);

    // wait until we get confirmation of a connection to flip the flag
    useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);

    return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useActiveWeb3React();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // @ts-ignore
            const { ethereum } = window;

            if (ethereum && ethereum.on && !active && !error && !suppress) {
                const handleChainChanged = () => {
                    // eat errors
                    activate(injected, undefined, true).catch((error) => {
                        console.error("Failed to activate after chain changed", error);
                    });
                };

                const handleAccountsChanged = (accounts: string[]) => {
                    if (accounts.length > 0) {
                        // eat errors
                        activate(injected, undefined, true).catch((error) => {
                            console.error("Failed to activate after accounts changed", error);
                        });
                    }
                };

                ethereum.on("chainChanged", handleChainChanged);
                ethereum.on("accountsChanged", handleAccountsChanged);

                return () => {
                    if (ethereum.removeListener) {
                        ethereum.removeListener("chainChanged", handleChainChanged);
                        ethereum.removeListener("accountsChanged", handleAccountsChanged);
                    }
                };
            }
            return undefined;
        }
    }, [active, error, suppress, activate]);
}