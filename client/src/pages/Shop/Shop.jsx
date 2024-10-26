import React, { useEffect, useState } from "react";
import { Header } from "../../layouts/Header";
import { getProductsRequest } from "../../services/products.services";
import { Product } from "../../components/Product/Product";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesRequest } from "../../services/categories.services";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [categoryOption, setCategoryOption] = useState("");
  const { page, category } = useParams();
  const navigate = useNavigate();

  // Get products from api
  async function getProducts() {
    setProducts([]);
    const data = await getProductsRequest(page, category);
    setProducts(data.results);
    setNumberOfPages(data.pagination.numberOfPages);
  }

  useEffect(() => {
    getProducts();
  }, [page, category]);

  // Get categories from api
  async function getCategories() {
    const data = await getCategoriesRequest();
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  // Diplay All Products
  const displayProducts = products.map((p) => {
    return <Product key={p.code} info={p} />;
  });

  // Diplay All Categories
  const displayCategories = categories.map((c) => {
    return (
      <option
        key={c.CatName}
        value={c.tagCodes[0]}
        id={c.tagCodes[0]}
        className=" p-2"
      >
        {c.CatName}
      </option>
    );
  });

  return (
    <>
      <Header />

      <main className=" max-w-[1700px] mx-auto">
        <section className=" p-3" id="products-market">
          <div className=" flex items-center gap-2">
            <select
              name="categories"
              id="categories"
              className=" border p-3 text-lg w-full max-w-[200px]"
              onChange={(e) => setCategoryOption(e.target.value)}
            >
              <option value={""}>Categories</option>
              {displayCategories}
            </select>

            <button
              onClick={() =>
                navigate(`/shop/${1}${categoryOption && "/" + categoryOption}`)
              }
              className="  border p-3 text-lg w-full max-w-[150px] shadow-sm hover:shadow-md duration-150"
            >
              Filter
            </button>
          </div>

          <div className=" mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 2xl:grid-cols-5">
            {displayProducts}
          </div>

          <div className=" flex items-center justify-center mt-16">
            <Pagination
              count={numberOfPages}
              size="large"
              page={Number(page)}
              onChange={(e, v) => navigate(`/shop/${v}`)}
            />
          </div>
        </section>
      </main>
    </>
  );
};
