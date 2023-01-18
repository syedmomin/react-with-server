import React, { useEffect, useState,useContext } from 'react';
import './App.css';
import Login from './component/login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './component/dashboard/dashboard';
import  {GlobalContext}  from './context/context';

function App() {

  const { state } = useContext(GlobalContext);

  return (

    <>
        {state.isLogin ?
          <Dashboard />
          :
          <Login />
        }
    </>
  );
}

export default App;
