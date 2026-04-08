import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Page/Home';
import Details from '../Shared/Details';
import MainLayout from '../LayOut/MainLayout';
import Error from '../Shared/Error';


const Root = createBrowserRouter([
   
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "error",
        element: <Error />
      },
      {
        path: "details/:id",
        element: <Details />,
        loader: ({params})=> fetch(`/src/data/project.json/${params.id}`)
      },
   
    ],
  },

])
export default Root;