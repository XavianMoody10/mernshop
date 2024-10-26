import axios from "axios";

async function getProductsRequest(page, category, search, sortBy) {
  const url = "http://localhost:3001/products_list";

  try {
    const response = await axios.get(url, {
      params: {
        page: page,
        category: category,
        search: search,
        sortBy: sortBy,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return "Error getting products";
  }
}

export { getProductsRequest };
