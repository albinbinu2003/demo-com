import React, { useState, useRef } from 'react';
import { Card, Button, Accordion, Toast } from 'react-bootstrap';
import './product.data';
import { phoneData } from './product.data';

const Products = () => {
  const [items, setItems] = useState(phoneData);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Ref for the Accordion section
  const accordionRef = useRef(null);

  // Increment quantity of the item
  const countUp = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, Quantity: (Number(item.Quantity) || 0) + 1 } : item
    );
    setItems(newItems);
  };

  // Decrement quantity of the item
  const countDn = (id) => {
    const newItems = items.map((item) =>
      item.id === id && item.Quantity > 1
        ? { ...item, Quantity: (Number(item.Quantity) || 0) - 1 }
        : item
    );
    setItems(newItems);
  };

  // Add item to cart
  const addToCart = (itemId) => {
    const itemToAdd = items.find((i) => i.id === itemId);

    if (!itemToAdd) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, Quantity: itemToAdd.Quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...itemToAdd }];
      }
    });

    // Show notification
    setNotification({ show: true, message: 'Item added to cart!' });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 2000);
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.Price * item.Quantity), 0);
  };

  // Scroll to Accordion section
  const scrollToAccordion = () => {
    if (accordionRef.current) {
      accordionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {notification.show && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
              zIndex: 1040, // Just below the toast
            }}
          ></div>
          <Toast
            className="position-fixed"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1050, // Ensure the toast appears above the overlay
              backgroundColor: 'green',
              color: 'white',
            }}
          >
            <Toast.Body>{notification.message}</Toast.Body>
          </Toast>
        </>
      )}
           <Accordion defaultActiveKey="0" className="mt-4" ref={accordionRef}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Carted Items</Accordion.Header>
          <Accordion.Body>
            {cart.length > 0 ? (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      {item.Name} - Quantity: {item.Quantity}
                    </li>
                  ))}
                </ul>
                <h5>Total Payable: ₹{calculateTotalPrice().toFixed(2)}</h5>
              </>
            ) : (
              <p>No items in the cart.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {items.map((item) => (
        <div className="d-inline-flex" key={item.id}>
          <Card style={{ width: '23rem' }} className="m-4">
            <Card.Img variant="top" src={require(`./assets/${item.image}.png`)} />
            <Card.Body>
              <Card.Title className="d-flex justify-content-center align-items-center">
                {item.Name}
              </Card.Title>
              <Card.Text className="d-flex justify-content-center align-items-center">
                {item.Desc}
                <br />
              </Card.Text>
              <h5 className='central'>₹{item.Price}</h5>
              <p className="central">
                Quantity :
                <br />
                <Button className="m-2" onClick={() => countDn(item.id)}>
                  -
                </Button>
                {item.Quantity}
                <Button className="m-2" onClick={() => countUp(item.id)}>
                  +
                </Button>
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    className="bg-success"
                    onClick={() => addToCart(item.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </p>
            </Card.Body>
          </Card>
        </div>
      ))}

   

      {/* Floating Button */}
      <Button
        onClick={scrollToAccordion}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        View Cart
      </Button>
    </>
  );
};

export default Products;
