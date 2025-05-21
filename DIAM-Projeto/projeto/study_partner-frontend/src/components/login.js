import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Signup from "./Signup";
import "./styles/login.css";

function Login({ onClose }) {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const stopPropagation = (e) => e.stopPropagation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Heloooolloo")
    try {
      const success = await auth.login(username, password);
      if (success) {
        onClose();
      } else {
        setError("utilizador ou senha inválidos.");
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  if (!isLogin)
    return <Signup onClose={onClose} />;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={stopPropagation}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Utilizador"
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

          {error && <p className="error-message-login">{error}</p>}
          {successMessage && <p className="success-message-login">{successMessage}</p>}

          <button type="submit" className="modal-submit">
            Entrar
          </button>

          <p className="switch-text">
            Ainda não tem conta?{" "}
            <button
              type="button"
              className="switch-link"
              onClick={() => {
                setError("");
                setSuccessMessage("");
                setIsLogin(false);
              }}
            >
              Criar conta
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
