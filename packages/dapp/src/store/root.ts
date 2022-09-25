import create from "zustand";
import { devtools, NamedSet } from "zustand/middleware";
import { AppState, CustomStateCreator } from "./types";

export const createStore = <TState extends unknown>(
    storeCreator: CustomStateCreator<TState>
) => {
    return create(devtools(storeCreator));
};

export const useStore = createStore<AppState>(
    (set: NamedSet<any>, get: unknown) => ({})
);
