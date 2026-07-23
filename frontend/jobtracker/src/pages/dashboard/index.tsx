import { useOutletContext } from "react-router-dom";

import type { DashboardContext } from "@/components/layout/dashboard-layout";
import { ApplicationCard } from "@/components/dashboard/application-card";
import { PipelineEmptyState } from "@/components/dashboard/pipeline-empty-state";

const Dashboard = () => {
    const { user, applications, addApplication } = useOutletContext<DashboardContext>();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-xl font-bold text-text-100">Pipeline de candidaturas</h1>
                <p className="text-xs text-text-300">
                    {applications.length === 0
                        ? "Comece adicionando sua primeira candidatura."
                        : `${applications.length} candidatura${applications.length === 1 ? "" : "s"}`}
                </p>
            </div>

            {applications.length === 0 ? (
                <PipelineEmptyState userId={user.id} onCreated={addApplication} />
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {applications.map((application) => (
                        <ApplicationCard key={application.id} application={application} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
