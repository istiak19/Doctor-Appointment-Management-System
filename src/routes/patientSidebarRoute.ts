import { lazy } from "react";

const DoctorList = lazy(() => import("@/pages/patient/DoctorList"));
const MyAppointments = lazy(() => import("@/pages/patient/MyAppointments"));

export const patientSidebarRoute = [
    {
        title: "DashBoard",
        items: [
            {
                title: "Doctor List",
                url: "/patient/dashboard",
                component: DoctorList
            },
            {
                title: "My Appointments",
                url: "/patient/appointments",
                component: MyAppointments
            },
        ],
    },
];