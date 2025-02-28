import React from "react";
import { Layout, Row, Col, Typography, Space, Divider, theme } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const AppFooter: React.FC = () => {
  const { token } = useToken();

  return (
    <Footer
      style={{
        background: "#f8fafc",
        padding: `${token.paddingLG * 2}px 0`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: `0 ${token.padding}px`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={24} md={8}>
            <Title level={4} className="gradient-text">
              Wheel X
            </Title>
            <Text style={{ fontSize: 16 }}>
              Your one-stop destination for premium bicycles and accessories.
              Quality products with exceptional service.
            </Text>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: token.colorTextHeading }}>
              Quick Links
            </Title>
            <Space direction="vertical" size="middle">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/bicycles" className="footer-link">
                Shop
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </Space>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: token.colorTextHeading }}>
              Contact Us
            </Title>
            <Space direction="vertical" size="middle">
              <Text>
                <EnvironmentOutlined className="gradient-text" /> 123 Bike
                Street, Cycle City
              </Text>
              <Text>
                <PhoneOutlined className="gradient-text" /> +1 234 567 8900
              </Text>
              <Text>
                <MailOutlined className="gradient-text" /> info@wheelx.com
              </Text>
            </Space>
          </Col>
        </Row>

        <Divider style={{ margin: "40px 0" }} />

        <Row justify="space-between" align="middle">
          <Col>
            <Text>© 2024 Wheel X. All rights reserved.</Text>
          </Col>
          <Col>
            <Space size="large">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FacebookOutlined style={{ fontSize: "20px" }} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <TwitterOutlined style={{ fontSize: "20px" }} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <InstagramOutlined style={{ fontSize: "20px" }} />
              </a>
            </Space>
          </Col>
        </Row>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "radial-gradient(circle at 0% 0%, rgba(52, 152, 219, 0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(46, 204, 113, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
    </Footer>
  );
};

export default AppFooter;
