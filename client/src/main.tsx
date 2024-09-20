import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppContextProvider } from './context/AppContext.tsx' 
import { ChatContextProvider } from './context/ChatContext.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
)
