import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Shop } from "./pages/Shop/Shop";

const App = () => {
  // Routes and pages
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* <Route index element={<Shop />} /> */}
        <Route path="/shop/:page?/:category?" element={<Shop />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
