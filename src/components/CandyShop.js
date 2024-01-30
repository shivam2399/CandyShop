import { useContext, useState, useEffect } from "react";
import CartContext from "../store/cart-context";


const CandyShop = (props) => {
    const cartCtx = useContext(CartContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [items, setItems] = useState([]);
    const [showCart, setShowCart] = useState(false);


    useEffect(() => {
      const storedItems = JSON.parse
        (localStorage.getItem("availableItems")) || [];
        setItems(storedItems);
    }, []);
    
    
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
    
    const handlePriceChange = (event) => {
        setPrice(parseFloat(event.target.value));
      };

    const handleAddItem = () => {
        const newItem = { name, description, price };
        setItems([...items, newItem]);
        localStorage.setItem("availableItems", JSON.stringify([...items, newItem]));
        setName('');
        setDescription('');
        setPrice('');
    }

    const handleCartClick = () => {
      setShowCart(true);
    }

    const handleCloseCart = () => {
      setShowCart(false);
    }

    const addItem = (event, item, quantity) => {
      event.preventDefault();
      const newItem = { name: item.name, description: item.description, price: item.price, quantity: quantity };
      cartCtx.addToCart(newItem);
    };

    return (
        <div>
          <div>
           <label>Candy Name:</label>
           <input type="text" value={name} onChange={handleNameChange} />
          </div>

          <div>
           <label>Description:</label>
           <input type="text" value={description} onChange={handleDescriptionChange} />
          </div>

          <div>
           <label>Price:</label>
           <input type="number" step="0.01" value={price} onChange={handlePriceChange} />
          </div>

          <button onClick={handleAddItem}>Add Item</button>  
          <div>
            <h3>Available Items</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <b>{item.name}</b> {item.description}  ₹{item.price}
                  <button onClick={(event) => addItem(event,item,1)}>Add 1</button>
                  <button onClick={(event) => addItem(event,item,2)}>Add 2</button>
                  <button onClick={(event) => addItem(event,item,3)}>Add 3</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button onClick={handleCartClick}>Cart({cartCtx.cartItems.length})</button>
            {showCart && <Cart items={cartCtx.cartItems} onClose={handleCloseCart} />}
          </div>
        </div>
    )
}

function Cart({items, onClose}) {
  return (
    <div>
      <div>
        <h2>Cart</h2>
        <button onClick={onClose} >Close</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} {item.description} ₹{item.price} Quantity <b>{item.quantity}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CandyShop;