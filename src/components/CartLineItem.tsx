import { CartItemType } from "../@types/Cart"

type Props = {
  item: CartItemType
  onUpdate: (product: CartItemType, qty: number) => void
  onDelete: (product: CartItemType) => void
}

export const CartLineItem = ({ item, onUpdate, onDelete }: Props) => {
  const img = new URL(`../images/${item.sku}.jpg`, import.meta.url).href
  const lineTotal = item.qty * item.qty
  const highestQty = 20 > item.qty ? 20 : item.qty
  const optionValues = [...Array(highestQty).keys()].map(i => i + 1)
  const options = optionValues.map(value => <option key={`otp${value}`} value={value}>{value}</option >)

  return (
    <li className="cart_item">
      <img src={img} alt={item.name} className="cart_img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(item.price)}
      </div>

      <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart_select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={(e) => onUpdate(item, Number(e.target.value))}
      >
        {options}
      </select>

      <div className="cart_item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
      </div>

      <button
        className="cart_button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={() => onDelete(item)}
      >
        ❌
      </button>
    </li>
  )
}