import { Layout } from "antd";
import { Outlet } from "react-router";
import React from "react";
import AppFooter from "../shared/Footer";
import AppHeader from "../shared/Header";

const { Content } = Layout;

const OpenLayout = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ minHeight: "100vh", background: "#fff" }}>
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default OpenLayout;
