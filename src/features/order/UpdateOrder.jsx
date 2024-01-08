import { useFetcher } from "react-router-dom";

import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // Fetcher form will update (revalidate) the page after order will get the change
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make pariority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// Action function for updating order's priority
export async function action({ request, params }) {
  // Creating the data for the new priority state
  const data = { priority: true };

  // Sending the order update, passing the id and the data that shpuld be changed
  await updateOrder(params.orderId, data);

  // Empty return
  return null;
}
