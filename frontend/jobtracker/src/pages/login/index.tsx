import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FormField } from "@/components/ui/form-field";
import logo from "@/assets/logo.svg";
import { ApiError, login, register } from "@/lib/auth";

type Mode = "login" | "register";

const LoginAndRegister = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<Mode>("login");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const isLogin = mode === "login";

    const changeMode = (next: Mode) => {
        setMode(next);
        setError(null);
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const data = new FormData(e.currentTarget);
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        setLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Algo deu errado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background-default px-4 py-10">
            <div className="flex gap-2 items-center">
                <img src={logo} alt="" width={34} height={34} />
                <h1 className="text-xl font-bold text-text-100">Job Tracker</h1>
            </div>

            <div className="w-full max-w-100 rounded-[16px] bg-white p-7 shadow-sm">
                <div className="mb-6 flex rounded-[10px] bg-neutral-100 p-1">
                    <button
                        type="button"
                        onClick={() => changeMode("login")}
                        className={`flex-1 cursor-pointer rounded-[10px] py-2 text-xs font-semibold transition-colors ${
                            isLogin ? "bg-white text-text-100 shadow-sm" : "text-text-300"
                        }`}
                    >
                        Entrar
                    </button>
                    <button
                        type="button"
                        onClick={() => changeMode("register")}
                        className={`flex-1 cursor-pointer rounded-[10px] py-2 text-xs font-semibold transition-colors ${
                            !isLogin ? "bg-white text-text-100 shadow-sm" : "text-text-300"
                        }`}
                    >
                        Criar conta
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLogin && (
                        <FormField
                            label="Nome"
                            name="name"
                            type="text"
                            placeholder="Seu nome"
                            required
                            wrapperClassName="animate-in fade-in slide-in-from-top-1 duration-300"
                        />
                    )}

                    <FormField
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="voce@exemplo.com"
                        required
                    />

                    <FormField
                        label="Senha"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={isLogin ? undefined : 6}
                        hint={!isLogin ? "Mínimo de 6 caracteres." : undefined}
                    />

                    {isLogin && (
                        <a
                            href="#"
                            className="-mt-2 self-end text-xs font-medium text-primary-100 hover:text-primary-hover animate-in fade-in slide-in-from-top-1 duration-300"
                        >
                            Esqueci minha senha
                        </a>
                    )}

                    {error && (
                        <p className="text-xs font-medium text-error animate-in fade-in slide-in-from-top-1 duration-200">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 cursor-pointer rounded-[10px] bg-primary-100 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <span key={mode} className="inline-block animate-in fade-in duration-200">
                            {loading
                                ? isLogin ? "Entrando..." : "Criando conta..."
                                : isLogin ? "Entrar" : "Criar conta"}
                        </span>
                    </button>
                </form>
            </div>

            <p className="text-xs text-text-300">
                {isLogin ? "Ainda não tem conta? " : "Já tem conta? "}
                <button
                    type="button"
                    onClick={() => changeMode(isLogin ? "register" : "login")}
                    className="font-semibold cursor-pointer text-primary-100 hover:text-primary-hover"
                >
                    {isLogin ? "Criar conta" : "Entrar"}
                </button>
            </p>
        </main>
    );
};

export default LoginAndRegister;
