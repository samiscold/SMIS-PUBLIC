import { createContext, useContext } from "react";
import CountryStore from "./countryStore";
import DepartmentStore from "./departmentStore";
import SubjectStore from "./subjectStore";

interface Store {
    countryStore: CountryStore,
    departmentStore: DepartmentStore,
    subjectStore: SubjectStore
}

export const store: Store = {
    countryStore: new CountryStore(),
    departmentStore: new DepartmentStore(),
    subjectStore: new SubjectStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
} 