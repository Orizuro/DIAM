import React, {useState} from "react";
import './MinhasSessoes.css'
import Calendar from "react-calendar";
const MinhasSessoes = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className="minhas-sessoes-wrapper">
            <p className="intro-text">
                Nesta secção encontras o registo de todas as unidades curriculares nas quais já participaste em
                sessões de estudo passadas e todas as unidades currículares com sessões de estudo agendadas.
                Ainda, podes cancelar e criar agendamentos.
            </p>
            <div className="minhas-sessoes-container">
                <div className="minhas-sessoes-column">
                    <h3>Unidades Curriculares com sessões de estudo passadas e futuras</h3>
                    {/* Conteúdo futuro */}
                </div>

                <div className="vertical-divider" />

                <div className="minhas-sessoes-column">
                    <h3>Calendário de Agendamentos</h3>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default MinhasSessoes;
