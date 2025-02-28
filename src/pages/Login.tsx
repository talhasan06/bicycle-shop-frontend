import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../redux/services/auth/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser, setUser } from "../redux/services/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || "/";

  const isAuthenticated = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [login, { isLoading, isSuccess, data, isError, error }] =
    useLoginMutation();

  const onFinish = async (values: { email: string; password: string }) => {
    await login(values);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Logging in...", {
        id: "login",
      });
    }

    if (isSuccess && data) {
      const token = data.data;
      const user = jwtDecode(token);
      dispatch(setUser({ user, token }));

      toast.success(data.message || "Login successful!", {
        id: "login",
      });

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    }

    if (isError) {
      toast.error((error as any)?.data?.message || "Login failed", {
        id: "login",
      });
    }
  }, [isLoading, isSuccess, isError, data, error, dispatch, navigate, from]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        position: "relative",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(4px)",
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "10px",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Login
        </Title>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
              className="gradient-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
