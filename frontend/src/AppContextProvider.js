import React, {useState} from 'react'
import AppContext from "./AppContext";

const AppContextProvider = ({ children }) => {
    const [toast, setToast] = useState([]);

    return (
        <AppContext.Provider value={{toast, setToast}}>
            { children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;