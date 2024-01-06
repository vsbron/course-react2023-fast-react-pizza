import { useDispatch } from "react-redux";

import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";
import Button from "../../ui/Button";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  // Getting the dispatch function from the Redux
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="round"
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
