import { createContext } from 'react'

const AppContext = createContext();

const initialState = {
    toast: [],
    search: "",
    modalInfo: {
      userId: "",
      info: "",
      visible: false
    }
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

      case "USE_SEARCH": {
        return {
          ...state,
          search: action.payload,
        };
      }

      case "SET_MODAL": {
        return {
          ...state,
          modalInfo: action.payload,
        };
      }

      default: {
        return state;
      }
    }
  };
  
  export { initialState, reducer };

export default AppContext