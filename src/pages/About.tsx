import { Typography, Row, Col, Card, Space, Divider } from "antd";
import {
  EnvironmentOutlined,
  TeamOutlined,
  TrophyOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import React from "react";
const { Title, Paragraph } = Typography;

const About = () => {
  const coreValues = [
    {
      icon: <TeamOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Expert Service",
      description:
        "Our certified technicians provide top-notch service for all bike types.",
    },
    {
      icon: <TrophyOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Quality Products",
      description:
        "We carry only the finest bikes and accessories from trusted brands.",
    },
    {
      icon: (
        <EnvironmentOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
      ),
      title: "Community Focus",
      description:
        "Supporting local cycling events and fostering a cycling community.",
    },
    {
      icon: <HeartOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Customer Care",
      description:
        "Dedicated to ensuring your complete satisfaction with every visit.",
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      {/* Hero Section */}
      <div style={{ marginBottom: 64 }}>
        <Title>About Wheel X</Title>
        <Paragraph style={{ fontSize: "18px", maxWidth: 800 }}>
          Since 2010, Wheel X has been your premier destination for all things
          cycling. We're more than just a bike shop – we're a community hub for
          cyclists of all levels.
        </Paragraph>
      </div>

      {/* Mission Section */}
      <Card style={{ marginBottom: 64 }}>
        <Title level={2}>Our Mission</Title>
        <Paragraph style={{ fontSize: "16px" }}>
          At Wheel X, we're dedicated to spreading the joy of cycling by
          providing exceptional service, expert guidance, and quality products.
          We believe that every great ride begins with the right bike and proper
          fit, which is why we take the time to understand your needs and help
          you find the perfect match.
        </Paragraph>
      </Card>

      {/* Core Values Section */}
      <Title level={2} style={{ marginBottom: 32 }}>
        Our Core Values
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: 64 }}>
        {coreValues.map((value, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              style={{
                height: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Space direction="vertical" size="middle" align="center">
                {value.icon}
                <Title level={4} style={{ margin: "16px 0" }}>
                  {value.title}
                </Title>
                <Paragraph style={{ margin: 0 }}>{value.description}</Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Experience Section */}
      <Card style={{ marginBottom: 64, background: "#f8f9fa" }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <Title level={2}>Our Experience</Title>
            <Paragraph style={{ fontSize: "16px" }}>
              With over a decade of experience, our team of certified mechanics
              and cycling enthusiasts brings expertise and passion to every
              service. We've helped thousands of cyclists find their perfect
              ride and maintain their bikes in peak condition.
            </Paragraph>
            <Paragraph style={{ fontSize: "16px" }}>
              Whether you're a casual rider or a competitive cyclist, we have
              the knowledge and tools to keep you rolling smoothly.
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card style={{ textAlign: "center", background: "#fff" }}>
                  <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
                    10+
                  </Title>
                  <Paragraph>Years of Service</Paragraph>
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ textAlign: "center", background: "#fff" }}>
                  <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
                    5000+
                  </Title>
                  <Paragraph>Happy Customers</Paragraph>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default About;
