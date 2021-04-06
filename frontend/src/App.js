import React from 'react'
import AppContextProvider from './AppContextProvider'
import Routes from './routes'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <AppContextProvider>
      <ToastContainer />
        <Routes/>
    </AppContextProvider>
  )
}