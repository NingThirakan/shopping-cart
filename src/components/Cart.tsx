import { useCallback, useState } from "react"
import { CartItemType } from "../@types/Cart"
import { CartLineItem } from "./CartLineItem"

type Props = {
  cart: CartItemType[]
  totalItems: number
  totalPrice: string
  onSubmit: () => void
  onUpdate: (product: CartItemType, qty: number) => void
  onDelete: (product: CartItemType) => void
}

export const Cart = ({ cart, totalItems, totalPrice, onSubmit, onUpdate, onDelete }: Props) => {
  const [confirm, setConfirm] = useState<boolean>(false)

  const handleSubmit = useCallback(() => {
    onSubmit()
    setConfirm(true)
  }, [])

  return (
    <main className="main main--cart">
      {confirm ? (
        <h2>Thank you for your order.</h2>
      ) : (
        <>
          <h2 className="offscreen">Cart</h2>
          <ul className="cart">
            {cart.map(item =>
              <CartLineItem
                key={item.sku}
                item={item}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            )}
          </ul>

          <div className="cart_totals">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>

            <button
              className="cart_submit"
              disabled={!totalItems}
              onClick={handleSubmit}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </main>
  )
}