import React, { useEffect, useState } from "react";
import { IoIosSearch as Search } from "react-icons/io";
import { getCategoriesRequest } from "../../services/categories.services";
import { useNavigate } from "react-router-dom";

export const Filter = ({ filterDispatch, filterState }) => {
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // Get categories from api
  async function getCategories() {
    const data = await getCategoriesRequest();

    if (data === "Error getting categories") {
      setIsError(true);
    } else {
      setCategories(data);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

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
    <div className=" flex flex-col items-center gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 md:flex md:flex-row">
      {!isError && (
        <select
          name="categories"
          id="categories"
          className=" border p-3 w-full md:max-w-[200px]"
          onChange={(e) =>
            filterDispatch({ type: "set_category", payload: e.target.value })
          }
        >
          <option value={""}>Categories</option>
          {displayCategories}
        </select>
      )}

      <select
        name="sortby"
        id="sortby"
        className=" border p-3 w-full md:max-w-[200px]"
        onChange={(e) =>
          filterDispatch({ type: "set_sortby", payload: e.target.value })
        }
      >
        <option value={""}>Sort By</option>
        <option value={"stock"}>Stock</option>
        <option value={"ascPrice"}>Ascend Price</option>
        <option value={"descPrice"}>Descend Price</option>
        <option value={"newProduct"}>New Product</option>
      </select>

      <div className=" flex items-center justify-between border w-full md:max-w-[500px]">
        <input
          type="text"
          placeholder="Search"
          id="filter-search"
          className=" outline-none w-full h-full p-3 bg-transparent"
          onChange={(e) =>
            filterDispatch({ type: "set_search", payload: e.target.value })
          }
        />
        <Search size={22} />
      </div>

      <button
        onClick={() =>
          navigate(
            `/shop/${1}${
              filterState.categoryOption && "/" + filterState.categoryOption
            }${filterState.sortByOption && "/" + filterState.sortByOption}${
              filterState.searchValue && "/" + filterState.searchValue
            }`
          )
        }
        className="  border p-3 w-full shadow-sm font-notable hover:shadow-md duration-150 sm:col-span-2 md:col-auto md:max-w-[150px]"
      >
        Filter
      </button>
    </div>
  );
};
