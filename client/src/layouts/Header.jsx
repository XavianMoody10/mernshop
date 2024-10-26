import React from "react";
import { HiOutlineShoppingBag as ShoppingBag } from "react-icons/hi2";
import { FiUser as User } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

export const Header = () => {
  const cart = useSelector((state) => state.cart.value);

  return (
    <header className=" sticky top-0 bg-white bg-opacity-35 py-8 z-50 lg:py-10">
      <div className=" flex items-center justify-between w-[90%] max-w-[1700px] mx-auto">
        <Link to={"/"}>
          <div className=" max-w-[180px]">
            <img src={logo} alt="Headers' logo" />
          </div>
        </Link>

        <div className=" flex gap-1 lg:gap-3">
          <Link className="/auth/login">
            <User size={30} />
          </Link>

          <div className=" relative">
            <span className=" absolute right-[-10px] top-[-20px] text-lg font-medium">
              {cart.length}
            </span>

            <Link to={"/cart"}>
              <ShoppingBag size={30} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
