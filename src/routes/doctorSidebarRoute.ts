import { lazy } from "react";

const DoctorDashboard = lazy(() => import("@/pages/doctor/DoctorDashboard"));

export const doctorSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Doctor Dashboard",
                url: "/doctor/dashboard",
                component: DoctorDashboard
            },

        ],
    },
];