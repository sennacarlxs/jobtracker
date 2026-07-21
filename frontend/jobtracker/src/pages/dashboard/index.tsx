import { useNavigate } from "react-router-dom";

import { getSession, logout } from "@/lib/auth";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = getSession()!;

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background-default px-4">
            <h1 className="text-xl font-bold text-text-100">Olá, {user.name}!</h1>
            <p className="text-xs text-text-300">{user.email}</p>
            <button
                type="button"
                onClick={handleLogout}
                className="mt-2 cursor-pointer rounded-[10px] bg-primary-100 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
            >
                Sair
            </button>
        </main>
    );
};

export default Dashboard;
