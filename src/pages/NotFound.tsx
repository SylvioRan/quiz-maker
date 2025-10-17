import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-centered">
      <p>An error has occured</p>
      <Link to="/" type="button">
        Return to quiz creation
      </Link>
    </div>
  )
}