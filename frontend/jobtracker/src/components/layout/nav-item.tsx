import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

type NavItemProps = {
    to: string;
    activeIcon: string;
    inactiveIcon: string;
    label: string;
    end?: boolean;
    badge?: number;
};

const NavItem = ({ to, activeIcon, inactiveIcon, label, end, badge }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-2 rounded-[10px] px-3 py-2 text-xs font-semibold transition-colors",
                    isActive ? "bg-primary-100/10 text-primary-100" : "text-text-200 hover:bg-neutral-100"
                )
            }
        >
            {({ isActive }) => (
                <>
                    <img src={isActive ? activeIcon : inactiveIcon} alt="" width={14} height={14} />
                    <span className="flex-1">{label}</span>
                    {badge !== undefined && (
                        <span
                            className={cn(
                                "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                                isActive ? "bg-primary-100/15 text-primary-100" : "bg-neutral-100 text-text-300"
                            )}
                        >
                            {badge}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
};

export { NavItem };
