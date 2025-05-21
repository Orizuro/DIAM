import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import Login from "./login";
import "./styles/login.css";

const Signup = ({ onClose }) => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true);


  const stopPropagation = (e) => e.stopPropagation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const response = await auth.signup(
      {
        email,
        username,
        firstName,
        lastName,
        course,
        password
      }
    );

    if (response.success) {
      // Show success message inside popup
      setSuccessMessage(response.message);

      // Clear inputs
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setCourse("");
      setFirstName("");
      setLastName("");
      setIsSignup(false);
    } else {
      setError(response.message);
    }

    return;

  };

  if (!isSignup)
    return <Login onClose={onClose} />;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={stopPropagation}>
        <h2>Criar Conta</h2>
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
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="modal-input"
            required
          />

          <input
            type="Curso"
            placeholder="Curso"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="modal-input"
            required
          />

          <input
            type="Primeiro nome"
            placeholder="Primeiro nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="modal-input"
            required
          />

          <input
            type="Último nome"
            placeholder="Último nome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="modal-input"
            required
          />

          {error && <p className="error-message-login">{error}</p>}
          {successMessage && <p className="success-message-login">{successMessage}</p>}

          <button type="submit" className="modal-submit">
            Registrar
          </button>

          <p className="switch-text">
            Já tem uma conta?{" "}
            <button
              type="button"
              className="switch-link"
              onClick={() => {
                setError("");
                setSuccessMessage("");
                setIsSignup(false);
              }}
            >
              Fazer login
            </button>
          </p>
        </form>
      </div>
    </div >
  );
}

export default Signup;
