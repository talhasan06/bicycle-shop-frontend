import React from "react";
import {
  Carousel,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Spin,
  Space,
  theme,
  Rate,
  Avatar,
} from "antd";
import {
  RightOutlined,
  LeftOutlined,
  UserOutlined,
  ToolOutlined,
  StarOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import { useGetProductsQuery } from "./redux/services/product/product"; // Adjust this import path
import "./App.css";
import ProductCard from "./components/shared/ProductCard";
import { IProduct } from "./components/shared/ProductCard";
import { useRef } from "react";

const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

function App() {
  const { token } = useToken();
  const { isLoading, data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const products: IProduct[] = data?.data || [];

  const testimonials = [
    {
      author: "John Doe",
      text: "Best bicycle shop I've ever dealt with. Amazing service!",
    },
    {
      author: "Jane Smith",
      text: "Great selection and competitive prices. Highly recommended!",
    },
    {
      author: "Mike Johnson",
      text: "Professional staff and excellent after-sales support.",
    },
  ];

  const features = [
    {
      icon: <ToolOutlined />,
      title: "Expert Service",
      description:
        "Our certified technicians provide professional maintenance and repairs for all bike types.",
    },
    {
      icon: <StarOutlined />,
      title: "Quality Products",
      description:
        "We carry only the best brands and latest models to ensure your satisfaction.",
    },
    {
      icon: <DollarOutlined />,
      title: "Price Match Guarantee",
      description:
        "Find it cheaper elsewhere? We'll match the price and give you superior service.",
    },
  ];

  const carouselStyle = {
    slide: {
      height: 600,
      position: "relative" as const,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    overlay: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: token.paddingLG,
    },
  };

  const carouselRef = useRef<any>(null);

  return (
    <div>
      {/* Banner Carousel */}
      <Carousel autoplay>
        <div>
          <div style={carouselStyle.slide}>
            <img
              src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1920"
              alt="Mountain bikes on sale"
              style={carouselStyle.image}
            />
            <div style={carouselStyle.overlay}>
              <Space direction="vertical" align="center" size="large">
                <Title style={{ color: token.colorWhite, margin: 0 }} level={1}>
                  Special Offer: 20% Off Mountain Bikes
                </Title>
                <Paragraph
                  style={{
                    color: token.colorWhite,
                    fontSize: token.fontSizeXL,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Discover our premium collection of mountain bikes perfect for
                  any terrain
                </Paragraph>
                <Button size="large" className="gradient-button">
                  Shop Now
                </Button>
              </Space>
            </div>
          </div>
        </div>
        <div>
          <div style={carouselStyle.slide}>
            <img
              src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1920"
              alt="Electric bikes collection"
              style={carouselStyle.image}
            />
            <div style={carouselStyle.overlay}>
              <Space direction="vertical" align="center" size="large">
                <Title style={{ color: token.colorWhite, margin: 0 }} level={1}>
                  New Electric Bikes Collection
                </Title>
                <Paragraph
                  style={{
                    color: token.colorWhite,
                    fontSize: token.fontSizeXL,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Experience the future of cycling with our latest e-bike models
                </Paragraph>
                <Button type="primary" size="large" className="gradient-button">
                  Explore E-Bikes
                </Button>
              </Space>
            </div>
          </div>
        </div>
        <div>
          <div style={carouselStyle.slide}>
            <img
              src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1920"
              alt="Bike service"
              style={carouselStyle.image}
            />
            <div style={carouselStyle.overlay}>
              <Space direction="vertical" align="center" size="large">
                <Title style={{ color: token.colorWhite, margin: 0 }} level={1}>
                  Free Service Check for Members
                </Title>
                <Paragraph
                  style={{
                    color: token.colorWhite,
                    fontSize: token.fontSizeXL,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Join our membership program and get complimentary bike
                  maintenance
                </Paragraph>
                <Button type="primary" size="large" className="gradient-button">
                  Learn More
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Featured Bicycles */}
      <div style={{ padding: "60px 0 40px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <Title level={2} className="section-title">
              Featured Bicycles
            </Title>
            <Paragraph
              style={{
                fontSize: "18px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Discover our handpicked selection of premium bikes for every rider
            </Paragraph>
          </div>

          <div style={{ position: "relative" }}>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <Spin size="large" />
              </div>
            ) : (
              <>
                <Button
                  type="default"
                  icon={<LeftOutlined />}
                  onClick={() => carouselRef.current?.prev()}
                  style={{
                    position: "absolute",
                    left: "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e0e0e0",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <Button
                  type="default"
                  icon={<RightOutlined />}
                  onClick={() => carouselRef.current?.next()}
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e0e0e0",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <Carousel
                  ref={carouselRef}
                  slidesToShow={3}
                  slidesToScroll={1}
                  dots={false}
                  arrows={false}
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                      },
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 1,
                      },
                    },
                  ]}
                >
                  {products.map((item) => (
                    <div key={item._id} style={{ padding: "0 24px" }}>
                      <ProductCard product={item} isLoading={isLoading} />
                    </div>
                  ))}
                </Carousel>

                {/* View All Button */}
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <Link to="/shop">
                    <Button
                      type="primary"
                      size="large"
                      className="gradient-button"
                      icon={<RightOutlined />}
                    >
                      View All Bicycles
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        style={{
          background: "linear-gradient(165deg, #f8f9ff 0%, #ffffff 100%)",
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
          }}
        >
          <Space
            direction="vertical"
            align="center"
            style={{ width: "100%", marginBottom: token.marginLG * 2 }}
          >
            <Title level={2} className="section-title">
              What Our Customers Say
            </Title>
            <Paragraph type="secondary" style={{ fontSize: token.fontSizeLG }}>
              Read genuine reviews from our valued customers
            </Paragraph>
          </Space>

          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  hoverable
                  styles={{
                    body: {
                      padding: token.padding * 1.5,
                    },
                  }}
                >
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(45deg, #3498db, #2ecc71)",
                        padding: "2px",
                        borderRadius: "50%",
                        width: "fit-content",
                      }}
                    >
                      <Avatar
                        size={64}
                        style={{
                          border: "2px solid #fff",
                          background: "#fff",
                          color: "#2ecc71",
                        }}
                      >
                        {testimonial.author[0]}
                      </Avatar>
                    </div>
                    <div>
                      <Rate
                        disabled
                        defaultValue={5}
                        style={{ color: "#3498db", fontSize: 16 }}
                      />
                      <Paragraph
                        style={{
                          fontSize: token.fontSizeLG,
                          margin: `${token.margin}px 0`,
                          fontStyle: "italic",
                        }}
                      >
                        "{testimonial.text}"
                      </Paragraph>
                    </div>
                    <Space direction="vertical" size={0}>
                      <Typography.Text strong style={{ fontSize: 16 }}>
                        {testimonial.author}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        Verified Buyer
                      </Typography.Text>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
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
      </div>

      {/* Why Choose Us Section */}
      <div style={{ padding: `${token.paddingLG}px 0` }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: `0 ${token.padding}px`,
          }}
        >
          <Space
            direction="vertical"
            align="center"
            style={{ width: "100%", marginBottom: token.marginLG }}
          >
            <Title level={2} className="section-title">
              Why Choose Us
            </Title>
            <Paragraph type="secondary" style={{ fontSize: token.fontSizeLG }}>
              Experience the difference with our premium service
            </Paragraph>
          </Space>

          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  hoverable
                  style={{ textAlign: "center" }}
                  styles={{
                    body: {
                      padding: token.paddingLG,
                    },
                  }}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <Avatar
                      size={64}
                      icon={feature.icon}
                      className="gradient-background"
                    />
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph type="secondary">
                      {feature.description}
                    </Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
