import produce from "immer";
import { createStore } from "store/root";
import { NamedSet } from "zustand/middleware";

type WalletModalType = {
    isOpen: boolean;
    closeWalletDialog: () => void;
    openWalletDialog: () => void;
};

export const useWalletModal = createStore<WalletModalType>(
    (set: NamedSet<WalletModalType>) => ({
        isOpen: false,
        openWalletDialog: () => {
            set(
                produce((state: WalletModalType) => {
                    state.isOpen = true;
                })
            );
        },
        closeWalletDialog: () => {
            set(
                produce((state: WalletModalType) => {
                    state.isOpen = false;
                })
            );
        },
    })
);
