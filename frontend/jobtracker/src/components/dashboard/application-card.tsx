import type { DragEvent } from "react";

import type { Application } from "@/lib/applications";
import { getInitials, formatRelativeDate, getAvatarColor } from "@/lib/format";
import { cn } from "@/lib/utils";

type ApplicationCardProps = {
    application: Application;
    isDragging?: boolean;
    onDragStart?: (id: string) => void;
    onDragEnd?: () => void;
};

const ApplicationCard = ({ application, isDragging, onDragStart, onDragEnd }: ApplicationCardProps) => {
    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", application.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.(application.id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            className={cn(
                "flex cursor-grab flex-col gap-3 rounded-[14px] border border-neutral-200 bg-white p-4 transition-shadow hover:border-text-300/30 hover:shadow-sm active:cursor-grabbing",
                isDragging && "opacity-40"
            )}
        >
            <div className="flex items-start gap-3">
                <div
                    className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-xs font-semibold text-white",
                        getAvatarColor(application.companyName)
                    )}
                >
                    {getInitials(application.companyName)}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-100">{application.companyName}</p>
                    <p className="truncate text-xs text-text-300">{application.role}</p>
                </div>
            </div>

            {application.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {application.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-text-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-text-300">
                <span>{formatRelativeDate(application.createdAt)}</span>
                {application.estimatedSalary && <span>{application.estimatedSalary}</span>}
            </div>
        </div>
    );
};

export { ApplicationCard };
