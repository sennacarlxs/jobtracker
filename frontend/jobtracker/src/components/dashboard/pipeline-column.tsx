import { Plus } from "lucide-react";

import type { Application, ApplicationStage } from "@/lib/applications";
import { getStageDotColor } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ApplicationCard } from "@/components/dashboard/application-card";
import { NewApplicationDialog } from "@/components/dashboard/new-application-dialog";

type PipelineColumnProps = {
    stage: ApplicationStage;
    applications: Application[];
    userId: string;
    onApplicationCreated: (application: Application) => void;
    draggingId: string | null;
    isDragOver: boolean;
    onDragStartCard: (id: string) => void;
    onDragEndCard: () => void;
    onDragOverColumn: () => void;
    onDropColumn: (id: string) => void;
};

const PipelineColumn = ({
    stage,
    applications,
    userId,
    onApplicationCreated,
    draggingId,
    isDragOver,
    onDragStartCard,
    onDragEndCard,
    onDragOverColumn,
    onDropColumn,
}: PipelineColumnProps) => {
    const showDropPlaceholder =
        draggingId !== null && isDragOver && !applications.some((application) => application.id === draggingId);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                onDragOverColumn();
            }}
            onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) onDropColumn(id);
            }}
            className={cn(
                "flex flex-col gap-3 rounded-[10px] p-3 transition-colors",
                isDragOver ? "bg-primary-100/10 ring-1 ring-primary-100" : "bg-[#EFEFF1]"
            )}
        >
            <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", getStageDotColor(stage))} />
                    <span className="text-[11px] font-semibold tracking-wide text-text-200 uppercase">{stage}</span>
                    <span className="text-[11px] font-semibold text-text-300">{applications.length}</span>
                </div>
                <NewApplicationDialog
                    userId={userId}
                    onCreated={onApplicationCreated}
                    defaultStage={stage}
                    triggerLabel={<Plus size={12} />}
                    triggerClassName="flex h-5 w-5 items-center justify-center rounded-md bg-transparent p-0 text-text-300 hover:bg-primary-100/10 hover:text-primary-100"
                />
            </div>

            <div className="flex flex-col gap-3">
                {applications.map((application) => (
                    <ApplicationCard
                        key={application.id}
                        application={application}
                        isDragging={draggingId === application.id}
                        onDragStart={onDragStartCard}
                        onDragEnd={onDragEndCard}
                    />
                ))}
                {showDropPlaceholder && (
                    <div className="flex items-center justify-center rounded-[14px] border border-dashed border-primary-100 py-3 text-xs font-medium text-primary-100">
                        Solte aqui
                    </div>
                )}
            </div>
        </div>
    );
};

export { PipelineColumn };
