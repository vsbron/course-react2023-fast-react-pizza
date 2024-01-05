import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import { clearCart, getCart } from "./cartSlice";
import { getUsername } from "../user/userSlice";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";

function Cart() {
  // Getting the username from the Redux store
  const username = useSelector(getUsername);

  // Getting the cart from the Redux
  const cart = useSelector(getCart);

  // Getting the dispatch function from the Redux
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          &larr; Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
