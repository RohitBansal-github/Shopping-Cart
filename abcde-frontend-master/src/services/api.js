const API_URL = 'http://localhost:8080';

export const signup = async (username, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Username already exists or invalid data');
  }

  return response.json();
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid username/password');
  }

  return response.json();
};

export const getItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  return response.json();
};

export const addToCart = async (token, itemIds) => {
  const response = await fetch(`${API_URL}/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ item_ids: itemIds }),
  });

  return response.json();
};

export const getCarts = async (token) => {
  const response = await fetch(`${API_URL}/carts`, {
    headers: {
      'Authorization': token,
    },
  });

  return response.json();
};

export const createOrder = async (token, cartId) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ cart_id: cartId }),
  });

  return response.json();
};

export const getOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      'Authorization': token,
    },
  });

  return response.json();
};
