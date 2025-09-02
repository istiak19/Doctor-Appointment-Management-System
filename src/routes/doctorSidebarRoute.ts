import { lazy } from "react";

const DoctorList = lazy(() => import("@/pages/DoctorList"));

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