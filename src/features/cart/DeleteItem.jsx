import { useDispatch } from "react-redux";

import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItem({ id }) {
  // Getting the dispatch function from the Redux
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(deleteItem(id))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;
