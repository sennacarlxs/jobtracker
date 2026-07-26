import { Search } from "lucide-react";

import { STAGES, type Application, type ApplicationStage } from "@/lib/applications";
import { getStageDotColor } from "@/lib/format";
import { PipelineFilterPill } from "@/components/dashboard/pipeline-filter-pill";

type StageFilter = "all" | ApplicationStage;

type PipelineToolbarProps = {
    applications: Application[];
    search: string;
    onSearchChange: (value: string) => void;
    activeStage: StageFilter;
    onActiveStageChange: (stage: StageFilter) => void;
};

const PipelineToolbar = ({
    applications,
    search,
    onSearchChange,
    activeStage,
    onActiveStageChange,
}: PipelineToolbarProps) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="relative max-w-sm">
                <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-300" size={14} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar empresa ou cargo..."
                    className="w-full rounded-[10px] border border-neutral-200 py-2.5 pr-3 pl-9 text-xs text-text-100 outline-none placeholder:text-text-300 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <PipelineFilterPill
                    label="Todos"
                    count={applications.length}
                    active={activeStage === "all"}
                    dotClassName="bg-text-300"
                    onClick={() => onActiveStageChange("all")}
                />
                {STAGES.map((stage) => (
                    <PipelineFilterPill
                        key={stage}
                        label={stage}
                        count={applications.filter((application) => application.currentStage === stage).length}
                        active={activeStage === stage}
                        dotClassName={getStageDotColor(stage)}
                        onClick={() => onActiveStageChange(stage)}
                    />
                ))}
            </div>
        </div>
    );
};

export { PipelineToolbar };
export type { StageFilter };
