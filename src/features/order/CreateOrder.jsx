import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    id: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    id: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    id: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // Getting the username from the Redux store
  const username = useSelector((state) => state.user.username);

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation(); // Getting the navigation state
  const isSubmitting = navigation.state === "submitting"; // Checking if app is currently submitting

  // Getting the action's data by using custom hook
  const formErrors = useActionData();

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* Converting the cart to the string */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
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
    priority: data.priority === "on", // Priority, should be boolean
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

  // Redirecting user to the order tracking page
  // *If we return the new response from the action the router will go to the URL that is contained in the response
  // *redirect function does returns new response
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
