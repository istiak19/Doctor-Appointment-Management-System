import type { IRole } from "@/types";
import type { ComponentType } from "react";
import { useLocation, Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: IRole) => {
    return function AuthWrapper() {
        const location = useLocation();

        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!token || !user?.email) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location.pathname }}
                    replace
                />
            );
        }

        if (requiredRole && requiredRole !== user.role) {
            return <Navigate to="/unauthorized" replace />;
        }

        return <Component />;
    };
};