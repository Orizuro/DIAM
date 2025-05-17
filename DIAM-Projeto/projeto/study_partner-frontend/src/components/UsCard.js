import React from 'react';
import './UsCard.css';
import { useNavigate } from 'react-router-dom';

const UcCard = ({ name, description, code }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/channel/${code}`);
    };

    return (
        <div className="uc-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h4>{name}</h4>
            <p>{description}</p>
            <div className="uc-code">ID: {code}</div>
        </div>
    );
};

export default UcCard;