import produce from "immer";
import { createStore } from "store/root";
import { NamedSet } from "zustand/middleware";

type WalletModalType = {
    isOpen: boolean;
    toggleDialog: () => void;
};

export const useWalletModal = createStore<WalletModalType>(
    (set: NamedSet<WalletModalType>) => ({
        isOpen: false,
        toggleDialog: () => {
            set(produce((state: WalletModalType) => {
                state.isOpen = !state.isOpen
            }))
        }
    })
);
