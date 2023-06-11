import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Dashboard from "../pages/Dashboard";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
