import { createContext } from 'react'

const AppContext = createContext();

const initialState = {
    us: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case "EXEMPLE": {
            return {
                ...state,
                loggedUser: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export {
    initialState,
    reducer
}

export default AppContext