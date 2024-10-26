import React from "react";
import { TailSpin as LoadingSpinner } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingOverlay = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className=" fixed top-0 right-0 bottom-0 left-0 bg-white flex items-center justify-center h-screen w-full z-40"
        >
          <LoadingSpinner />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
