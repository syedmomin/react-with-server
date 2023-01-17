import React, { useEffect, useState,useContext } from 'react';
import './App.css';
import Login from './component/login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './component/dashboard/dashboard';
import ContextProvider, { GlobalContext } from './context/context';
function App() {

  const { state } = useContext(GlobalContext);
console.log("check data",state.isLogin)
  return (

    <>
      <ContextProvider >
        {state.isLogin ?
          <Dashboard />
          :
          <Login />
        }
      </ContextProvider>
    </>
  );
}

export default App;
