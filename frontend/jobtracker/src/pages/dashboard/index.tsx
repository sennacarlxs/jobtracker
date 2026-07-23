import { useOutletContext } from "react-router-dom";

import type { DashboardContext } from "@/components/layout/dashboard-layout";

const Dashboard = () => {
    const { user } = useOutletContext<DashboardContext>();

    return (
        <div>
            <h1 className="text-xl font-bold text-text-100">Pipeline</h1>
            <p className="text-xs text-text-300">Em breve.</p>
        </div>
    );
};

export default Dashboard;
