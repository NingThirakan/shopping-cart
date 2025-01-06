import { Nav } from "./Nav"

type Props = {
  viewCart: boolean
  onViewCart: (value: boolean) => void
  totalItems: number
  totalPrice: string
}

export const Header = ({ viewCart, onViewCart, totalItems, totalPrice }: Props) => {
  return (
    <header className="header">
      <div className="header_title-bar">
        <h1>LOLO Co.</h1>
        <div className="header_price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>

      <Nav viewCart={viewCart} onViewCart={onViewCart} />
    </header>
  )
}