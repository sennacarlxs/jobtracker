import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getSession, logout, type User } from "@/lib/auth";
import { listApplications, type Application } from "@/lib/applications";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardContext = {
    user: User;
    applications: Application[];
    addApplication: (application: Application) => void;
};

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { user } = getSession()!;
    const [applications, setApplications] = useState<Application[]>(() => listApplications(user.id));

    const addApplication = (application: Application) => {
        setApplications((prev) => [application, ...prev]);
    };

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-background-default">
            <Sidebar user={user} onLogout={handleLogout} onApplicationCreated={addApplication} />
            <main className="flex-1 px-8 py-6">
                <Outlet context={{ user, applications, addApplication } satisfies DashboardContext} />
            </main>
        </div>
    );
};

export { DashboardLayout };
export type { DashboardContext };
