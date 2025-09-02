import { role } from "@/constants/role";
import { doctorSidebarRoute } from "@/routes/doctorSidebarRoute";
import { patientSidebarRoute } from "@/routes/patientSidebarRoute";
import type { IRole } from "@/types";

export const getSideBar = (userRole: IRole) => {
    switch (userRole) {
        case role.patient:
            return [...patientSidebarRoute];
        case role.doctor:
            return [...doctorSidebarRoute];
        default:
            return [];
    }
};