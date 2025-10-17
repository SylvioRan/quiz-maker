import {createBrowserRouter} from "react-router-dom";
import QuizzMaker from "../pages/QuizzMaker.tsx";
import Resultats from "../pages/Resultats.tsx";
import NotFound from "../pages/NotFound.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: QuizzMaker,
  },
  {
    path: '/resultats',
    Component: Resultats,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);