import React from "react";
import { Header } from "../../layouts/Header";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <Header />

      <main>
        <section className=" fixed top-0 flex flex-col gap-4 items-center justify-center h-screen w-full">
          <form className=" flex flex-col gap-3 w-[90%] max-w-[450px]">
            <input
              type="text"
              placeholder="Email"
              id="email-input"
              className=" border-b w-full text-lg p-2 outline-none"
            />
            <input
              type="text"
              placeholder="Password"
              id="password-input"
              className=" border-b w-full text-lg p-2 outline-none"
            />
            <button className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold font-notable">
              Login
            </button>
          </form>

          <Link to={"/auth/signup"} className=" hover:font-medium">
            Need An account?
          </Link>
        </section>
      </main>
    </>
  );
};
