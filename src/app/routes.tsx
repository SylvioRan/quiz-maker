import type {ReactElement} from "react";
import QuizzMaker from "../pages/QuizzMaker.tsx";
import Resultats from "../pages/Resultats.tsx";

type RouteItem = { path: string, element: ReactElement };

const routes: RouteItem[] = [
  {path: '/', element: <QuizzMaker/>},
  {path: '/resultats', element: <Resultats/>}
];

export default routes;