import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";

import Header from "./Header";

function AppLayout() {
  return (
    // Creating the Layout for App
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
