import './App.css'
import {Route, Routes} from "react-router-dom";
import routes from "./app/routes.tsx";

function App() {
  return (
    <main className="container">
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element}/>
        ))}
      </Routes>
    </main>
  )
}

export default App
