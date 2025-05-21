import React, { useState } from 'react';
import './styles/UsCard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const UcCard = ({ name, description, code, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const auth = useAuth();

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
        {showMenu && auth.currentUser.isAdmin && (
          <div className="menu-container">
            <button className="menu-button" onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}>⋮</button>
            <div className="dropdown-menu">
              <div onClick={handleEdit}>Edit</div>
              <div onClick={handleDelete}>Delete</div>
            </div>
          </div>
        )}
      </div>
      <p>{description}</p>
      <div className="uc-code">ID: {code}</div>
    </div>
  );
};

export default UcCard;
