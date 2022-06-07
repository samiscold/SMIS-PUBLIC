import axios, { AxiosResponse } from 'axios'
import { Country } from '../models/country';
import { Department } from '../models/department';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:16938/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Countries = {
    list: () => requests.get<Country[]>('/countries'),
    details: (id: string) => requests.get<Country>(`/countries/${id}`),
    create: (country: Country) => requests.post<void>('/countries', country),
    update: (country: Country) => requests.put<void>(`/countries/${country.id}`, country),
    delete: (id: string) => requests.del<void>(`/countries/${id}`)
}

const Departments = {
    list: () => requests.get<Department[]>('/departments'),
    details: (id: string) => requests.get<Department>(`/departments/${id}`),
    create: (department: Department) => requests.post<void>('/departments', department),
    update: (department: Department) => requests.put<void>(`/departments/${department.id}`, department),
    delete: (id: string) => requests.del<void>(`/departments/${id}`)
}

const agent = {
    Countries,
    Departments
}

export default agent;