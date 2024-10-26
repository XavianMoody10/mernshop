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
import { Cart } from "./pages/Cart/Cart";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";

const App = () => {
  // Routes and pages
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="/shop/:page?/:category?/:sortby?/:search?"
          element={<Shop />}
        />
        <Route path="/cart" element={<Cart />} />

        <Route path="/auth">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
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
