import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Channel from '../pages/channel/Channel';
import './styles/UcPage.css';
import { GET_SESSIONS_URL, CREATE_SESSION_URL, DELETE_SESSION_URL, getLocalDateString, deleteFactory } from '../Constants';

const UcPage = () => {
  const { channel_id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [daysWithSessions, setDaysWithSessions] = useState([]);

  const generateTimeSlots = (date) => {
    const slots = [];
    const start = new Date(date);
    start.setHours(3, 0, 0, 0);

    for (let i = 0; i < 48; i++) {
      const slot = new Date(start);
      slot.setMinutes(i * 30);
      slots.push(slot);
    }

    return slots;
  };

  const getSessions = async () => {
    const date = getLocalDateString(selectedDate);
    try {
      const response = await axios.post(
        GET_SESSIONS_URL,
        {
          uc: channel_id,
          date: date,
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

  const getMonthSessions = async () => {
    try {
      console.log("Fetching sessions for the month...");

      // Get first and last day of the current month
      const date = new Date(selectedDate);
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      console.log(`Month range: ${firstDay.toDateString()} to ${lastDay.toDateString()}`);

      // Create an array of all days in the month
      const daysInMonth = [];
      for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        daysInMonth.push(new Date(d));
      }

      // Check each day for sessions
      const daysWithSessionsArray = [];

      // For optimization, we could batch these requests or modify the backend API
      // to accept a month parameter instead of a specific date
      for (const day of daysInMonth) {
        const response = await axios.post(
          GET_SESSIONS_URL,
          {
            uc: channel_id,
            date: day.toISOString(),
          },
          { withCredentials: true }
        );

        if (response.data.sessions && response.data.sessions.length > 0) {
          const dateString = day.toISOString().split('T')[0];
          daysWithSessionsArray.push(dateString);
          console.log(`Found sessions on ${dateString}`);
        }
      }

      console.log("Days with sessions:", daysWithSessionsArray);
      setDaysWithSessions(daysWithSessionsArray);
    } catch (error) {
      console.error('Error fetching month sessions:', error);
    }
  };

  const handleSlotToggle = async (slotTime, isCurrentlyBooked, session_id) => {
    const iso = slotTime.toISOString();

    try {
      if (isCurrentlyBooked) {
        // DELETE session
        deleteFactory(DELETE_SESSION_URL, session_id)
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

      // Use context to update the component
      await getSessions();
    } catch (error) {
      console.error('Error toggling session:', error);
      alert('Error updating session.');
    }
  };

  useEffect(() => {
    getSessions();
  }, [selectedDate]);

  useEffect(() => {
    getMonthSessions();
  }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

  const getTileClassName = ({ date, view }) => {
    // Only add custom class to month view
    if (view !== 'month') return null;

    // Check if the date has sessions
    const dateString = date.toISOString().split('T')[0];
    if (daysWithSessions.includes(dateString)) {
      return 'has-sessions';
    }

    return null;
  };

  return (
      <div className="chat-with-calendar-container">
        <div className="calendar-section">
          <div className="calendar-scroll-container">
            <div className="react-calendar">
              <Calendar
                onChange={setSelectedDate}
                showNeighboringMonth={false}
                value={selectedDate}
                tileClassName={getTileClassName}
              />
            </div>

            <div className="session-list-container">
              <h3 className="session-list-header">Sessions on {selectedDate.toDateString()}</h3>
              <div className="session-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="time-slot-list">
                      {generateTimeSlots(selectedDate).map((slot, i) => {
                        const session = sessions.find(
                            (s) => new Date(s.date_time).getTime() === slot.getTime()
                        );

                        const isBooked = session ? true : false;
                        console.log("isBooked", isBooked)

                        return (
                            <label key={i} className="time-slot">
                              <input
                                  type="checkbox"
                                  checked={isBooked}
                                  onChange={() => handleSlotToggle(slot, isBooked, session?.session_id)}
                              />
                              <span>
                                {String(slot.getHours()).padStart(2, '0')}:{String(slot.getMinutes()).padStart(2, '0')}
                              </span>
                            </label>
                        );
                      })}
                    </div>
                )}
              </div>
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
