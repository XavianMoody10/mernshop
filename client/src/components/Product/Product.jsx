import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Product = ({ info }) => {
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
    <motion.div
      className=" space-y-3 min-h-[609.656px]"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isProductVisible ? 1 : 0 }}
    >
      <div>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: isProductVisible && isImageLoaded ? 1 : 0 }}
          transition={{ ease: "easeIn", delay: 1 }}
          src={info.images[0].baseUrl}
          alt={`${info.name} image`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      {!isImageLoaded && <div className=" min-h-[460px]"></div>}

      <p className=" text-lg font-semibold text-center">{info.name}</p>
      <p className=" text-xl text-center">${info.price.value}</p>
      <button className=" border w-full py-4 shadow-sm hover:shadow-md duration-150 font-semibold">
        Add To Cart
      </button>
    </motion.div>
  );
};
