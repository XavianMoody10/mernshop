import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Shop } from "./pages/Shop/Shop";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  // Routes and pages
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* <Route index element={<Shop />} /> */}
        <Route
          path="/shop/:page?/:category?/:sortby?/:search?"
          element={<Shop />}
        />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
};

export default App;
