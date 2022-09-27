import { injected } from "connectors";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { FC } from "react";
import { formatEtherscanLink, shortenHex } from "utils/format";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import Copy from "./Copy";
import Button from "components/Button";
import Link from "components/Link";
import * as blockies from "blockies-ts";
import Image from "next/future/image";

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  openOptions: () => void;
}

const AccountDetails: FC<AccountDetailsProps> = ({ toggleWalletModal, openOptions }) => {
  const { account, connector } = useActiveWeb3React();
  const blockie = blockies.create({ seed: account! }).toDataURL();

  return (
    <div className="space-y-2">
      <div className="text-center">
        <div className="flex justify-center items-center flex-col">
          <Image src={blockie} width={56} height={56} className="rounded-full" alt={`Avatar for ${account}`} />
          <div className="font-base text-lg font-extrabold font-sans">{shortenHex(account!, 8)}</div>
        </div>
        <div className="flex justify-center w-full pt-12">
          <div className="text-xs w-1/2 justify-center cursor-pointer">
            <Copy toCopy={account!} />
          </div>
          <Link
            external
            href={formatEtherscanLink("Account", [account!])}
            className="flex items-center justify-center space-x-1 text-xs outline-none ring-0 cursor-pointer"
          >
            <ArrowTrendingUpIcon className="h-4 w-4" />
            <span>View on Explorer</span>
          </Link>
        </div>
        <div className="flex flex-col justify-between pt-6 space-y-2">
          <Button variant="primary" onClick={openOptions}>
            Change Wallet
          </Button>
          {connector !== injected && (
            <Button variant="danger" onClick={() => (connector as any)?.close()} className="w-full">
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
