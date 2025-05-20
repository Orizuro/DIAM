import React, { useEffect, useState } from "react";
import UcCard from "../components/UsCard";
import './styles/MinhasSessoes.css'
import Calendar from "react-calendar";
import {
  DELETE_SESSION_URL,
  getLocalDateString,
  GET_CHANNELS_BY_SESSIONS_URL,
  GET_SESSIONS_URL
} from "../Constants";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const MinhasSessoes = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myUcs, setMyUcs] = useState([]);
  const [daySessions, setDaySessions] = useState([]); // ✅ corrected name
  const auth = useAuth();

  // Filter for unique UCs
  const uniqueUcsMap = new Map();
  myUcs.forEach((session) => {
    const { uc_code } = session;
    if (!uniqueUcsMap.has(uc_code)) {
      uniqueUcsMap.set(uc_code, {
        uc_name: session.uc_name,
        uc_code: session.uc_code,
        user: session.user,
        date_time: session.date_time,
      });
    }
  });
  const uniqueUcs = Array.from(uniqueUcsMap.values());

  // Fetch all sessions for the user
  const getSessions = async () => {
    try {
      const response = await axios.post(
          GET_SESSIONS_URL,
          { username: auth.currentUser.username },
          { withCredentials: true }
      );
      setMyUcs(response.data.sessions || []);
    } catch (error) {
      console.error('Error fetching user sessions:', error);
    }
  };

  // Fetch sessions only for selected day
  const getSessionsDay = async () => {
    const date = getLocalDateString(selectedDate);
    try {
      const response = await axios.post(
          GET_CHANNELS_BY_SESSIONS_URL,
          {
            date: date,
            username: auth.currentUser.username
          },
          { withCredentials: true }
      );
      setDaySessions(response.data.channels || []); // ✅ match the new API field
    } catch (error) {
      console.error('Error fetching day sessions:', error);
      setDaySessions([]);
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
      await getSessionsDay();
    } catch (error) {
      console.error('Error deleting session: ', error);
      alert('Erro ao cancelar sessão.');
    }
  };

  useEffect(() => {
    getSessions();
    getSessionsDay(); // ✅ also load day sessions on date change
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
                uniqueUcs.length !== 0 ?
                    uniqueUcs.map((uc, ind) => (
                        <Link
                            to={`/channel/${encodeURIComponent(uc.uc_code)}`}
                            key={ind}
                            style={{ textDecoration: 'none' }}
                        >
                          <UcCard
                              name={uc.uc_name}
                              description={`Sessões de estudo para ${uc.uc_name}`}
                              code={uc.uc_code}
                          />
                        </Link>
                    )) :
                    <p>Não há sessões neste dia</p>
              }
            </div>
          </div>

          <div className="vertical-divider" />

          <div className="minhas-sessoes-column">
            <h3>Calendário de Agendamentos</h3>
            <Calendar
                showNeighboringMonth={false}
                onChange={setSelectedDate}
                value={selectedDate}
            />
            <div className="session-list">
              <h4>Sessões neste dia:</h4>
              {
                daySessions.length > 0 ? (
                    <ul>
                      {daySessions.map((session, idx) => {
                        const time = new Date(session.description).toLocaleTimeString('pt-PT', {
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                            <div className="session-card" key={idx}>
                              <strong>{session.name}</strong><br />
                              {time} — {session.user}
                            </div>

                        );
                      })}
                    </ul>
                ) : (
                    <p>Sem sessões para este dia.</p>
                )
              }
            </div>
          </div>
          </div>
      </div>
  );
};

export default MinhasSessoes;
