import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // State for the Priority orders
  const [withPriority, setWithPriority] = useState(false);

  // Destructiring the user from the Redux store
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "Loading";

  // Getting the cart from the Redux store
  const cart = useSelector(getCart);

  // Getting the total price calculated from the price of the cart items with priority tax of 20% if applied
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const navigation = useNavigation(); // Getting the navigation state
  const isSubmitting = navigation.state === "submitting"; // Checking if app is currently submitting

  // Getting the action's data by using custom hook
  const formErrors = useActionData();

  // Getting the dispatch function from the Redux
  const dispatch = useDispatch();

  // Prevent page load if the cart is empty
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="sm:items-flex-start mb-5 flex flex-col gap-2 sm:flex-row">
          <label className="mt-2.5 sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={username}
            required
          />
        </div>

        <div className="sm:items-flex-start mb-5 flex flex-col gap-2 sm:flex-row">
          <label className="mt-2.5 sm:basis-40 ">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {/* Display error message if there's an error in the action's data */}
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="sm:items-flex-start relative mb-5 flex flex-col gap-2 sm:flex-row">
          <label className="mt-2.5 sm:basis-40 ">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />

            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* Converting the cart and position (if available) to the string */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Function that will intercept the form's request (needs to be connected to the route)
export async function action({ request }) {
  const formData = await request.formData(); // Getting the formData from the request that contains all the form fields
  const data = Object.fromEntries(formData); // Converting the object to the simplier object

  // Getting the new object with some overwrites
  const order = {
    ...data,
    cart: JSON.parse(data.cart), // Converting the cart back to be an object
    priority: data.priority === "true", // Priority, should be boolean
    position: data.position,
  };

  // Creating an empty object of errors
  const errors = {};

  // Checking whether the phone number is valid. If not, adding to the errors object
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";

  // If errors object has at least 1 variable, return it
  if (Object.keys(errors).length > 0) return errors;

  // If everything's okay - sending the order with all the details to the API
  const newOrder = await createOrder(order);

  // Clearing the cart when the order is placed. Store is imported directly, do NOT overuse it
  store.dispatch(clearCart());

  // Redirecting user to the order tracking page
  // *If we return the new response from the action the router will go to the URL that is contained in the response
  // *redirect function does return new response
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
