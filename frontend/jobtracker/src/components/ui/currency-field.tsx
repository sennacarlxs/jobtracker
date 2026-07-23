import { useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

type CurrencyFieldProps = Omit<ComponentProps<"input">, "type" | "onChange" | "value"> & {
    label: string;
    wrapperClassName?: string;
};

function formatBRL(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";

    const cents = digits.padStart(3, "0");
    const intPart = cents.slice(0, -2).replace(/^0+(?=\d)/, "");
    const centPart = cents.slice(-2);
    const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${withThousands},${centPart}`;
}

const CurrencyField = ({ label, wrapperClassName, className, defaultValue, ...props }: CurrencyFieldProps) => {
    const [value, setValue] = useState(() => formatBRL(typeof defaultValue === "string" ? defaultValue : ""));

    return (
        <label className={cn("flex flex-col gap-1.5 text-xs font-medium text-text-100", wrapperClassName)}>
            {label}
            <input
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => setValue(formatBRL(e.target.value))}
                className={cn(
                    "w-full rounded-[10px] border border-neutral-200 px-3 py-2.5 text-xs text-text-100 outline-none placeholder:text-text-300 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20",
                    className
                )}
                {...props}
            />
        </label>
    );
};

export { CurrencyField };
