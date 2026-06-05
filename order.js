const token = JSON.parse(localStorage.getItem("token"));

async function fetchMyOrders() {
  try {
    const res = await fetch(`${API_URL}/get-myorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      return data.orders;
    } else {
      console.log("Error with getting orders");
      return [];
    }
  } catch (error) {
    console.log("Error :", error);
  }
}

async function fetchOrderById(orderId) {
  try {
    const res = await fetch(`${API_URL}/get-order-id/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      return data.order;
    } else {
      console.log("Error with getting order");
      return null;
    }
  } catch (error) {
    console.log("Error :", error);
  }
}

async function deleteOrderById(orderId) {
  try {
    const res = await fetch(`${API_URL}/order-id`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error :", error);
  }
}

// Global scope me available kar do
window.fetchMyOrders = fetchMyOrders;
window.fetchOrderById = fetchOrderById;
window.deleteOrderById = deleteOrderById;