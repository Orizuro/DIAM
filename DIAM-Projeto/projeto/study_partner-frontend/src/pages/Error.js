import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const ErrorPage = ({ code = "Error", title = "Something went wrong", message = "An unexpected error occurred." }) => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1 className="error-code">{code}</h1>
      <p className="error-message">{title}</p>
      <p className="error-description">{message}</p>
      <button className="error-button" onClick={() => navigate("/")}>
        Voltar para a Página principal
      </button>
    </div>
  );
};

export default ErrorPage;
