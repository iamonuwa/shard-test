import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Button } from "components/Button";
import { NetworkContextName } from "constants/index";
import { useWalletModal } from "store/hooks/useWallet";
import { shortenHex } from "utils/format";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import WalletModal from ".";

function Web3StatusInner() {
  const { account, error } = useWeb3React();
  const { openWalletDialog } = useWalletModal();

  if (account) {
    return (
      <div
        className="inline-flex font-mono cursor-pointer items-center px-6 py-3 text-sm"
        id="web3-status-connected"
        onClick={openWalletDialog}
      >
        <div>{shortenHex(account)}</div>
      </div>
    );
  } else if (error) {
    return (
      <div
        className="flex items-center space-x-2 font-mono cursor-pointer px-6 py-3 border-solid border-2 border-red-500 rounded-xl text-red-500 text-sm"
        onClick={openWalletDialog}
      >
        <ExclamationTriangleIcon />
        <div>{error instanceof UnsupportedChainIdError ? <div>Wrong Network</div> : <div>Error</div>}</div>
      </div>
    );
  } else {
    return (
      <Button onClick={openWalletDialog} className="inline-flex font-mono items-center px-6 text-sm">
        Connect Wallet
      </Button>
    );
  }
}

export default function Web3Status() {
  const { active } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);

  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && <WalletModal />}
    </>
  );
}
