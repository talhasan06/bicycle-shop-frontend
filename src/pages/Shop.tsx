import React, { useState } from "react";
import {
  Layout,
  Input,
  Row,
  Col,
  Select,
  Slider,
  Button,
  Typography,
  Space,
  Drawer,
  Spin,
  Empty,
  message,
} from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetProductsQuery } from "../redux/services/product/product";
import ProductCard from "../components/shared/ProductCard";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedAvailability, setSelectedAvailability] = useState<
    boolean | null
  >(null);

  // Updated query hook with error state
  const { data, isLoading, error, isError } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const products = data?.data || [];

  // Extract unique brands and categories from products
  const brands = [...new Set(products?.map((product) => product.brand))];
  const categories = [...new Set(products?.map((product) => product.category))];

  // Filter products based on search and filters
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesAvailability =
      selectedAvailability === null || product.inStock === selectedAvailability;

    return matchesSearch && matchesPrice && matchesAvailability;
  });

  return (
    <Content>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(165deg, #f8f9ff 0%, #ffffff 100%)",
          padding: "60px 0 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Space
            direction="vertical"
            align="center"
            style={{ width: "100%", marginBottom: 40 }}
          >
            <Title className="section-title">Our Collection</Title>
            <Paragraph
              type="secondary"
              style={{ fontSize: 18, textAlign: "center" }}
            >
              Discover our wide range of premium bicycles for every rider
            </Paragraph>
          </Space>

          {/* Search and Filter Bar */}
          <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 40 }}>
            <Col xs={24} sm={16} md={18}>
              <Input
                size="large"
                placeholder="Search bicycles by name, brand, or category..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Button
                size="large"
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerVisible(true)}
                style={{ width: "100%" }}
              >
                Filters
              </Button>
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
      </div>

      {/* Products Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
          </div>
        ) : isError ? (
          <Empty description="Failed to load products" />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredProducts?.map((product) => (
              <Col xs={24} sm={12} md={8} key={product.id}>
                <ProductCard product={product} isLoading={isLoading} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Filter Drawer */}
      <Drawer
        title="Filters"
        placement="right"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        width={320}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={5}>Availability</Title>
            <Select
              style={{ width: "100%" }}
              placeholder="Select availability"
              value={selectedAvailability}
              onChange={setSelectedAvailability}
              allowClear
            >
              <Option key="inStock" value={true}>
                In Stock
              </Option>
              <Option key="outOfStock" value={false}>
                Out of Stock
              </Option>
            </Select>
          </div>

          <div>
            <Title level={5}>Price Range</Title>
            <Slider
              range
              min={0}
              max={5000}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              tipFormatter={(value) => `$${value}`}
            />
          </div>

          <Space.Compact style={{ width: "100%" }}>
            <Button
              style={{
                width: "30%",
                borderRadius: "6px 0 0 6px", // Round only left corners
                background: "#fff",
                borderColor: "#d9d9d9",
                color: "#666",
              }}
              onClick={() => {
                setSelectedAvailability(null);
                setPriceRange([0, 5000]);
              }}
            >
              Clear
            </Button>
            <Button
              type="primary"
              style={{
                width: "70%",
                borderRadius: "0 6px 6px 0", // Round only right corners
                background: "linear-gradient(to right, #1890ff, #096dd9)",
                border: "none",
              }}
              onClick={() => {
                setFilterDrawerVisible(false);
              }}
            >
              Apply Filters
            </Button>
          </Space.Compact>
        </Space>
      </Drawer>
    </Content>
  );
};

export default Shop;
