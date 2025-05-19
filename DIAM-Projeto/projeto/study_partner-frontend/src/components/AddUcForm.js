import React, { useState } from 'react';
import './styles/AddUcForm.css';
import axios from 'axios';
import { CREATE_UC_URL } from '../Constants';

const AddUcForm = ({ onClose, onSubmit }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!code || !name) {
      alert('Code and name are required.');
      return;
    }

    async function sendUc() {
        await axios.post(CREATE_UC_URL, {code, name, description}, { withCredentials: true }) 
            .catch(error => alert("Error: " + error.response.data.error));
    }

    sendUc().then(() => onClose());
    return {code, name, description}
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicione uma nova UC</h2>
        <input
          type="text"
          className="modal-input"
          placeholder="Código da UC"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
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
          Add
        </button>
        <button className="modal-close" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUcForm;
