import React from 'react'
import AppContextProvider from './AppContextProvider'
import Routes from './routes'

const App = () => {
  
  return (
    <AppContextProvider>
        <Routes/>
    </AppContextProvider>
  )
}

export default App