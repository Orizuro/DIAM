import React, { useState } from 'react';
import './styles/EditUcForm.css';
import axios from 'axios';
import { EDIT_UC_URL } from '../Constants';

const EditUcForm = ({ ucId, ucName, ucDescription, onClose }) => {
  const [name, setName] = useState(ucName);
  const [description, setDescription] = useState(ucDescription);

  const handleSubmit = () => {
    async function editdUc() {
        await axios.post(EDIT_UC_URL, {id: ucId, name, description }, { withCredentials: true }) 
          .catch(error => alert("Error: " + error.response.data.error));
    }

    editdUc().then(() => onClose()).then(() => window.location.reload());
    return { name, description }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edite a cadeira {ucName}</h2>

        <input
          type="text"
          className="modal-input"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="modal-input modal-textarea"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="modal-submit" onClick={handleSubmit}>
          Edit 
        </button>
        <button className="modal-close" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUcForm;
