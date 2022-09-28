import { useServiceProvider } from "store/hooks/useServiceProvider";
import Button from "./Button";
import { Modal } from "./Modal";
import { useForm } from "react-hook-form";
import { useVehicleHistory } from "store/hooks/useVehicleHistory";
import { Textarea } from "./Form/Textarea";
import { useIPFS } from "hooks/useIPFS";
import { useBlockchain } from "hooks/useBlockchain";
import { useRouter } from "next/router";

type FormState = {
  report: string;
};

export const AddHistoryModal = () => {
  const { isDialogOpen, toggleDialog } = useVehicleHistory();
  const { uploadMetadata } = useIPFS();
  const { addRepairHistory } = useBlockchain();
  const router = useRouter();
  const vin = router?.query?.id?.toString().toUpperCase() as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormState>({ mode: "all" });

  const assignRole = async ({ report }: FormState) => {
    const cid = await uploadMetadata({ report });
    await addRepairHistory(cid, vin);
    console.log(cid);
  };

  return (
    <Modal isOpen={isDialogOpen} onClose={() => toggleDialog()}>
      <form onSubmit={handleSubmit(assignRole)}>
        <div className="space-y-2">
          <div className="">
            <div className="text-lg font-medium leading-6 text-gray-900">Add Repair Report</div>
          </div>

          <div className="">
            <div className="w-full">
              <Textarea label="Add note" {...register("report")} name="report" placeholder="Give repair report" />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || Object.values(errors).length > 0} className="w-full">
            Add Report
          </Button>
        </div>
      </form>
    </Modal>
  );
};
