import { useState, type FormEvent } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { CurrencyField } from "@/components/ui/currency-field";
import { STAGES, createApplication, type Application, type ApplicationStage } from "@/lib/applications";
import { cn } from "@/lib/utils";

type NewApplicationDialogProps = {
    userId: string;
    onCreated: (application: Application) => void;
    triggerLabel?: string;
    triggerClassName?: string;
};

const NewApplicationDialog = ({
    userId,
    onCreated,
    triggerLabel = "+ Nova candidatura",
    triggerClassName,
}: NewApplicationDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const tagsRaw = data.get("tags") as string;
        const createdAt = data.get("createdAt") as string;

        const application = createApplication(userId, {
            companyName: data.get("companyName") as string,
            role: data.get("role") as string,
            currentStage: data.get("currentStage") as ApplicationStage,
            jobUrl: data.get("jobUrl") as string,
            estimatedSalary: data.get("estimatedSalary") as string,
            tags: tagsRaw
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            createdAt: createdAt ? new Date(createdAt).toISOString() : undefined,
        });

        onCreated(application);
        e.currentTarget.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className={cn(
                            "cursor-pointer rounded-[10px] bg-primary-100 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover",
                            triggerClassName
                        )}
                    />
                }
            >
                {triggerLabel}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Nova candidatura</DialogTitle>
                    <DialogDescription>Cadastre uma vaga para acompanhar no pipeline.</DialogDescription>
                </DialogHeader>

                <form key={String(open)} onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <FormField label="Empresa" name="companyName" placeholder="Ex: Nimbus Cloud" required />
                    <FormField label="Cargo" name="role" placeholder="Ex: Frontend Engineer" required />

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Link da vaga" name="jobUrl" placeholder="https://" />
                        <CurrencyField label="Salário estimado" name="estimatedSalary" placeholder="R$ 0,00" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-text-100">Status inicial</label>
                            <Select name="currentStage" defaultValue="Aplicado">
                                <SelectTrigger className="w-full text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STAGES.map((stage) => (
                                        <SelectItem key={stage} value={stage}>
                                            {stage}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <FormField label="Data" name="createdAt" type="date" />
                    </div>

                    <FormField label="Tags (separadas por vírgula)" name="tags" placeholder="Ex: React, Remoto" />

                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline" />}>Cancelar</DialogClose>
                        <Button type="submit" className="bg-primary-100 text-white hover:bg-primary-hover">
                            Adicionar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export { NewApplicationDialog };
