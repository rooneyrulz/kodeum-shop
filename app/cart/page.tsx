import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import NotFoundPage from "../not-found";

export const metadata = {
  title: "Your Cart - QuickCart",
};

export default async function CartPage() {
  const session = await getServerSession(options);
  const cart = await getCart();

  if (session?.user?.role == "admin") {
        return NotFoundPage();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}
