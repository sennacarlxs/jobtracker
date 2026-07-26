import type { Application } from "@/lib/applications";
import { SidebarSectionLabel } from "@/components/layout/sidebar-section-label";
import { cn } from "@/lib/utils";

type SidebarSummaryProps = {
    applications: Application[];
};

const SidebarSummary = ({ applications }: SidebarSummaryProps) => {
    const inProgress = applications.filter(
        (application) => application.currentStage !== "Oferta" && application.currentStage !== "Recusado"
    ).length;
    const offers = applications.filter((application) => application.currentStage === "Oferta").length;
    const rejections = applications.filter((application) => application.currentStage === "Recusado").length;

    const rows = [
        { label: "Em andamento", count: inProgress, dotClassName: "bg-primary-100" },
        { label: "Ofertas", count: offers, dotClassName: "bg-success" },
        { label: "Recusas", count: rejections, dotClassName: "bg-error" },
    ];

    return (
        <div className="flex flex-col gap-2 py-4">
            <SidebarSectionLabel>Resumo</SidebarSectionLabel>
            <div className="flex flex-col gap-1.5 px-3">
                {rows.map((row) => (
                    <div key={row.label} className="flex items-center gap-1.5 px-1 text-xs">
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", row.dotClassName)} />
                        <span className="flex-1 text-text-200">{row.label}</span>
                        <span className="min-w-4 text-right font-light text-text-100 tabular-nums">
                            {row.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { SidebarSummary };
