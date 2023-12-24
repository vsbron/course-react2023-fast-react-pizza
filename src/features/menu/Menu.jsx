import { useLoaderData } from "react-router-dom";

import MenuItem from "./MenuItem";

import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  // Getting the fetched data from the loader
  const menu = useLoaderData();

  return (
    <ul>
      {/* Going through the menu and calling MenuItem component on each element  */}
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Loader that does the fetch request from API and returns the menu
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
