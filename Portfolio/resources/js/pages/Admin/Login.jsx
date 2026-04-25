import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [step, setStep] = useState("login"); // login, mfa
    const [mfaCode, setMfaCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (step === "login") {
                await fetch("/sanctum/csrf-cookie");
                const res = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(credentials)
                });

                const data = await res.json();
                if (res.ok && data.mfa_required) {
                    setStep("mfa");
                    setSuccessMessage(data.message);
                } else {
                    setError(data.errors?.email || "Credenciais inválidas.");
                }
            } else {
                const res = await fetch("/api/verify-mfa", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email: credentials.email, code: mfaCode })
                });

                if (res.ok) {
                    navigate("/admin");
                } else {
                    const data = await res.json();
                    setError(data.errors?.code || "Código inválido.");
                }
            }
        } catch (err) {
            setError("Erro ao conectar com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 font-mono text-xs uppercase tracking-widest">
                        <ArrowLeft size={14} /> voltarao_site
                    </Link>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mx-auto mb-6">
                        <ShieldCheck size={32} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold font-mono tracking-tighter mb-2">Portfolio OS</h1>
                    <p className="text-muted-foreground text-sm font-mono italic">Acesso Restrito — Nível 1</p>
                </div>

                <div className="bg-charcoal/50 border border-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-mono flex items-center gap-3 animate-shake">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {error}
                            </div>
                        )}

                        {step === "login" ? (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-primary uppercase tracking-widest block font-bold px-1 font-mono">Endereço de E-mail</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                        <input 
                                            type="email" 
                                            placeholder="admin@malobr.com"
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-primary/40 transition-all font-mono text-sm"
                                            value={credentials.email}
                                            onChange={e => setCredentials({...credentials, email: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-primary uppercase tracking-widest block font-bold px-1 font-mono">Chave de Acesso</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                        <input 
                                            type="password" 
                                            placeholder="••••••••"
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-primary/40 transition-all font-mono text-sm"
                                            value={credentials.password}
                                            onChange={e => setCredentials({...credentials, password: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl mb-6 text-center">
                                    <p className="text-[10px] text-primary font-mono mb-0 uppercase tracking-widest">{successMessage}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] text-primary uppercase tracking-widest block font-bold px-1 font-mono">Código MFA de 6 dígitos</label>
                                    <input 
                                        type="text" 
                                        maxLength="6"
                                        placeholder="000 000"
                                        required
                                        autoFocus
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-6 outline-none focus:border-primary/40 transition-all font-mono text-3xl text-center tracking-[0.3em]"
                                        value={mfaCode}
                                        onChange={e => setMfaCode(e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="btn-luxury w-full py-4 rounded-2xl flex items-center justify-center gap-3 group overflow-hidden"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span className="font-mono text-sm">
                                        {step === "login" ? "solicitar_acesso" : "verificar_identidade"}
                                    </span>
                                    <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-12 text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
                    Secure Socket Layer Active — Porto 8001
                </p>
            </div>
        </div>
    );
};

export default Login;
