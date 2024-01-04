import { useSelector } from "react-redux";

function Username() {
  // Getting the username from Redux Store
  const username = useSelector((state) => state.user.username);

  if (!username) return null; // Guard clause

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
