import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  // Destructuring the pizza object
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Getting the dispatch function from Redux
  const dispatch = useDispatch();

  // Checking if this pizza is already in the cart
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  // Add to cart handler function
  function handleAddToCart() {
    // Creating the new item pizza object
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    // Dispatching the action of adding item to the cart
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && "opacity-70 grayscale-[60%]"}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p className="">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}

          {/* Conditional rendering. Delete from cart or add to cart button. Depends on whether it's already in the cart */}
          {isInCart ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            <Button
              type="small"
              onClick={handleAddToCart}
              disabled={soldOut && "disabled"}
            >
              {!soldOut ? "Add to cart" : "Out of stock"}
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
