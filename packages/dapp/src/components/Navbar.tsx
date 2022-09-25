import Link from "next/link";
import { useRouter } from "next/router";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { ServiceProvider } from "./SProvider";

export const Navbar = () => {
  const router = useRouter();
  const { toggleDialog } = useServiceProvider();
  return (
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Logo className="h-10" />
        </Link>
      </div>
      <div className="space-x-2">
        <Button color="blue" onClick={() => toggleDialog(true)}>
          Add Service Provider
        </Button>
        <Button color="blue" onClick={() => router.push("admin/register-vehicle")}>
          Register Vehicle
        </Button>
        <Button color="blue">Connect Wallet</Button>
      </div>
      <ServiceProvider />
    </div>
  );
};
