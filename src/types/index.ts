import type { ComponentType } from "react";

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType;
    }[];
};

export type IRole = "PATIENT" | "DOCTOR";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "PATIENT" | "DOCTOR";
    photo_url: string | null;
    specialization: string | null;
};