import './App.css'
import type {JSX} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/routes.tsx";
import {QuizProvider} from "./context/QuizContext.tsx";

function App(): JSX.Element {
  return (
    <main className="container">
      <QuizProvider>
        <RouterProvider router={router}/>
      </QuizProvider>
    </main>
  );
}

export default App;
