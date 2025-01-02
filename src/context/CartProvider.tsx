import { createContext, ReactNode, useCallback, useState } from "react"
import { CartItemType } from "../@types/Cart"
import { ProductType } from "../@types/Products"

type CartContextType = {
  cart: CartItemType[]
  onAdd: (product: ProductType) => void
  onDelete: (product: ProductType) => void
  onUpdate: (product: CartItemType) => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

type Props = { children: ReactNode }

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItemType[]>([])

  const onAdd = useCallback((product: ProductType) => {
    const filterCart = cart.filter(item => item.sku != product.sku)
    const itemExit = cart.find(item => item.sku === product.sku)
    const qty = itemExit ? itemExit.qty + 1 : 1

    setCart(() => [...filterCart, { ...product, qty }])
  }, [cart])

  const onDelete = useCallback((product: ProductType) => {
    const filterCart = cart.filter(item => item.sku !== product.sku)
    setCart(filterCart)
  }, [cart])

  const onUpdate = useCallback((product: CartItemType) => {
    const itemExit = cart.find(item => item.sku === product.sku)

    if (!itemExit) {
      throw new Error('Item must exist in cart to update quantity')
    }

    // const updateItem = { ...itemExit, qty: product.qty }

    // const filterCart = cart.filter(item => item.sku != product.sku)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        onAdd,
        onDelete,
        onUpdate,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}