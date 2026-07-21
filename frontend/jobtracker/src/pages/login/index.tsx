import { useState, type SubmitEvent } from "react";

import { FormField } from "@/components/ui/form-field";
import logo from "@/assets/logo.svg";

type Mode = "login" | "register";

const LoginAndRegister = () => {
    const [mode, setMode] = useState<Mode>("login");
    const isLogin = mode === "login";

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        onClick={() => setMode("login")}
                        className={`flex-1 cursor-pointer rounded-[10px] py-2 text-xs font-semibold transition-colors ${
                            isLogin ? "bg-white text-text-100 shadow-sm" : "text-text-300"
                        }`}
                    >
                        Entrar
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("register")}
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
                            type="text"
                            placeholder="Seu nome"
                            required
                            wrapperClassName="animate-in fade-in slide-in-from-top-1 duration-300"
                        />
                    )}

                    <FormField
                        label="E-mail"
                        type="email"
                        placeholder="voce@exemplo.com"
                        required
                    />

                    <FormField
                        label="Senha"
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

                    <button
                        type="submit"
                        className="mt-2 cursor-pointer rounded-[10px] bg-primary-100 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        <span key={mode} className="inline-block animate-in fade-in duration-200">
                            {isLogin ? "Entrar" : "Criar conta"}
                        </span>
                    </button>
                </form>
            </div>

            <p className="text-xs text-text-300">
                {isLogin ? "Ainda não tem conta? " : "Já tem conta? "}
                <button
                    type="button"
                    onClick={() => setMode(isLogin ? "register" : "login")}
                    className="font-semibold cursor-pointer text-primary-100 hover:text-primary-hover"
                >
                    {isLogin ? "Criar conta" : "Entrar"}
                </button>
            </p>
        </main>
    );
};

export default LoginAndRegister;
