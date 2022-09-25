import Link from "next/link";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { ServiceProvider } from "./SProvider";
import { useWalletModal } from "store/hooks/useWallet";
import Web3Status from "./wallet/Web3Status";
const WalletModal = dynamic(() => import("./wallet"), {
  ssr: false,
});

export const Navbar = () => {
  const router = useRouter();
  const { toggleDialog } = useServiceProvider();
  const { openWalletDialog } = useWalletModal();
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Logo className="h-10" />
        </Link>
      </div>
      <div className="space-x-2">
        <Button onClick={() => toggleDialog(true)}>Add Service Provider</Button>
        <Button onClick={() => router.push("/create")}>Register Vehicle</Button>
        <Web3Status />
      </div>
      <ServiceProvider />
      <WalletModal />
    </div>
  );
};
