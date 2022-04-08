import React from "react";

import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";

import { Home } from "../pages";

const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
);

export default Router;
