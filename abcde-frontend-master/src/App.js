import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import ItemsList from './components/ItemsList';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (userToken, id) => {
    setToken(userToken);
    setUserId(id);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ItemsList token={token} userId={userId} />
      )}
    </div>
  );
}

export default App;
