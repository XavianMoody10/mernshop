import { http, HttpResponse } from "msw";
import productsListData from "./data/productsList.data";
import productsListPage2Data from "./data/productsListPage2.data";

export const handlers = [
  http.get("http://localhost:3001/products_list", async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    if (page === "2") {
      return HttpResponse.json(productsListPage2Data);
    } else {
      return HttpResponse.json(productsListData);
    }
  }),
];
