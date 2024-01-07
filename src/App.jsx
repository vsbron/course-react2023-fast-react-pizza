import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";

import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as orderAction } from "./features/order/UpdateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";

// Creating the routes
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // Stating the element for all errors
    children: [
      { path: "/", element: <Home /> },
      // Uses loader that fetches the menu while the element is loading
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />, // Stating the element for Errors
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: orderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
