import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Button,
  Space,
  Tag,
  InputNumber,
  Spin,
  message,
  Breadcrumb,
  Divider,
  Image,
  Rate,
  Card,
  Tabs,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/services/product/product";
import { addToCart } from "../redux/services/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const productDetails = product?.data;
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (!productDetails) return;

    dispatch(
      addToCart({
        product: productDetails._id,
        model: productDetails.model,
        price: productDetails.price as number,
        quantity: quantity as number,
        category: productDetails.category,
        imageUrl: productDetails.imageUrl as string,
      })
    );
    toast.success(
      `Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`
    );
  };

  const features = [
    { icon: <CheckCircleOutlined />, text: "Premium Quality" },
    { icon: <SafetyCertificateOutlined />, text: "1 Year Warranty" },
    { icon: <SyncOutlined />, text: "30-Day Returns" },
  ];

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !product) {
    message.error("Failed to load product details");
    return null;
  }

  return (
    <div
      style={{
        background: "linear-gradient(165deg, #f8f9ff 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
        <Breadcrumb style={{ marginBottom: "24px" }}>
          <Breadcrumb.Item>
            <Link to="/" className="gradient-text">
              <HomeOutlined /> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/shop" className="gradient-text">
              Shop
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productDetails.model}</Breadcrumb.Item>
        </Breadcrumb>

        <Card
          style={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Row gutter={[48, 32]}>
            <Col xs={24} md={12}>
              <div
                style={{
                  background:
                    "linear-gradient(165deg, #f8f9ff 0%, #ffffff 100%)",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <Image
                  src={productDetails.imageUrl}
                  alt={productDetails.model}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease",
                  }}
                  preview={{
                    mask: (
                      <div style={{ borderRadius: "8px" }}>View larger</div>
                    ),
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <Title level={2} className="gradient-text">
                    {productDetails.model}
                  </Title>
                  <Space size="middle">
                    <Tag color="blue">{productDetails.category}</Tag>
                    <Tag color={productDetails.inStock ? "success" : "error"}>
                      {productDetails.inStock ? "In Stock" : "Out of Stock"}
                    </Tag>
                  </Space>
                </div>

                <Space direction="vertical" size="middle">
                  <Title level={5}>Brand</Title>
                  <Text strong>{productDetails.brand}</Text>
                </Space>

                <Divider style={{ margin: "12px 0" }} />

                <div>
                  <Title
                    level={2}
                    className="gradient-text"
                    style={{ margin: 0 }}
                  >
                    ${productDetails.price}
                  </Title>
                  <Rate
                    disabled
                    defaultValue={4.5}
                    style={{ fontSize: 16, marginTop: 8 }}
                  />
                </div>

                <Space direction="vertical" size="small">
                  {features.map((feature, index) => (
                    <Space key={index}>
                      <span className="gradient-text">{feature.icon}</span>
                      <Text>{feature.text}</Text>
                    </Space>
                  ))}
                </Space>

                <Divider style={{ margin: "12px 0" }} />

                <Space size="large" align="start">
                  <div>
                    <Text strong>Quantity</Text>
                    <InputNumber
                      min={1}
                      max={productDetails.stock}
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      style={{ marginLeft: 12 }}
                    />
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={!productDetails.inStock}
                    className="gradient-button"
                    style={{ height: "46px", padding: "0 32px" }}
                  >
                    Add to Cart
                  </Button>
                </Space>

                <Divider style={{ margin: "12px 0" }} />

                <Tabs defaultActiveKey="1">
                  <TabPane tab="Description" key="1">
                    <Paragraph style={{ fontSize: "16px" }}>
                      {productDetails.description ||
                        "No description available."}
                    </Paragraph>
                  </TabPane>
                  <TabPane tab="Specifications" key="2">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Row>
                        <Col span={8}>
                          <Text strong>Category:</Text>
                        </Col>
                        <Col span={16}>{productDetails.category}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          <Text strong>Brand:</Text>
                        </Col>
                        <Col span={16}>{productDetails.brand}</Col>
                      </Row>
                    </Space>
                  </TabPane>
                </Tabs>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
