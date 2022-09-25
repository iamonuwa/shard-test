import produce from "immer";
import { createStore } from "store/root";
import { NamedSet } from "zustand/middleware";

type ServiceProviderType = {
    isDialogOpen: boolean;
    toggleDialog: (state: boolean) => void,
    serviceProviders: string[]
};

export const useServiceProvider = createStore<ServiceProviderType>(
    (set: NamedSet<ServiceProviderType>) => ({
        serviceProviders: [],
        isDialogOpen: false,
        toggleDialog: (isOpen: boolean) => {
            set(
                produce((state: ServiceProviderType) => {
                    state.isDialogOpen = isOpen;
                })
            );
        },
    })
);
