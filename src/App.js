import React from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  ScrollRestoration,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import { productsData } from "./api/api";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import Register from "./pages/Register";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} loader={productsData}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Route>


  ))
  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
