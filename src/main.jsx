import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Root from './Routes/Root'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={Root}></RouterProvider>
  </StrictMode>,
)
