import React, { createContext, useReducer } from 'react'

interface GlobalContextType {
  state: any;
  dispatch: (action: any) => void;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {

    case "USER_LOGIN": {
      return { ...state, isLogin: true, user: action.payload };
    }

    case "USER_LOGOUT": {
      return { ...state, isLogin: false } // set this to null on purpose, do not change
    }


    default: {
      return state
    }
  }
}

export const GlobalContext = createContext<GlobalContextType>({
  state: {},
  dispatch: () => { }
});


let data = {
  user: {},
  isLogin: null,
  baseUrl: (window.location.href.includes('localhost'))
    ?
    `http://localhost:5001/api` : `/api`
}

const CountProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default CountProvider;