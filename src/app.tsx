import { RouterProvider } from 'react-router-dom'

import './styles/index.css'
import { router } from './router'
import { BitcoinkitProvider } from 'context/bitcoinkitContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

declare global {
  interface Window {
    ethereum?: any
  }
}

export const App = () => (
  <div className="bg-neutral-50">
    <BitcoinkitProvider>
      <RouterProvider router={router} />
    </BitcoinkitProvider>
    <ToastContainer />
  </div>
)
