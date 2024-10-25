import { http, HttpResponse } from "msw";
import productsListData from "./data/productsList.data";

export const handlers = [
  http.get("http://localhost:3001/products_list", () => {
    return HttpResponse.json(productsListData);
  }),
];
