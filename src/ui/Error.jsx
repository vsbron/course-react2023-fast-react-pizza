import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // Getting the error from useRouterError custom hook
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {/* Displaying the actual error message */}
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
