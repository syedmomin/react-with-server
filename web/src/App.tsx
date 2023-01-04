import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  // const autoFun = async () => {
  //   const res = await fetch("https://syedmomin-server.cyclic.app/identity");
  //   const json = await res.json();
  //   console.log(json.data);
  // };

  useEffect(() => {
    axios.get('http://localhost:3000/identity')
    .then(response => console.log(response));
  }, []);

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
