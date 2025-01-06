type Props = {
  viewCart: boolean
  onViewCart: (value: boolean) => void
}

export const Nav = ({ viewCart, onViewCart }: Props) => {
  return (
    <nav className="nav">
      {viewCart ? (
        <button onClick={() => onViewCart(false)}>
          View Products
        </button>
      ) : (
        <button onClick={() => onViewCart(true)}>
          View Cart
        </button>
      )}
    </nav>
  )
}