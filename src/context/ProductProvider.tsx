import { createContext, ReactNode, useEffect, useState } from "react"
import { ProductType } from "../@types/Products"

const initState: ProductType[] = [
  {
    "sku": "item0001",
    "name": "Widget",
    "price": 9.99
  },
  {
    "sku": "item0002",
    "name": "Premium Widget",
    "price": 19.99
  },
  {
    "sku": "item0003",
    "name": "Deluxe Widget",
    "price": 29.99
  }
]

type ProductsContextType = {
  products: ProductType[]
}

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType)

type Props = { children: ReactNode }

export const ProductsProvider = ({ children }: Props): ReactNode => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    setProducts(initState)
  }, [])

  return (
    <ProductsContext.Provider
      value={{ products }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider