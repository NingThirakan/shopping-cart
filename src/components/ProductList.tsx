import { useCart } from "../context/CartContext"
import { useProduct } from "../context/ProductContext"
import { Product } from "./Product"

export const ProductList = () => {
	const { products } = useProduct()
	const { cart, onAdd } = useCart()

	return (
		<main className="main main--products">
			{products.map(product => (
				<Product
					key={product.sku}
					product={product}
					onAdd={onAdd}
					inCart={cart.some(item => item.sku === product.sku)}
				/>
			))}
		</main>
	)
}