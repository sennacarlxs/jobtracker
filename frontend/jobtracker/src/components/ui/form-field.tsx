import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

type FormFieldProps = ComponentProps<"input"> & {
    label: string;
    hint?: string;
    wrapperClassName?: string;
};

function FormField({ label, hint, wrapperClassName, className, type, ...props }: FormFieldProps) {
    const isPassword = type === "password";
    const [visible, setVisible] = useState(false);

    return (
        <label className={cn("flex flex-col gap-1.5 text-xs font-medium text-text-100", wrapperClassName)}>
            {label}
            <div className="relative">
                <input
                    type={isPassword ? (visible ? "text" : "password") : type}
                    className={cn(
                        "w-full rounded-[10px] border border-neutral-200 px-3 py-2.5 text-xs text-text-100 outline-none placeholder:text-text-300 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20",
                        isPassword && "pr-9",
                        className
                    )}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-300 hover:text-text-100"
                        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {visible ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                )}
            </div>
            {hint && <span className="text-[10px] font-normal text-text-300">{hint}</span>}
        </label>
    );
}

export { FormField };
