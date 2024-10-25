import React, { useEffect, useState } from "react";
import { Header } from "../../layouts/Header";
import { getProductsRequest } from "../../services/products.services";
import { Product } from "../../components/Product/Product";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { page } = useParams();
  const navigate = useNavigate();

  // Get products from api
  async function getProducts() {
    setProducts([]);
    const data = await getProductsRequest(page);
    setProducts(data.results);
    setNumberOfPages(data.pagination.numberOfPages);
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  // Diplay All Products
  const displayProducts = products.map((p) => {
    return <Product key={p.code} info={p} />;
  });

  return (
    <>
      <Header />

      <main className=" max-w-[1700px] mx-auto">
        <section className=" p-3 space-y-16 md:p-0" id="products-market">
          <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 2xl:grid-cols-5">
            {displayProducts}
          </div>
          <div className=" flex items-center justify-center">
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
