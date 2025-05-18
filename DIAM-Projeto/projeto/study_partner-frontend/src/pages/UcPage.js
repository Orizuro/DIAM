import React from 'react';
import Calendar from "react-calendar";
import Channel from '../pages/channel/Channel';
import './styles/UcPage.css';

const UcPage = () => {
    return (
        <div className="chat-with-calendar-container">
            <div className="calendar-section">
                <div className="react-calendar">
                    <Calendar />
                </div>

            </div>
            <div className="chat-section">
                <Channel />
            </div>
        </div>
    );
};

export default UcPage;