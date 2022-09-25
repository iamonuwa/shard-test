import { StoreApi } from "zustand";
import { NamedSet } from "zustand/middleware";

export type StoreSlice<T extends object> = (
    set: NamedSet<T>,
    get: StoreApi<T>["getState"]
) => T;

export type CustomStateCreator<
    T extends unknown,
    CustomSetState = NamedSet<T>,
    CustomGetState = StoreApi<T>["getState"],
    CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = (set: CustomSetState, get: CustomGetState, api: CustomStoreApi) => T;

export type AppState = {};
