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
            const { data, error, loading } = await loadRegisteredVehicleQuery()
            set(produce((state: VehicleRegistryType) => {
                state.error = error?.message as string
                state.loading = loading
                state.data = data
            }))
        }
    })
);