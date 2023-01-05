import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './component/login/login';
import ResponseModal from './component/modal/responseModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <ResponseModal modalState="true" status="success" response="done hogyia"/>
    {/* <Login/> */}
    </>
  );
}

export default App;
