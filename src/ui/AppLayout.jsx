import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";

import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  // Getting the navigation state from useNavigation hook
  const navigation = useNavigation();

  // Creating the boolean that indicates whther the app is in the loading state
  const isLoading = navigation.state === "loading";

  return (
    // Creating the Layout for App
    <div className="layout">
      {/* Display the loader if the navigation is in Loading state */}
      {isLoading && <Loader />}
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
