import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import Channel from '../pages/channel/Channel';
import './styles/UcPage.css';
// import './UcPage.css';
import axios from 'axios';
import { GET_SESSIONS_URL } from '../Constants';

const UcPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([])

  const get_sessions = async () => {
    try {
      const response = await axios.post(GET_SESSIONS_URL, { date: selectedDate }, { withCredentials: true });
      setSessions(response.data.sessions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get_sessions();
  }, [selectedDate]);

  return (
    <div className="chat-with-calendar-container">
      <div className="calendar-section">
        <div className="react-calendar">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
          {/* {
            sessions.map((session) => (
              <p key={session.uc_code}>{session.uc_name}</p>
            ))
          } */}
        </div>

      </div>
      <div className="chat-section">
        <Channel />
      </div>
    </div>
  );
};

export default UcPage;
