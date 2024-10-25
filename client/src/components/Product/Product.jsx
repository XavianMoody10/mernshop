import React from "react";

export const Product = ({ info }) => {
  return (
    <div className=" space-y-3">
      <div>
        <img src={info.images[0].baseUrl} alt={`${info.name} image`} />
      </div>
      <p className=" text-lg font-semibold text-center">{info.name}</p>
      <p className=" text-xl text-center">${info.price.value}</p>
      <button className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold">
        Add To Cart
      </button>
    </div>
  );
};
