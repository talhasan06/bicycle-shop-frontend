import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  AppstoreAddOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Card, Row, Col, Statistic } from "antd";
import CreateProduct from "./CreateProduct";
import ManageProducts from "./ManageProducts";
import { useGetOrdersQuery } from "../redux/services/order/order";
import { useGetProductsQuery } from "../redux/services/product/product";
import { useGetUsersQuery } from "../redux/services/user/user";
import CreateOrder from "./CreateOrder";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";
import { useDispatch } from "react-redux";
import { logout } from "../redux/services/auth/authSlice";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "1",
    label: "Create Product",
    icon: <PlusOutlined />,
  },
  {
    key: "2",
    label: "Manage Products",
    icon: <ShopOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "sub2",
    label: "Orders",
    icon: <SettingOutlined />,
    children: [
      { key: "3", label: "Create Order" },
      { key: "4", label: "Manage Orders" },
    ],
  },
  {
    key: "sub3",
    label: "Users",
    icon: <SettingOutlined />,
    children: [{ key: "5", label: "Manage Users" }],
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(null);
  const [selectedKey, setSelectedKey] = useState<string>("home");
  const { data: orders } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: products } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: users } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();

  const renderHome = () => (
    <div>
      <h2 style={{ marginBottom: 24 }}>Dashboard Overview</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={products?.data?.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={orders?.data?.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={users?.data?.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case "logout":
        dispatch(logout());
        break;
      case "1":
        setCurrentPage(<CreateProduct />);
        break;
      case "2":
        setCurrentPage(<ManageProducts />);
        break;
      case "3":
        setCurrentPage(<CreateOrder />);
        break;
      case "4":
        setCurrentPage(<ManageOrders />);
        break;
      case "5":
        setCurrentPage(<ManageUsers />);
        break;

      case "home":
        setCurrentPage(renderHome());
        break;
      default:
        setCurrentPage(renderHome());
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["home"]}
        mode="inline"
        items={items}
      />
      <div style={{ padding: "24px", flex: 1 }}>
        {currentPage || renderHome()}
      </div>
    </div>
  );
};

export default App;
