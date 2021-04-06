import React, {useReducer} from 'react'
import AppContext, { reducer, initialState } from "./AppContext";

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            { children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;