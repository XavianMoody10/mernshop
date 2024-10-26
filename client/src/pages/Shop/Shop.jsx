import React, { useEffect, useReducer, useState } from "react";
import { Header } from "../../layouts/Header";
import { getProductsRequest } from "../../services/products.services";
import { Product } from "../../components/Product/Product";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { Filter } from "../../components/Filter/Filter";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { page, category, search, sortby } = useParams();
  const navigate = useNavigate();

  // Get products from api
  async function getProducts() {
    setIsLoading(true);
    setProducts([]);
    const data = await getProductsRequest(page, category, search, sortby);

    if (data === "Error getting products") {
      setIsError(true);
    } else {
      setProducts(data.results);
      setNumberOfPages(data.pagination.numberOfPages);
    }

    setIsLoading(false);
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
        <section className=" p-3 relative" id="products-market">
          <LoadingOverlay isLoading={isLoading} />

          {isError && !isLoading && (
            <div className=" fixed top-0 right-0 bottom-0 left-0 bg-white h-screen w-full flex flex-col gap-6 items-center justify-center">
              <p className=" font-bold text-4xl">Loading error</p>
              <button className="border p-3 w-full shadow-sm font-notable hover:shadow-md duration-150 max-w-[300px]">
                Try loading again
              </button>
            </div>
          )}

          <Filter filterDispatch={filterDispatch} filterState={filterState} />

          <div className=" mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 2xl:grid-cols-5">
            {displayProducts}
          </div>

          {!isLoading && !isError && (
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
                    }${
                      filterState.searchValue && "/" + filterState.searchValue
                    }`
                  )
                }
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
};
