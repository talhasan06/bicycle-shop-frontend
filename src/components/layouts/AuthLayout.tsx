import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/services/auth/authSlice";
import React from "react";
import { Header } from "antd/es/layout/layout";

const AuthLayout = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
