import DeleteItem from "./DeleteItem";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item, index }) {
  // Destructuring the item from the prop
  const { pizzaId, name, totalPrice } = item;

  // Getting the current quantity from Redux selector
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="flex flex-col py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {index}. {name}
      </p>
      <div className="flex items-center gap-3 sm:gap-6">
        <p className="mr-auto text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
