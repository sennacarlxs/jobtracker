import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import type { DashboardContext } from "@/components/layout/dashboard-layout";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { PipelineEmptyState } from "@/components/dashboard/pipeline-empty-state";
import { PipelineToolbar, type StageFilter } from "@/components/dashboard/pipeline-toolbar";

const Dashboard = () => {
    const { user, applications, addApplication, moveApplication } = useOutletContext<DashboardContext>();
    const [search, setSearch] = useState("");
    const [activeStage, setActiveStage] = useState<StageFilter>("all");

    const searchTerm = search.trim().toLowerCase();
    const searchFiltered = applications.filter(
        (application) =>
            !searchTerm ||
            application.companyName.toLowerCase().includes(searchTerm) ||
            application.role.toLowerCase().includes(searchTerm)
    );
    const visibleApplications =
        activeStage === "all"
            ? searchFiltered
            : searchFiltered.filter((application) => application.currentStage === activeStage);

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
                <>
                    <PipelineToolbar
                        applications={searchFiltered}
                        search={search}
                        onSearchChange={setSearch}
                        activeStage={activeStage}
                        onActiveStageChange={setActiveStage}
                    />

                    {searchTerm && visibleApplications.length === 0 && (
                        <p className="text-center text-xs text-text-300">
                            Nenhuma candidatura encontrada para "{search.trim()}".
                        </p>
                    )}

                    <PipelineBoard
                        applications={visibleApplications}
                        userId={user.id}
                        activeStage={activeStage}
                        onApplicationCreated={addApplication}
                        onApplicationMoved={moveApplication}
                    />
                </>
            )}
        </div>
    );
};

export default Dashboard;
