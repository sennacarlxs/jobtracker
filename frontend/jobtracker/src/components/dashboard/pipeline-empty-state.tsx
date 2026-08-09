import emptyState from "@/assets/empty-state.svg";
import { NewApplicationDialog } from "@/components/dashboard/new-application-dialog";
import type { Application } from "@/lib/applications";

type PipelineEmptyStateProps = {
    userId: string;
    onCreated: (application: Application) => void;
};

const PipelineEmptyState = ({ userId, onCreated }: PipelineEmptyStateProps) => {
    return (
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-[16px] bg-white px-8 py-12 text-center shadow-sm">
            <img src={emptyState} alt="" width={130} height={94} />
            <div className="flex flex-col gap-1">
                <h2 className="text-sm font-bold text-text-100">Nenhuma candidatura ainda</h2>
                <p className="text-xs text-text-300">
                    Acompanhe suas candidaturas em um único lugar — do envio do currículo até a oferta final.
                </p>
            </div>
            <NewApplicationDialog userId={userId} onCreated={onCreated} triggerLabel="Adicionar primeira candidatura" />
        </div>
    );
};

export { PipelineEmptyState };
