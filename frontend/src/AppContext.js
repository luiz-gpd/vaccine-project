import { createContext } from 'react'

const AppContext = createContext();


// const reducer = (state, action) => {
//     switch (action.type) {
//         case "EXEMPLE": {
//             return {
//                 ...state,
//                 loggedUser: action.payload,
//             };
//         }

//         default: {
//             return state;
//         }
//     }
// }

export default AppContext