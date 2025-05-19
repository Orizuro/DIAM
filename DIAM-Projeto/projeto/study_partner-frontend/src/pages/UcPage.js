import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Channel from '../pages/channel/Channel';
import './styles/UcPage.css';
import {GET_SESSIONS_URL, CREATE_SESSION_URL, DELETE_SESSION_URL} from '../Constants';

const UcPage = () => {
  const { channel_id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateTimeSlots = (date) => {
    const slots = [];
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 48; i++) {
      const slot = new Date(start);
      slot.setMinutes(i * 30);
      slots.push(slot);
    }

    return slots;
  };

  const getSessions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
          GET_SESSIONS_URL,
          {
            uc: channel_id,
            date: selectedDate.toISOString(), // 'YYYY-MM-DD'
          },
          { withCredentials: true }
      );
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotToggle = async (slotTime, isCurrentlyBooked) => {
    const iso = slotTime.toISOString();

    try {
      if (isCurrentlyBooked) {
        // DELETE session
        await axios.post(
            DELETE_SESSION_URL,
            {
              uc: channel_id,
              date_time: iso,
            },
            { withCredentials: true }
        );
      } else {
        // CREATE session
        await axios.post(
            CREATE_SESSION_URL,
            {
              uc: channel_id,
              date_time: iso,
            },
            { withCredentials: true }
        );
      }


      await getSessions();
    } catch (error) {
      console.error('Error toggling session:', error);
      alert('Error updating session.');
    }
  };

  useEffect(() => {
    getSessions();
  }, [selectedDate]);

  return (
      <div className="chat-with-calendar-container">
        <div className="calendar-section">
          <div className="calendar-scroll-container">
            <div className="react-calendar">
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>

            <div className="session-list">
              <h3>Sessions on {selectedDate.toDateString()}</h3>
              {loading ? (
                  <p>Loading...</p>
              ) : (
                  <div className="time-slot-list">
                    {generateTimeSlots(selectedDate).map((slot, i) => {
                      const iso = slot.toISOString();
                      const isBooked = sessions.some(
                          (s) => new Date(s.date_time).toISOString() === iso
                      );

                      return (
                          <label key={i} className="time-slot">
                            <input
                                type="checkbox"
                                checked={isBooked}
                                onChange={() => handleSlotToggle(slot, isBooked)}
                            />
                            {slot.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </label>
                      );
                    })}
                  </div>
              )}
            </div>
          </div>
        </div>


        <div className="chat-section">
          <Channel />
        </div>
      </div>
  );
};

export default UcPage;
