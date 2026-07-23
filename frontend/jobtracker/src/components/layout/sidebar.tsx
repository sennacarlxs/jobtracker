import logo from "@/assets/logo.svg";
import type { User } from "@/lib/auth";
import type { Application } from "@/lib/applications";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { NewApplicationDialog } from "@/components/dashboard/new-application-dialog";

type SidebarProps = {
    user: User;
    onLogout: () => void;
    onApplicationCreated: (application: Application) => void;
};

const Sidebar = ({ user, onLogout, onApplicationCreated }: SidebarProps) => {
    return (
        <aside className="flex h-screen w-61 shrink-0 flex-col border-r border-neutral-200 bg-white">
            <div className="flex items-center gap-2 px-5 py-5">
                <img src={logo} alt="" width={28} height={28} />
                <span className="text-lg font-bold text-text-100">Job Tracker</span>
            </div>

            <div className="px-3 pb-2">
                <NewApplicationDialog userId={user.id} onCreated={onApplicationCreated} triggerClassName="w-full" />
            </div>

            <SidebarNav />

            <div className="mt-auto flex items-center gap-2 border-t border-neutral-200 px-5 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-text-100">{user.name}</p>
                    <p className="truncate text-[11px] text-text-300">{user.email}</p>
                </div>
                <button
                    type="button"
                    onClick={onLogout}
                    className="shrink-0 cursor-pointer text-xs font-medium text-text-300 hover:text-error"
                >
                    Sair
                </button>
            </div>
        </aside>
    );
};

export { Sidebar };
