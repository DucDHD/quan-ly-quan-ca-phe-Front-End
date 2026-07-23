import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import theme from './theme.js'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { injectStore } from './utils/authorizeAxios.js'
injectStore(store)

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
   <BrowserRouter basename='/'>
      <Provider store={store} >
        < PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <ConfirmProvider defaultOptions={{
                allowClose: false,
                dialogProps: { maxWidth: 'xs' },
                cancellationButtonProps: { color: 'inherit' },
                confirmationButtonProps: { color: 'warning', variant: 'outlined' }
              }}  >
              <CssBaseline />
              <App />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
              </ConfirmProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
)
