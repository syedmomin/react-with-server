import React from 'react';
import './App.css';

function App() {
  return (
    <>
       <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Your Identity</h3>

        <label>Username :</label>
        <input type="text" placeholder="Email" />

        <label>Password :</label>
        <input type="password" placeholder="Password" />

        <button>Log In</button>
    </form>
    </>
  );
}

export default App;
