import React, { useState } from 'react';
import './styles/UsCard.css';
import { useNavigate } from 'react-router-dom';

const UcCard = ({ name, description, code, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    navigate(`/channel/${code}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit && onEdit(code);
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete && onDelete(code);
    setShowMenu(false);
  };

  return (
    <div className="uc-card" onClick={handleClick} style={{ cursor: 'pointer', position: 'relative' }}>
      <div className="card-header">
        <h4>{name}</h4>
        <div className="menu-container">
          <button className="menu-button" onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}>⋮</button>
          {showMenu && (
            <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <div onClick={handleEdit}>Edit</div>
              <div onClick={handleDelete}>Delete</div>
            </div>
          )}
        </div>
      </div>
      <p>{description}</p>
      <div className="uc-code">ID: {code}</div>
    </div>
  );
};

export default UcCard;