import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  // Getting the navigate from useNavigate hook
  const navigate = useNavigate();

  // Storing classes as separate value
  const classes = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  // Early return if button should lead back one page
  if (to === "-1")
    return (
      <button className={classes} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    );

  // Return the link
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

export default LinkButton;
