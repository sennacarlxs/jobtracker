import type { ReactNode } from "react";

const SidebarSectionLabel = ({ children }: { children: ReactNode }) => (
    <p className="px-3 text-[11px] font-semibold tracking-wide text-text-300 uppercase">{children}</p>
);

export { SidebarSectionLabel };
