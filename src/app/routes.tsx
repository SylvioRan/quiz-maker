import type {ReactElement} from "react";
import QuizzMaker from "../pages/QuizzMaker.tsx";

type RouteItem = { path: string, element: ReactElement };

const routes: RouteItem[] = [
  {path: '/', element: <QuizzMaker/>}
];

export default routes;