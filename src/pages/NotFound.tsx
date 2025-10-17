import {Link} from "react-router-dom";
import type {JSX} from "react";

export default function NotFound(): JSX.Element {
  return (
    <div className="text-centered">
      <p>An error has occured</p>
      <Link to="/" type="button">
        Return to quiz creation
      </Link>
    </div>
  )
}