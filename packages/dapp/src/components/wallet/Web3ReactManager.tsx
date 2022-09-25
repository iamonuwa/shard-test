import { network } from "connectors";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useEagerConnect, useInactiveListener } from "hooks/useEagerConnect";
import { useEffect } from "react";

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active } = useActiveWeb3React();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useActiveWeb3React();

  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  useInactiveListener(!triedEager);

  if (triedEager && !active && networkError) {
    return (
      <div className="text-sm">
        Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
      </div>
    );
  }

  return children;
}
