import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  // Getting the error from useRouterError custom hook
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {/* Displaying the actual error message */}
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
