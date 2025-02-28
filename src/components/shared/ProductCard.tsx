import React from "react";
import { Card, Typography, Button, message, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/services/cart/cartSlice";
import { toast } from "sonner";
const { Title, Text } = Typography;

const ProductCard = ({ product, isLoading }) => {
  if (isLoading) {
    return (
      <Card
        hoverable
        style={{
          width: "360px",
          height: "460px",
          borderRadius: "12px",
          margin: "0 auto",
        }}
      >
        <Skeleton.Image active style={{ width: "100%", height: "220px" }} />
        <Skeleton active paragraph={{ rows: 2 }} />
      </Card>
    );
  }

  return (
    <Card
      hoverable
      style={{
        width: "360px",
        height: "460px",
        borderRadius: "12px",
        margin: "0 auto",
      }}
      cover={
        <div
          style={{
            height: "220px",
            overflow: "hidden",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
          }}
        >
          <img
            alt={product.name}
            src={product.imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>
      }
      styles={{
        body: {
          padding: "20px",
          borderRadius: "0 0 12px 12px",
        },
      }}
    >
      <Link to={`/product/${product._id}`}>
        <Title
          level={4}
          style={{
            marginBottom: 8,
            color: "#2c3e50",
            transition: "color 0.3s",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="product-title"
        >
          {product.model}
        </Title>
      </Link>
      <Text
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#3498db",
          display: "block",
          marginBottom: 12,
        }}
      >
        ${product.price.toLocaleString()}
      </Text>
      <Text
        type="secondary"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          height: "40px",
          marginBottom: 20,
        }}
      >
        {product.description}
      </Text>
      <Link to={`/product/${product._id}`}>
        <Button
          type="primary"
          icon={<EyeOutlined />}
          className="gradient-button"
          block
        >
          View Details
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
