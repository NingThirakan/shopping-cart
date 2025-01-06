import dayjs from "dayjs"

type Props = {
  viewCart: boolean
  totalItems: number
  totalPrice: string
}

export const Footer = ({ viewCart, totalItems, totalPrice }: Props) => {
  const year = dayjs().year()

  return (
    <footer className="footer">
      {viewCart ? (
        <p>Shopping Cart &copy; {year}</p>
      ) : (
        <>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
          <p>Shopping Cart &copy; {year}</p>
        </>
      )}
    </footer>
  )
}