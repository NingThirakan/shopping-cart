import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { CartItemType } from "../@types/Cart"
import { ProductType } from "../@types/Products"

type CartContextType = {
  cart: CartItemType[]
  totalItems: number
  totalPrice: string
  viewCart: boolean
  onAdd: (product: ProductType) => void
  onUpdate: (product: CartItemType, qty: number) => void
  onDelete: (product: CartItemType) => void
  onSubmit: () => void
  onViewCart: (value: boolean) => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

type Props = { children: ReactNode }

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItemType[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<string>('')
  const [viewCart, setViewCart] = useState<boolean>(false)

  const onViewCart = useCallback((value: boolean) => {
    setViewCart(value)
  }, [])

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

  const onUpdate = useCallback((product: CartItemType, qty: number) => {
    const itemExit = cart.find(item => item.sku === product.sku)

    if (!itemExit) {
      throw new Error('Item must exist in cart to update quantity')
    }

    setCart((state) =>
      state.map(item =>
        item.sku === product.sku ? { ...item, qty: qty } : item
      )
    )
  }, [cart])

  const onDelete = useCallback((product: CartItemType) => {
    const filterCart = cart.filter(item => item.sku !== product.sku)
    setCart(filterCart)
  }, [cart])

  const onSubmit = useCallback(() => {
    console.log(cart)
    setCart([])
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
        viewCart,
        onAdd,
        onDelete,
        onUpdate,
        onSubmit,
        onViewCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartProvider