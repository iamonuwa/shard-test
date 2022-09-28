import produce from "immer";
import { HistoryData, loadVehicleHistoryQuery } from "services/queries/history";
import { createStore } from "store/root";
import { NamedSet } from "zustand/middleware";

export type VehicleHistoryType = {
    data: HistoryData | null;
    loading: boolean
    error: string | null
    isDialogOpen: boolean
    toggleDialog: () => void
    loadHistory: (vin: string) => void
};

export const useVehicleHistory = createStore<VehicleHistoryType>(
    (set: NamedSet<VehicleHistoryType>) => ({
        data: null,
        loading: false,
        error: null,
        isDialogOpen: false,
        toggleDialog: async () => {
            set(produce((state: VehicleHistoryType) => ({
                ...state,
                isDialogOpen: !state.isDialogOpen
            })))
        },
        loadHistory: async (vin: string) => {
            const { data, loading, error } = await loadVehicleHistoryQuery(vin)
            set(produce((state: VehicleHistoryType) => ({
                ...state,
                data,
                error,
                loading
            })))
        }
    })
);
