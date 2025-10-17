import './App.css'
import type {JSX} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/routes.tsx";

function App(): JSX.Element {
  return (
    <main className="container">
      <RouterProvider router={router}/>
    </main>
  );
}

export default App;
