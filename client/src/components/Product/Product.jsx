import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../store/features/cart/cartSlice";

export const Product = ({ info }) => {
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isProductActive, setIsProductActive] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const ref = useRef(null);

  function intersectionObserveProduct() {
    const options = { threshold: 0.3, rootMargin: "0px 0px 150px 0px" };

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsProductVisible(true);
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);
  }

  useEffect(() => {
    intersectionObserveProduct();
  }, [ref]);

  function addItemToCart() {
    const newItem = {
      code: info.code,
      name: info.name,
      price: info.price.value,
      quantity: quantity,
    };

    dispatch(updateCart([...cart, newItem]));
  }

  function updateItemInCart() {
    const updatedCart = cart.map((i) => {
      if (i.code === info.code) {
        return { ...i, quantity: quantity };
      } else {
        return { ...i };
      }
    });

    dispatch(updateCart(updatedCart));
  }

  return (
    <>
      {isProductActive && (
        <motion.div
          className=" space-y-3 min-h-[609.656px]"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ delay: isImageLoaded ? 1 : 0 }}
        >
          {isProductVisible && (
            <div>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                src={info.images[0].baseUrl || info.images[0].url}
                alt={`${info.name} image`}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsProductActive(false)}
              />
            </div>
          )}

          {!isImageLoaded && <div className=" min-h-[460px]"></div>}

          <p className=" font-semibold text-center">{info.name}</p>
          <p className=" text-xl text-center">${info.price.value}</p>
          <select
            name="quantity"
            id="quanity"
            className=" border w-full py-2 shadow-sm hover:shadow-md duration-150 font-semibold text-center"
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          {cart.some((i) => i.code === info.code) ? (
            <button
              className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold font-notable"
              onClick={updateItemInCart}
            >
              Update
            </button>
          ) : (
            <button
              className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold font-notable"
              onClick={addItemToCart}
            >
              Add To Cart
            </button>
          )}
        </motion.div>
      )}
    </>
  );
};
