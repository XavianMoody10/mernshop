import React from "react";
import { Header } from "../../layouts/Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptycart.png";

export const Cart = () => {
  const cart = useSelector((state) => state.cart.value);

  const displayCartItems = cart.map((i) => {
    return (
      <div
        key={i.code}
        className=" flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className=" flex flex-col sm:flex-row sm:gap-2">
          <div>
            <img
              src={i.image}
              alt=""
              className=" sm:max-w-[200px] xl:max-w-[250px]"
            />
          </div>

          {/* <div className=" sm:max-w-[100px] block"> */}
          <p className=" text-center font-medium sm:text-start w-full sm:min-w-[180px] md:min-w-[250px] xl:text-lg inline break-words">
            {i.name}
          </p>
          {/* </div> */}
        </div>

        <div className=" flex flex-col gap-3 w-full sm:max-w-[220px] lg:max-w-[300px]">
          <select
            name="quantity"
            id="quanity"
            className=" border w-full py-2 shadow-sm hover:shadow-md duration-150 font-semibold text-center"
            // onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <div className=" flex flex-col gap-3">
            <button
              className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold font-notable text-sm"
              // onClick={updateItemInCart}
            >
              Update
            </button>

            <button
              className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold font-notable text-sm text-white bg-red-600"
              // onClick={removeItemFromCart}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <main className=" w-[90%] max-w-[1700px] mx-auto">
        <section className=" relative flex flex-col gap-6 lg:flex-row lg:justify-between">
          {cart.length ? (
            <>
              <div className=" grid grid-cols-1 gap-4 w-full">
                {displayCartItems}
              </div>

              <div className=" sticky top-[110px] h-fit space-y-4 border p-5 w-full lg:max-w-[300px] 2xl:max-w-[400px]">
                <h2 className=" text-2xl font-extrabold text-center">
                  Cart Summary
                </h2>
                <div className="  flex flex-col gap-2">
                  <Link
                    to={"/shop"}
                    className=" border w-full py-4 text-center shadow-sm hover:shadow-md duration-150 font-semibold font-notable text-sm"
                  >
                    Keep Shopping
                  </Link>
                  <Link
                    to={"/checkout"}
                    className=" border w-full py-4 text-center shadow-sm hover:shadow-md duration-150 font-semibold font-notable text-sm"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className=" flex flex-col items-center justify-center gap-3 h-screen w-full max-w-[400px] mx-auto">
              <div>
                <img src={emptyCart} alt="empty cart" />
              </div>

              <h1 className=" text-2xl font-notable">Cart is empty</h1>

              <Link
                to={"/shop"}
                className=" border w-full py-4 text-center shadow-sm hover:shadow-md duration-150 font-semibold font-notable text-sm"
              >
                Keep Shopping
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
