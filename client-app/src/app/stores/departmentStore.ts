import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Department } from "../models/department";

export default class DepartmentStore {
    departmentRegistry = new Map<string, Department>();
    selectedDepartment: Department | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get departmentsByName() {
        return Array.from(this.departmentRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    get groupedDepartments() {
        return Object.entries(
            this.departmentsByName.reduce((departments, department) => {
                const letter = department.name[0];
                departments[letter] = departments[letter] ? [...departments[letter], department] : [department];
                return departments;
            }, {} as {[key: string] : Department[]})
        )
    }

    loadDepartments = async () => {
        this.loadingInitial = true;
        try {
            const departments = await agent.Departments.list();
            departments.forEach(department => {
                this.setDepartment(department);
            })
            this.setLoadingInitial(false);
        } catch(error) {
            console.log("here is issue" + error);
            this.setLoadingInitial(false);
        }
    }

    loadDepartment = async (id: string) => {
        let department = this.getDepartment(id);
        if (department) {
            this.selectedDepartment = department;
            this.setLoadingInitial(false);
            return department;
        } else {
            this.loadingInitial = true;
            try {
                department = await agent.Departments.details(id);
                this.setDepartment(department);
                runInAction(() => {
                    this.selectedDepartment = department;
                })
                this.setLoadingInitial(false);
                return department;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
            this.loadingInitial = false;
        }
    }

    private setDepartment = (department: Department) => {
        this.departmentRegistry.set(department.id, department);
    }

    private getDepartment = (id: string) => {
        return this.departmentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createDepartment = async (department: Department) => {
        this.loading = true;
        try {
            await agent.Departments.create(department);
            runInAction(() => {
                this.departmentRegistry.set(department.id, department);
                this.selectedDepartment = department;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log("here is reeor" +error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateDepartment = async (department: Department) => {
        this.loading = true;
        try {
            await agent.Departments.update(department);
            runInAction(() => {
                this.departmentRegistry.set(department.id, department);
                this.selectedDepartment = department;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteDepartment = async (id: string) => {
        this.loading = true;
        console.log("this is is " + id)
        try {
            await agent.Departments.delete(id);
            runInAction(() => {
                this.departmentRegistry.delete(id);
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}