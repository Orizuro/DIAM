import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { USER_URL } from '../Constants';
import { useAuth } from '../hooks/AuthProvider';
import "./styles/UserProfile.css"

const UserProfile = () => {
  const auth = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(USER_URL);
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Infomação básica</h2>
          <div className="profile-field">
            <span className="field-label">Username:</span>
            <span className="field-value">{auth.currentUser.username}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{user.email}</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Detalhes pessoais</h2>
          <div className="profile-field">
            <span className="field-label">Primeiro nome:</span>
            <span className="field-value">{user.first_name}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Último nome:</span>
            <span className="field-value">{user.last_name}</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Informação do curso</h2>
          <div className="profile-field">
            <span className="field-label">Curso:</span>
            <span className="field-value">{user.course}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
