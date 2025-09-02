import { lazy } from "react";

const DoctorList = lazy(() => import("@/pages/patient/DoctorList"));

export const doctorSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Doctor List",
                url: "/doctor/dashboard",
                component: DoctorList
            },

        ],
    },
];