import { createContext } from 'react'

const AppContext = createContext();

const initialState = {
    toast: [],
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "SHOW_TOAST": {
        return {
          ...state,
          toast: [...state.toast ,action.payload],
        };
      }
      
      case "HIDE_TOAST": {
        return {
          ...state,
          toast: [],

        };
      }

      default: {
        return state;
      }
    }
  };
  
  export { initialState, reducer };

export default AppContext