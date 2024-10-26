import React, { useEffect, useReducer, useState } from "react";
import { Header } from "../../layouts/Header";
import { getProductsRequest } from "../../services/products.services";
import { Product } from "../../components/Product/Product";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { Filter } from "../../components/Filter/Filter";

function filterReducer(state, action) {
  switch (action.type) {
    case "set_category": {
      return {
        ...state,
        categoryOption: action.payload,
      };
    }

    case "set_sortby": {
      return {
        ...state,
        sortByOption: action.payload,
      };
    }

    case "set_search": {
      return {
        ...state,
        searchValue: action.payload,
      };
    }
  }
}

export const Shop = () => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    categoryOption: "",
    sortByOption: "",
    searchValue: "",
  });

  const [products, setProducts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { page, category, search, sortby } = useParams();
  const navigate = useNavigate();

  // Get products from api
  async function getProducts() {
    setProducts([]);
    const data = await getProductsRequest(page, category, search, sortby);
    setProducts(data.results);
    setNumberOfPages(data.pagination.numberOfPages);
  }

  useEffect(() => {
    getProducts();
  }, [page, category, search, sortby]);

  // Diplay All Products
  const displayProducts = products.map((p) => {
    return <Product key={p.code} info={p} />;
  });

  return (
    <>
      <Header />

      <main className=" max-w-[1700px] mx-auto">
        <section className=" p-3" id="products-market">
          <Filter filterDispatch={filterDispatch} filterState={filterState} />

          <div className=" mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 2xl:grid-cols-5">
            {displayProducts}
          </div>

          <div className=" flex items-center justify-center mt-16">
            <Pagination
              count={numberOfPages}
              size="large"
              page={Number(page)}
              onChange={(e, v) =>
                navigate(
                  `/shop/${v}${
                    filterState.categoryOption &&
                    "/" + filterState.categoryOption
                  }${
                    filterState.sortByOption && "/" + filterState.sortByOption
                  }${filterState.searchValue && "/" + filterState.searchValue}`
                )
              }
            />
          </div>
        </section>
      </main>
    </>
  );
};
