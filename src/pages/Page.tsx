import { PageContainer } from "../containers/PageContainer"
import CartProvider from "../context/CartContext"
import ProductProvider from "../context/ProductContext"

export const Page = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <PageContainer />
      </CartProvider>
    </ProductProvider>
  )
}