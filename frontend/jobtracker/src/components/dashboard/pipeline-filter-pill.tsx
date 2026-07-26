import { cn } from "@/lib/utils";

type PipelineFilterPillProps = {
    label: string;
    count: number;
    active: boolean;
    dotClassName: string;
    onClick: () => void;
};

const PipelineFilterPill = ({ label, count, active, dotClassName, onClick }: PipelineFilterPillProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active
                    ? "border-text-100 bg-text-100 text-white"
                    : "border-neutral-200 bg-white text-text-200 hover:border-neutral-300"
            )}
        >
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", active ? "bg-white/70" : dotClassName)} />
            {label}
            <span className={active ? "text-white/70" : "text-text-300"}>{count}</span>
        </button>
    );
};

export { PipelineFilterPill };
