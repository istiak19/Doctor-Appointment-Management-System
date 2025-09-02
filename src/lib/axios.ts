/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type InternalAxiosRequestConfig } from "axios";
import config from "@/config";

export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (cfg: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            cfg.headers = {
                ...cfg.headers,
                Authorization: `Bearer ${token}`,
            } as any;
        }
        return cfg;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);