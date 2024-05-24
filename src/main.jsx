import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router';

import Todolist from '../todolist/Todolist';
import Cache from './Contador/Principal';

import './index.css'
import ConsultaRAM from './consulta-ram/consulta-ram';
import Visualizar from './consulta-ram/visulizar';


const router=createBrowserRouter([
  {
    path:'/',
    element:<Cache/>,
    children:[
      {
        path:'/tarefas',
        element:<Todolist/>,
      },
      {
        path:'/root2',
        element:<h1>Segunda Tela</h1>
      },
      {
        path:'/consulta-ram/:id',
        element:<ConsultaRAM/>
      },
      {
        path:'/visualizar/:id',
        element:<Visualizar/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>  
  </React.StrictMode>,
)
