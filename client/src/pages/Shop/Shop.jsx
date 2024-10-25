import React, { useEffect, useState } from "react";
import { Header } from "../../layouts/Header";
import { getProductsRequest } from "../../services/products.services";
import { Product } from "../../components/Product/Product";

export const Shop = () => {
  const [products, setProducts] = useState([]);

  // Get products from api
  async function getProducts() {
    const data = await getProductsRequest();
    setProducts(data.results);
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Diplay All Products
  const displayProducts = products.map((p) => {
    return <Product key={p.code} info={p}></Product>;
  });

  return (
    <>
      <Header />

      <main className=" max-w-[1700px] mx-auto">
        <section className=" p-3" id="products-market">
          <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 2xl:grid-cols-5">
            {displayProducts}
          </div>
        </section>
      </main>
    </>
  );
};
