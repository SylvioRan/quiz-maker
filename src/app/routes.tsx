import type {ReactElement} from "react";
import Home from "../pages/Home.tsx";

type RouteItem = { path: string, element: ReactElement };

const routes: RouteItem[] = [
  {path: '/', element: <Home/>}
];

export default routes;