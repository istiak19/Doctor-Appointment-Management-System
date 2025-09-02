import { lazy } from "react";

const DoctorList = lazy(() => import("@/pages/patient/DoctorList"));

export const patientSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Doctor List",
                url: "/patient/dashboard",
                component: DoctorList
            },

        ],
    },
];