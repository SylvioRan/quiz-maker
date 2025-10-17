import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import NotFound from "../pages/NotFound.tsx";
import QuizzMaker from "../pages/QuizzMaker.tsx";
import Resultats from "../pages/Resultats.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {index: true, element: <QuizzMaker/>},
      {path: '/resultats', element: <Resultats/>},
      {path: '*', element: <NotFound/>},
    ]
  }
])
/** const routes: RouteItem[] = [
 {path: '/', element: <QuizzMaker/>},
 {path: '/resultats', element: <Resultats/>},
 {path: "*", element: <NotFound/>},
 ]; **/
