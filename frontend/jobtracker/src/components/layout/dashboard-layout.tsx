import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getSession, logout, type User } from "@/lib/auth";
import { listApplications, updateApplicationStage, type Application, type ApplicationStage } from "@/lib/applications";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardContext = {
    user: User;
    applications: Application[];
    addApplication: (application: Application) => void;
    moveApplication: (id: string, stage: ApplicationStage) => void;
};

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { user } = getSession()!;
    const [applications, setApplications] = useState<Application[]>(() => listApplications(user.id));

    const addApplication = (application: Application) => {
        setApplications((prev) => [application, ...prev]);
    };

    const moveApplication = (id: string, stage: ApplicationStage) => {
        const updated = updateApplicationStage(id, stage);
        if (!updated) return;
        setApplications((prev) => prev.map((application) => (application.id === id ? updated : application)));
    };

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-background-default">
            <Sidebar user={user} onLogout={handleLogout} onApplicationCreated={addApplication} />
            <main className="min-w-0 flex-1 px-10 py-5">
                <Outlet context={{ user, applications, addApplication, moveApplication } satisfies DashboardContext} />
            </main>
        </div>
    );
};

export { DashboardLayout };
export type { DashboardContext };
