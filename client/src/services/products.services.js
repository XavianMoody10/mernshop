import axios from "axios";

async function getProductsRequest(page, category) {
  const url = "http://localhost:3001/products_list";

  try {
    const response = await axios.get(url, {
      params: { page: page, category: category },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getProductsRequest };
