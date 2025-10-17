import './App.css'
import type {JSX} from "react";
import {Outlet} from "react-router-dom";

function App(): JSX.Element {
  return (
    <main className="container">
      <Outlet/>
    </main>
  );
}

export default App;
