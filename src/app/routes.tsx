import type {ReactElement} from "react";
import QuizzMaker from "../pages/QuizzMaker.tsx";
import Resultats from "../pages/Resultats.tsx";
import NotFound from "../pages/NotFound.tsx";

type RouteItem = { path: string, element: ReactElement };

const routes: RouteItem[] = [
  {path: '/', element: <QuizzMaker/>},
  {path: '/resultats', element: <Resultats/>},
  {path: "*", element: <NotFound/>},
];

export default routes;