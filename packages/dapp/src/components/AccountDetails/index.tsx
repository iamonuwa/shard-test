import { injected } from "connectors";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { FC } from "react";
import { formatEtherscanLink, shortenHex } from "utils/format";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Copy from "./Copy";
import Link from "next/link";
import { Button } from "components/Button";

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  openOptions: () => void;
}

const AccountDetails: FC<AccountDetailsProps> = ({ toggleWalletModal, openOptions }) => {
  const { chainId, account, connector } = useActiveWeb3React();

  return (
    <div className="space-y-2">
      <div className="text-center">
        <div className="flex flex-col">
          <div className="font-base font-extrabold font-sans">{shortenHex(account!)}</div>
        </div>
        <div className="flex justify-center w-full pt-12">
          <div className="text-xs w-1/2 justify-center cursor-pointer">
            <Copy toCopy={account!} />
          </div>
          <Link
            target="_blank"
            href={formatEtherscanLink("Account", [chainId!, account!])}
            className="flex items-center justify-center space-x-1 text-xs outline-none ring-0 cursor-pointer"
          >
            <ArrowTrendingUpIcon />
            <span>View on Explorer</span>
          </Link>
        </div>
        <div className="flex justify-between pt-6 space-y-2">
          {connector !== injected && (
            <Button onClick={() => (connector as any)?.close()} className="rounded-none">
              Disconnect
            </Button>
          )}
          <Button className="text-blue-500" onClick={openOptions} variant="outlined">
            Change Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
