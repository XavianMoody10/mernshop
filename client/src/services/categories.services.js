import axios from "axios";

async function getCategoriesRequest() {
  const url = "http://localhost:3001/categories";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return "Error getting categories";
  }
}

export { getCategoriesRequest };
