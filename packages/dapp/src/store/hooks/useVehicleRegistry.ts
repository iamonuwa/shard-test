import produce from "immer";
import { loadRegisteredVehicleQuery, VehicleData } from "services/queries/vehicle";
import { createStore } from "store/root";
import { NamedSet } from "zustand/middleware";

export type VehicleRegistryType = {
    data: VehicleData[];
    loading: boolean
    error: string | null
    loadVehicles: () => void
};

export const useVehicleRegistry = createStore<VehicleRegistryType>(
    (set: NamedSet<VehicleRegistryType>) => ({
        data: [],
        loading: false,
        error: null,
        loadVehicles: async () => {
            const { data, loading, error } = await loadRegisteredVehicleQuery()
            set(produce((state: VehicleRegistryType) => ({
                ...state,
                data,
                error,
                loading
            })))
        }
    })
);
