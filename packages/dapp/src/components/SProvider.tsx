import { useServiceProvider } from "store/hooks/useServiceProvider";
import Button from "./Button";
import { Modal } from "./Modal";
import { useForm } from "react-hook-form";
import { useBlockchain } from "hooks/useBlockchain";
import { Input } from "./Form/Input";

type FormState = {
  wallet_address: string;
};

export const ServiceProvider = () => {
  const { isDialogOpen, toggleDialog } = useServiceProvider();
  const { addServiceProvider } = useBlockchain();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormState>({ mode: "all" });

  const assignRole = async (data: FormState) => {
    await addServiceProvider(data.wallet_address);
  };

  return (
    <Modal isOpen={isDialogOpen} onClose={() => toggleDialog()}>
      <form onSubmit={handleSubmit(assignRole)}>
        <div className="space-y-2">
          <div className="">
            <div className="text-lg font-medium leading-6 text-gray-900">Register New Service Provider</div>
          </div>

          <div className="w-full">
            <Input
              label="Wallet Address"
              type="text"
              {...register("wallet_address")}
              name="wallet_address"
              placeholder="0x0000000000000000000000000000000000000000"
            />
          </div>

          <Button type="submit" disabled={isSubmitting || Object.values(errors).length > 0} className="w-full">
            Add Service Provider
          </Button>
        </div>
      </form>
    </Modal>
  );
};
