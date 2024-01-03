import { Link } from "react-router-dom";

// Button component that also stores all the classnames we need for the button
function Button({ children, disabled, to }) {
  // Storing classes as separate value
  const classes =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 md:px-6 md:py-4";

  // Early return if button should lead somewhere
  if (to)
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export default Button;
