import React, { useState } from "react";
import "./TodasSessoes.css";

const TodasSessoes = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="todas-sessoes">
            <p className="intro-text">
                Cada unidade curricular possui um canal de discussão. Podes participar, a qualquer momento, no
                canal de discussão da unidade curricular e ainda, agendar sessões de estudo futuras.
            </p>
            <input
                type="text"
                placeholder="Pesquisar sessões..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
        </div>
    );
};

export default TodasSessoes;
