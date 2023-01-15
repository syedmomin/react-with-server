import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './component/login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './component/dashboard/dashboard';
import ContextProvider from './context/context';
function App() {

  const [isAuth, setIsAuth] = useState(false);

  return (

    <>
      <ContextProvider>
        {isAuth ?
          <Dashboard />
          :
          <Login />
        }
      </ContextProvider>
      {/* <AuthContext.Provider value={{ user: null, isAuthenticated: isAuth }}>
        {isAuth ?
          <Dashboard />
          :
          <Login />
        }
      </AuthContext.Provider> */}
    </>
  );
}

export default App;
