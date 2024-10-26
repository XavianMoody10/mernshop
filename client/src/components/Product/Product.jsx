import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Product = ({ info }) => {
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isProductActive, setIsProductActive] = useState(true);

  const ref = useRef(null);

  function intersectionObserveProduct() {
    const options = { threshold: 0.2 };

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
  }, []);

  return (
    <>
      {isProductActive && (
        <motion.div
          className=" space-y-3 min-h-[609.656px]"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ delay: 1.2 }}
        >
          {isProductVisible && (
            <div>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
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
          <button className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold font-notable">
            Add To Cart
          </button>
        </motion.div>
      )}
    </>
  );
};
