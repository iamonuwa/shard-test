import dynamic from "next/dynamic";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import Button from "./Button";
import { Logo } from "./Logo";
import { ServiceProvider } from "./SProvider";
import Web3Status from "./Wallet/Web3Status";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { AddHistoryModal } from "./AddHistory";
import Link from "./Link";
const WalletModal = dynamic(() => import("./Wallet"), {
  ssr: false,
});

export const Navbar = () => {
  const { toggleDialog } = useServiceProvider();
  const { account } = useActiveWeb3React();
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Logo className="h-10" />
        </Link>
      </div>
      <div className="space-x-2 divide-x divide-double">
        {account && (
          <>
            <Link className="font-mono" href="/create">
              Register Vehicle
            </Link>
            <Button className="font-mono" onClick={() => toggleDialog()}>
              Add Service Provider
            </Button>
          </>
        )}
        <Web3Status />
      </div>
      <ServiceProvider />
      <WalletModal />
      <AddHistoryModal />
    </div>
  );
};
