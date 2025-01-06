import { ProductType } from "../@types/Products"

type Props = {
  product: ProductType
  inCart: boolean
  onAdd: (product: ProductType) => void
}

export const Product = ({ product, inCart, onAdd }: Props) => {
  const img = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

  return (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product_img" />
      <p>
        {new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={() => onAdd(product)}>Add to Cart</button>
    </article>
  )
}