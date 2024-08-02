import React, { useState } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import './product.data';
import { phoneData } from './product.data';

const Products = () => {
  const [items, setItems] = useState(phoneData);
  const [cart, setCart] = useState([]);

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
    // Find the item from items state with the latest quantity
    const itemToAdd = items.find((i) => i.id === itemId);

    if (!itemToAdd) return;

    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem) {
        // Update existing item quantity
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, Quantity: itemToAdd.Quantity }
            : cartItem
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...itemToAdd }];
      }
    });
  };

  return (
    <>
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
      <Accordion defaultActiveKey="0" className="mt-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Carted Items</Accordion.Header>
          <Accordion.Body>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.Name} - Quantity: {item.Quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the cart.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Products;
