import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState(""); // Setting the state
  const navigate = useNavigate(); // Getting the navigate object

  // Form submit handler
  function handleSubmit(e) {
    e.preventDefault(); // Preventing default behaviour
    if (!query) return; // Guard clause

    setQuery(""); // Clearing the query input field
    navigate(`/order/${query}`); // Navigating user to the order page
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled element */}
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
