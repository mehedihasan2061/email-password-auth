import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginEmail from './components/LoginEmail';
import ReactRegisterEmail from './components/ReactRegisterEmail/ReactRegisterEmail';
import Main from './layout/Main';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path:"/",element:<ReactRegisterEmail></ReactRegisterEmail>
        },
        {
          path:"/register",element:<ReactRegisterEmail></ReactRegisterEmail>
        },
        {
          path:"/login",element:<LoginEmail></LoginEmail>
        },
      ]
    }
  ])
  return (
    <div className=''>
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
