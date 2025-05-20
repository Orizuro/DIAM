import React, { useEffect, useState } from "react";
import UcCard from "../components/UsCard";
import './styles/MinhasSessoes.css'
import Calendar from "react-calendar";
import { DELETE_SESSION_URL, getLocalDateString, GET_CHANNELS_BY_SESSIONS_URL } from "../Constants";
import axios from "axios";

const MinhasSessoes = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myUcs, setMyUcs] = useState([]);

  const getSessions = async () => {
    const date = getLocalDateString(selectedDate);
    try {
      const response = await axios.post(
        GET_CHANNELS_BY_SESSIONS_URL, { date: date },
        { withCredentials: true }
      );
      setMyUcs(response.data.channels || []);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const deleteSession = async (channel_id) => {
    const date = getLocalDateString(selectedDate);
    try {
      await axios.post(
        DELETE_SESSION_URL,
        {
          uc: channel_id,
          date_time: date,
        },
        { withCredentials: true }
      );

      await getSessions();
    } catch (error) {
      console.error('Error deleting session: ', error);
      alert('Error deleting session.');
    }
  };

  useEffect(() => {
    getSessions();
  }, [selectedDate]);

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
          <div className="uc-grid">
            {
              myUcs.length !== 0 ?
                myUcs.map((uc, ind) => (
                  <a onClick={() => deleteSession(uc.code)}>

                    <UcCard
                      key={ind}
                      name={uc.name}
                      description={uc.description}
                      code={uc.code}
                    />
                  </a>
                ))
                :
                <p>Não há sessões neste dia</p>
            }
          </div>
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
