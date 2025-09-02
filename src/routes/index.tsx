import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import Home from "@/pages/Home";
import type { IRole } from "@/types";
import { generateRoutes } from "@/utils/generatingRoute";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { patientSidebarRoute } from "./patientSidebarRoute";
import { doctorSidebarRoute } from "./doctorSidebarRoute";
import { lazy } from "react";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: "/patient",
    Component: withAuth(DashboardLayout, role.patient as IRole),
    children: [
      {
        index: true, element: <Navigate to="/patient/dashboard" />
      },
      ...generateRoutes(patientSidebarRoute)
    ]
  },
  {
    path: "/doctor",
    Component: withAuth(DashboardLayout, role.doctor as IRole),
    children: [
      {
        index: true, element: <Navigate to="/doctor/dashboard" />
      },
      ...generateRoutes(doctorSidebarRoute)
    ]
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/register",
    Component: Register
  },
  {
    path: "/unauthorized",
    Component: Unauthorized
  },
  {
    path: "*",
    Component: NotFound
  }
]);

export default router;