import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Subject } from "../models/subject";

export default class SubjectStore {
    subjectRegistry = new Map<string, Subject>();
    selectedSubject: Subject | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get subjectByName() {
        return Array.from(this.subjectRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    get groupedSubjects() {
        return Object.entries(
            this.subjectByName.reduce((subjects, subject) => {
                const letter = subject.name[0];
                subjects[letter] = subjects[letter] ? [...subjects[letter], subject] : [subject];
                return subjects;
            }, {} as {[key: string] : Subject[]})
        )
    }

    loadSubjects = async () => {
        this.loadingInitial = true;
        try {
            const subjects = await agent.Subjects.list();
            subjects.forEach(subject => {
                this.setSubject(subject);
            })
            this.setLoadingInitial(false);
        } catch(error) {
            console.log("here is issue" + error);
            this.setLoadingInitial(false);
        }
    }

    loadSubject = async (id: string) => {
        let subject = this.getSubject(id);
        if (subject) {
            this.selectedSubject = subject;
            this.setLoadingInitial(false);
            return subject;
        } else {
            this.loadingInitial = true;
            try {
                subject = await agent.Subjects.details(id);
                this.setSubject(subject);
                runInAction(() => {
                    this.selectedSubject = subject;
                })
                this.setLoadingInitial(false);
                return subject;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
            this.loadingInitial = false;
        }
    }

    private setSubject = (subject: Subject) => {
        this.subjectRegistry.set(subject.id, subject);
    }

    private getSubject = (id: string) => {
        return this.subjectRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createSubject = async (subject: Subject) => {
        this.loading = true;
        try {
            await agent.Subjects.create(subject);
            runInAction(() => {
                this.subjectRegistry.set(subject.id, subject);
                this.selectedSubject = subject;
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

    updateSubject = async (subject: Subject) => {
        this.loading = true;
        try {
            await agent.Subjects.update(subject);
            runInAction(() => {
                this.subjectRegistry.set(subject.id, subject);
                this.selectedSubject = subject;
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

    deleteSubject = async (id: string) => {
        this.loading = true;
        try {
            await agent.Subjects.delete(id);
            runInAction(() => {
                this.subjectRegistry.delete(id);
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
