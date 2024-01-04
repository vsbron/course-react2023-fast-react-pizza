import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import { updateName } from "./userSlice";

function CreateUser() {
  // Setting the state for controlled input element
  const [username, setUsername] = useState("");

  const dispatch = useDispatch(); // For dispatching action
  const navigate = useNavigate(); // For redirect

  function handleSubmit(e) {
    // Preventing default behaviour
    e.preventDefault();

    // Guard clause
    if (!username) return;

    // Sending the action with entered username
    dispatch(updateName(username));

    // Redirect user
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
