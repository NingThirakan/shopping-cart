import { createContext, ReactNode, useContext, useEffect, useState } from "react"
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

type ProductContextType = {
  products: ProductType[]
}

const ProductContext = createContext<ProductContextType>({} as ProductContextType)

type Props = { children: ReactNode }

export const ProductProvider = ({ children }: Props): ReactNode => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    setProducts(initState)
  }, [])

  return (
    <ProductContext.Provider
      value={{ products }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)
export default ProductProvider