import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [SignupForm, setSignupForm] = useState(false);
  const toggleForm = () => {
    setSignupForm(!SignupForm)
  }

  const autoFun = async () => {
    await axios.post(`http://localhost:5001/registration`, {
      userName: "momin",
      email: "syedmomin168",
      number: "0123030",
      password: "developer"
    })
      .then(response => {
        console.log("response: ", response.data);
      })
      .catch(err => {
        console.log("error: ", err);
      })
  };

 

  useEffect(() => {
    // autoFun()
  }, []);

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      {!SignupForm &&
        <form>
          <h3>Login Form</h3>

          <label>Username :</label>
          <input type="text" placeholder="Email" />

          <label>Password :</label>
          <input type="password" placeholder="Password" />

          <button>Log In</button>
          <p onClick={toggleForm}>Create new account?</p>
        </form>
      }
      {SignupForm &&
        <form>
          <h3>Registration</h3>

          <label>Username :</label>
          <input type="text" placeholder="Username" />
          <label>Email :</label>
          <input type="email" placeholder="Email" />
          <label>Phone :</label>
          <input type="number" placeholder="Phone" />
          <label>Password :</label>
          <input type="password" placeholder="Password" />
          <button>Sgin Up</button>
          <p onClick={toggleForm}>Create new account?</p>
        </form>
      }
    </>
  );
}

export default App;
