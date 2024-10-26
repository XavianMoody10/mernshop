import axios from "axios";

async function getProductsRequest(page, category, search) {
  const url = "http://localhost:3001/products_list";

  try {
    const response = await axios.get(url, {
      params: { page: page, category: category, search: search },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getProductsRequest };
