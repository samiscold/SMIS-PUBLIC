import { createContext, useContext } from "react";
import CountryStore from "./countryStore";

interface Store {
    countryStore: CountryStore
}

export const store: Store = {
    countryStore: new CountryStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}