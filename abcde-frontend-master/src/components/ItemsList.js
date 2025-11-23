import React, { useState, useEffect } from 'react';
import { getItems, addToCart, getCarts, createOrder, getOrders } from '../services/api';
import Toast from './Toast';
import Modal from './Modal';

function ItemsList({ token, userId }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [cartModal, setCartModal] = useState(false);
  const [ordersModal, setOrdersModal] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      showToast('Error loading items', 'error');
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await addToCart(token, [itemId]);
      showToast('Item added to cart!', 'success');
    } catch (error) {
      showToast('Error adding to cart', 'error');
    }
  };

  const handleViewCart = async () => {
    try {
      const data = await getCarts(token);
      const userCart = data.find(c => c.cart.user_id === userId && c.cart.status === 'active');
      setCartData(userCart);
      setCartModal(true);
    } catch (error) {
      showToast('Error loading cart', 'error');
    }
  };

  const handleViewOrderHistory = async () => {
    try {
      const orders = await getOrders(token);
      const userOrders = orders.filter(o => o.user_id === userId);
      setOrdersData(userOrders);
      setOrdersModal(true);
    } catch (error) {
      showToast('Error loading orders', 'error');
    }
  };

  const handleCheckout = async () => {
    try {
      const data = await getCarts(token);
      const userCart = data.find(c => c.cart.user_id === userId && c.cart.status === 'active');

      if (!userCart) {
        showToast('No items in cart to checkout', 'error');
        return;
      }

      await createOrder(token, userCart.cart.id);
      showToast('Order placed successfully!', 'success');
    } catch (error) {
      showToast('Error creating order', 'error');
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Modal isOpen={cartModal} onClose={() => setCartModal(false)} title="Your Cart">
        {cartData && cartData.cart_items && cartData.cart_items.length > 0 ? (
          <div>
            {cartData.cart_items.map((ci, idx) => {
              const item = items.find(i => i.id === ci.item_id);
              return (
                <div key={idx} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ color: '#374151', fontWeight: '500' }}>
                    {item ? item.name : `Item ${ci.item_id}`}
                  </span>
                  <span style={{ color: '#6b7280' }}>ID: {ci.item_id}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
            Your cart is empty
          </p>
        )}
      </Modal>

      <Modal isOpen={ordersModal} onClose={() => setOrdersModal(false)} title="Order History">
        {ordersData.length > 0 ? (
          <div>
            {ordersData.map((order, idx) => (
              <div key={order.id} style={{
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#374151', fontWeight: '600' }}>Order #{order.id}</span>
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '500' }}>✓ Completed</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Cart ID: {order.cart_id}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
            No orders yet
          </p>
        )}
      </Modal>

      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
      }}>
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 24px',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#1f2937', fontWeight: '700' }}>
              Shopping Portal
            </h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleViewCart}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🛒 Cart
              </button>
              <button
                onClick={handleViewOrderHistory}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📦 Orders
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✓ Checkout
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
          <h2 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '24px', fontWeight: '600' }}>
            Available Items
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleAddToCart(item.id)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: '#ede9fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '16px',
                }}>
                  🛍️
                </div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  color: '#1f2937',
                  fontWeight: '600',
                }}>
                  {item.name}
                </h3>
                <p style={{
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  color: '#6b7280',
                }}>
                  Product ID: {item.id}
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                }}>
                  Click to add
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemsList;
