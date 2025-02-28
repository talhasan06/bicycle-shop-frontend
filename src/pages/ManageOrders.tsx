import React from "react";
import { Table, Tag, Space, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../redux/services/order/order";
import { toast } from "sonner";

interface OrderProduct {
  product: string;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  transaction: {
    id: string;
    bank_status: string;
    method: string;
    invoice_no: string;
    date_time: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  products: OrderProduct[];
  totalPrice: number;
  status: string;
}

const ManageOrders: React.FC = () => {
  const { data: orders, isLoading, refetch } = useGetOrdersQuery({});
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleStatusUpdate = async (id: string) => {
    try {
      await updateOrder(id).unwrap();
      toast.success("Order status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: "Invoice",
      dataIndex: ["transaction", "invoice_no"],
      key: "invoice",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "name"],
      key: "customer",
      render: (_, record) => (
        <div>
          <div>{record.customer?.name}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.customer?.email}
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: ["transaction", "date_time"],
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Payment Method",
      dataIndex: ["transaction", "method"],
      key: "method",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Paid"
              ? "green"
              : status === "Pending"
              ? "orange"
              : status === "Cancelled"
              ? "red"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Delivered" : "Not Delivered"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleStatusUpdate(record._id)}
            type="primary"
            size="small"
          >
            Update Delivery Status
          </Button>
          <Popconfirm
            title="Delete order"
            description="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>Manage Orders</h2>
      <Table
        columns={columns}
        dataSource={orders?.data}
        rowKey="_id"
        loading={isLoading}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: "20px" }}>
              <h4>Order Details</h4>
              <p>
                <strong>Address:</strong> {record.customer.address},{" "}
                {record.customer.city}
              </p>
              <p>
                <strong>Phone:</strong> {record.customer.phone}
              </p>
              <p>
                <strong>Transaction ID:</strong> {record.transaction.id}
              </p>
              <p>
                <strong>Bank Status:</strong> {record.transaction.bank_status}
              </p>
              <h4>Products</h4>
              {record.products.map((item) => (
                <div key={item._id}>
                  Product ID: {item.product} - Quantity: {item.quantity}
                </div>
              ))}
            </div>
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} orders`,
        }}
      />
    </div>
  );
};

export default ManageOrders;
