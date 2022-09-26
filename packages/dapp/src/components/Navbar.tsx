import Link from "next/link";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { ServiceProvider } from "./SProvider";
import Web3Status from "./Wallet/Web3Status";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
const WalletModal = dynamic(() => import("./Wallet"), {
  ssr: false,
});

export const Navbar = () => {
  const router = useRouter();
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
            <Button className="font-mono" onClick={() => toggleDialog(true)}>
              Add Service Provider
            </Button>
            <Button className="font-mono" onClick={() => router.push("/create")}>
              Register Vehicle
            </Button>
          </>
        )}
        <Web3Status />
      </div>
      <ServiceProvider />
      <WalletModal />
    </div>
  );
};
