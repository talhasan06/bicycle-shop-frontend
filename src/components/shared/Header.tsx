import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Space, Drawer } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/services/auth/authSlice";
import { useCreateOrderMutation } from "../../redux/services/order/order";
import { toast } from "sonner";
import CartSheet from "./CartSheet";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuVisible(false);
  };

  const menuItems = [
    {
      key: "/",
      label: "Home",
    },
    {
      key: "/shop",
      label: "Shop",
    },
    {
      key: "/about",
      label: "About",
    },
    {
      key: "/orders",
      label: "Orders",
    },
    user && {
      key: "/manage-profile",
      label: "Profile",
    },
  ].filter(Boolean);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#111827",
        padding: "0 48px",
        height: "80px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "800",
            background: "linear-gradient(45deg, #60A5FA, #34D399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Wheel X
        </h1>
      </Link>

      <div
        style={{
          display: "none",
          "@media (min-width: 768px)": { display: "block" },
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <CartSheet />

        <Button
          icon={<MenuOutlined />}
          onClick={() => setMenuVisible(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            padding: "8px",
            display: { xs: "flex", md: "none" },
          }}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <h2
            style={{
              margin: 0,
              background: "linear-gradient(45deg, #3498db, #2ecc71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Wheel X
          </h2>
        }
        placement="right"
        onClose={() => setMenuVisible(false)}
        open={menuVisible}
        width={300}
        style={{ display: { xs: "block", md: "none" } }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
            setMenuVisible(false);
          }}
          style={{
            border: "none",
            marginBottom: "20px",
            backgroundColor: "transparent",
          }}
        />
        <div style={{ padding: "20px 0", borderTop: "1px solid #f0f0f0" }}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/dashboard"
                    style={{ display: "block" }}
                    onClick={() => setMenuVisible(false)}
                  >
                    <Button
                      type="primary"
                      className="gradient-button"
                      icon={<DashboardOutlined />}
                      style={{ width: "100%" }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  style={{ width: "100%" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ display: "block" }}
                  onClick={() => setMenuVisible(false)}
                >
                  <Button
                    type="primary"
                    className="gradient-button"
                    style={{ width: "100%" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  to="/register"
                  style={{ display: "block" }}
                  onClick={() => setMenuVisible(false)}
                >
                  <Button
                    type="primary"
                    className="gradient-button"
                    style={{ width: "100%" }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Space>
        </div>
      </Drawer>
    </div>
  );
};

export default AppHeader;
