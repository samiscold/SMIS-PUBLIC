import { createContext, useContext } from "react";
import CountryStore from "./countryStore";
import DepartmentStore from "./departmentStore";

interface Store {
    countryStore: CountryStore,
    departmentStore: DepartmentStore
}

export const store: Store = {
    countryStore: new CountryStore(),
    departmentStore: new DepartmentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}