import { http, HttpResponse } from "msw";
import productsListData from "./data/productsList.data";
import productsListPage2Data from "./data/productsListPage2.data";
import categoriesData from "./data/categories.data";

export const handlers = [
  http.get("http://localhost:3001/products_list", async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");

    if (page === "1" && category === "men_all" && search === "slim") {
      return HttpResponse.json(productsListPage2Data);
    } else {
      return HttpResponse.json(productsListData);
    }
  }),

  http.get("http://localhost:3001/categories", () => {
    return HttpResponse.json(categoriesData);
  }),
];
