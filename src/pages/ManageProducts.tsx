import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../redux/services/product/product";
import { cycleTypes } from "./CreateProduct";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  image: string;
}

const ManageProducts: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm] = Form.useForm();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const columns: ColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="product"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      sorter: (a, b) => a.model.localeCompare(b.model),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Mountain", value: "Mountain" },
        { text: "Road", value: "Road" },
        { text: "Hybrid", value: "Hybrid" },
        { text: "BMX", value: "BMX" },
        { text: "Electric", value: "Electric" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (product: Product) => {
    setSelectedProductId(product._id);
    editForm.setFieldsValue({
      model: product.model,
      brand: product.brand,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (id: string, values) => {
    try {
      await updateProduct({
        id,
        data: values, // This matches the { id, data } structure expected by your RTK Query endpoint
      }).unwrap();
      message.success("Product updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      message.error("Failed to update product");
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("Product deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Manage Products</h2>
      <Table
        columns={columns}
        dataSource={products?.data}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={(values) => handleUpdate(selectedProductId, values)}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="model"
            label="Product Model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {cycleTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              precision={2}
              prefix="$"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageProducts;
