import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/users/')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="users-container">
      <h2 className="title">Usuarios</h2>

      {/* Lista de usuarios */}
      <ul className="user-list">
        {users.length === 0 ? (
          <li>No se encontraron resultados</li>
        ) : (
          users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Apellido:</strong> {user.last_name}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Users;
