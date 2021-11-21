import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from "../context/context";
import { publicRoutes, privateRoutes } from "../router/routes";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  if (isAuth)
    return (
      <Routes>
        {privateRoutes.map(route =>
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            element={route.element}
          />
        )}
      </Routes>);
  else
    return (
      <Routes>
        {publicRoutes.map(route =>
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            element={route.element}
          />
        )}
      </Routes>);
};

export default AppRouter;
