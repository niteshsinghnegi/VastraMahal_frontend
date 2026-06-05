async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      return data.products;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProductById(slug) {
  try {
    const res = await fetch(`${API_URL}/product?slug=${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      return data.product;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}