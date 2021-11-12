import React from "react";
import { Routes, Route } from 'react-router-dom';
import { routes } from "../router/routes";

const AppRouter = () => (
  <Routes>
    {routes.map((route, index) =>
      <Route
        key={index}
        exact={route.exact}
        path={route.path}
        element={route.element}
      />
    )}
  </Routes>
);

export default AppRouter;
