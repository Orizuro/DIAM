import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "./styles/login.css";

function Login({ onClose }) {
    const auth = useAuth();
    const [mode, setMode] = useState("login"); // login or signup
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const stopPropagation = (e) => e.stopPropagation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (mode === "signup") {
            if (password !== confirmPassword) {
                setError("As senhas não coincidem.");
                return;
            }

            const result = await auth.signup(username, password);

            if (result.success) {
                // Show success message inside popup
                setSuccessMessage(result.message);
                // Clear inputs
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                // Optional: Switch back to login after a delay or let user manually switch
                // setTimeout(() => setMode("login"), 3000);
            } else {
                setError(result.message);
            }
            return;
        }

        // LOGIN mode
        try {
            const success = await auth.login(username, password);
            if (success) {
                onClose();
            } else {
                setError("Usuário ou senha inválidos.");
            }
        } catch {
            setError("Erro ao fazer login. Tente novamente.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={stopPropagation}>
                <h2>{mode === "login" ? "Login" : "Criar Conta"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="modal-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="modal-input"
                        required
                    />
                    {mode === "signup" && (
                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="modal-input"
                            required
                        />
                    )}

                    {error && <p className="error-message-login">{error}</p>}
                    {successMessage && <p className="success-message-login">{successMessage}</p>}

                    <button type="submit" className="modal-submit">
                        {mode === "login" ? "Entrar" : "Registrar"}
                    </button>

                    <p className="switch-text">
                        {mode === "login"
                            ? "Ainda não tem conta?"
                            : "Já tem uma conta?"}{" "}
                        <button
                            type="button"
                            className="switch-link"
                            onClick={() => {
                                setError("");
                                setSuccessMessage("");
                                setMode(mode === "login" ? "signup" : "login");
                            }}
                        >
                            {mode === "login" ? "Criar conta" : "Fazer login"}
                        </button>
                    </p>
                </form>

                <button className="modal-close" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default Login;
