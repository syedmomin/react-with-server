import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const autoFun = async () => {
    await axios.post(`http://localhost:5001/registration`, {
      userName: "momin",
      email: "syedmomin168",
      number: "0123030",
      desgnation: "developer"
    })
      .then(response => {
        console.log("response: ", response.data);
      })
      .catch(err => {
        console.log("error: ", err);
      })
  };

  useEffect(() => {
    autoFun()
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
