import axios from "axios";

async function getProductsRequest() {
  const url = "http://localhost:3001/products_list";

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getProductsRequest };
