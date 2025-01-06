import { Cart } from "../components/Cart"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { ProductList } from "../components/ProductList"
import { useCart } from "../context/CartContext"

export const PageContainer = () => {
  const {
    cart,
    totalItems,
    totalPrice,
    viewCart,
    onViewCart,
    onSubmit,
    onUpdate,
    onDelete
  } = useCart()

  return (
    <>
      <Header
        viewCart={viewCart}
        onViewCart={onViewCart}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      {viewCart ? (
        <Cart
          cart={cart}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onSubmit={onSubmit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ) : (
        <ProductList />
      )}
      <Footer
        viewCart={viewCart}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
    </>
  )
}