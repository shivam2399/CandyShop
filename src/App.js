import CandyShop from "./components/CandyShop";
import CartProvider from "./store/CartProvider";


const App = (props) => {
  return (
    <CartProvider>
      <h1>Candy Shop</h1>
      <CandyShop />
    </CartProvider>
  )
}

export default App;