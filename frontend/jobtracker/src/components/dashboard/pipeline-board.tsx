import { useState } from "react";

import { STAGES, type Application, type ApplicationStage } from "@/lib/applications";
import { PipelineColumn } from "@/components/dashboard/pipeline-column";
import type { StageFilter } from "@/components/dashboard/pipeline-toolbar";

type PipelineBoardProps = {
    applications: Application[];
    userId: string;
    activeStage: StageFilter;
    onApplicationCreated: (application: Application) => void;
    onApplicationMoved: (id: string, stage: ApplicationStage) => void;
};

const PipelineBoard = ({
    applications,
    userId,
    activeStage,
    onApplicationCreated,
    onApplicationMoved,
}: PipelineBoardProps) => {
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverStage, setDragOverStage] = useState<ApplicationStage | null>(null);

    const resetDragState = () => {
        setDraggingId(null);
        setDragOverStage(null);
    };

    const visibleStages = activeStage === "all" ? STAGES : [activeStage];

    return (
        <div className="grid grid-cols-3 gap-4">
            {visibleStages.map((stage) => (
                <PipelineColumn
                    key={stage}
                    stage={stage}
                    applications={applications.filter((application) => application.currentStage === stage)}
                    userId={userId}
                    onApplicationCreated={onApplicationCreated}
                    draggingId={draggingId}
                    isDragOver={dragOverStage === stage}
                    onDragStartCard={setDraggingId}
                    onDragEndCard={resetDragState}
                    onDragOverColumn={() => setDragOverStage(stage)}
                    onDropColumn={(id) => {
                        onApplicationMoved(id, stage);
                        resetDragState();
                    }}
                />
            ))}
        </div>
    );
};

export { PipelineBoard };
