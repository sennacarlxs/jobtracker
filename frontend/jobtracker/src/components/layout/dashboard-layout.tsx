import { Outlet, useNavigate } from "react-router-dom";

import { getSession, logout, type User } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardContext = {
    user: User;
};

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { user } = getSession()!;

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-background-default">
            <Sidebar user={user} onLogout={handleLogout} />
            <main className="flex-1 px-8 py-6">
                <Outlet context={{ user } satisfies DashboardContext} />
            </main>
        </div>
    );
};

export { DashboardLayout };
export type { DashboardContext };
