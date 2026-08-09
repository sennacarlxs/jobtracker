import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getSession } from "@/lib/auth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    if (!getSession()) return <Navigate to="/" replace />;
    return children;
};

const GuestRoute = ({ children }: { children: ReactNode }) => {
    if (getSession()) return <Navigate to="/dashboard" replace />;
    return children;
};

export { PrivateRoute, GuestRoute };
