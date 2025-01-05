import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { CartItemType } from "../@types/Cart"
import { ProductType } from "../@types/Products"

type CartContextType = {
  cart: CartItemType[]
  totalItems: number
  totalPrice: string
  onAdd: (product: ProductType) => void
  onDelete: (product: ProductType) => void
  onUpdate: (product: CartItemType) => void
  onSubmit: () => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

type Props = { children: ReactNode }

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItemType[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<string>('')

  // REDUCER_ACTION_TYPE.ADD
  const onAdd = useCallback((product: ProductType) => {
    const filterCart = cart.filter(item => item.sku != product.sku)
    const itemExit = cart.find(item => item.sku === product.sku)
    const qty = itemExit ? itemExit.qty + 1 : 1

    setCart(() => [...filterCart, { ...product, qty }]
      .sort((a, b) => {
        const itemA = Number(a.sku.slice(-4));
        const itemB = Number(b.sku.slice(-4));
        return itemA - itemB;
      }))
  }, [cart])

  // REDUCER_ACTION_TYPE.REMOVE
  const onDelete = useCallback((product: ProductType) => {
    const filterCart = cart.filter(item => item.sku !== product.sku)
    setCart(filterCart)
  }, [cart])

  // REDUCER_ACTION_TYPE.QUANTITY
  const onUpdate = useCallback((product: CartItemType) => {
    const itemExit = cart.find(item => item.sku === product.sku)

    if (!itemExit) {
      throw new Error('Item must exist in cart to update quantity')
    }

    // const updateItem = { ...itemExit, qty: product.qty }

    // const filterCart = cart.filter(item => item.sku != product.sku)

    // setCart(() => [...filterCart, updateItem])
    setCart((state) => [...state, { ...itemExit, qty: itemExit.qty + 1 }])
  }, [])

  // REDUCER_ACTION_TYPE.SUBMIT
  const onSubmit = useCallback(() => {
    console.log(cart)
  }, [])

  useEffect(() => {
    setTotalItems(cart.reduce((prev, item) => { return prev + item.qty }, 0))

    setTotalPrice(new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' })
      .format(cart.reduce((prev, item) => {
        return prev + (item.qty * item.price)
      }, 0)))
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        onAdd,
        onDelete,
        onUpdate,
        onSubmit,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartProvider