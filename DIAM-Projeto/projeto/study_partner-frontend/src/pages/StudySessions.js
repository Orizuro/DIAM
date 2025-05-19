// pages/SessoesPage.js
import React, { useState } from "react";
import "./styles/StudySessions.css";
import TodasSessoes from "../components/TodasSessoes";
import MinhasSessoes from "../components/MinhasSessoes";
import { useAuth } from "../hooks/AuthProvider";

const StudySessions = () => {
    const auth = useAuth();
    const [activeTab, setActiveTab] = useState("todas");

    return (
        <div className="sessoes-page">
            <div className="tabs">
                <button
                    className={activeTab === "todas" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("todas")}
                >
                    Todas as Sessões
                </button>
                {
                    auth.isAuthenticated &&
                    <button
                        className={activeTab === "minhas" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("minhas")}
                    >
                        As Minhas Sessões
                    </button>
                }
            </div>

            <div className="tab-content">
                {activeTab === "todas" ? <TodasSessoes /> : <MinhasSessoes />}
            </div>
        </div>
    );
};

export default StudySessions;
