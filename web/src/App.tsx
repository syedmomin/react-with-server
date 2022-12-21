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
        <h3>Type your Server</h3>

        <label>Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Log In</button>
    </form>
    </>
  );
}

export default App;
