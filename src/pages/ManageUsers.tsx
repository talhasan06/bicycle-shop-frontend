import React from "react";
import { Table, Tag, Button, message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "../redux/services/user/user";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const ManageUsers: React.FC = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery({});

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusToggle = async (id) => {
    try {
      await updateUserStatus(id).unwrap();

      toast.success("User status updated successfully");
      refetch();
    } catch (error) {
      message.error("Failed to update user status");
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "ACTIVE" : "DEACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type={record.isActive ? "default" : "primary"}
            danger={record.isActive}
            onClick={() => handleStatusToggle(record?._id)}
            disabled={record.role === "admin"}
          >
            {record.isActive ? "Deactivate" : "Activate"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>Manage Users</h2>
      <Table
        columns={columns}
        dataSource={users?.data}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
        }}
      />
    </div>
  );
};

export default ManageUsers;
