import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "../../redux/hooks";
import { useCreateOrderMutation } from "../../redux/services/order/order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Drawer, Empty, List, Image } from "antd";
import { useNavigate } from "react-router-dom";

import {
  ShoppingOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React from "react";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/services/cart/cartSlice";

const CartSheet = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartData = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const handlePlaceOrder = async () => {
    if (!user) {
      setOpen(false);
      toast.error("Please login to proceed with checkout", { id: toastId });
      navigate("/login", {
        state: {
          from: location.pathname,
          openCart: true,
        },
      });
      return;
    } else {
      await createOrder({ products: cartData.items });
    }
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      dispatch(clearCart());
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  useEffect(() => {
    const location = window.location;
    if (location.state?.openCart && user) {
      setOpen(true);
      window.history.replaceState(
        { ...window.history.state, openCart: false },
        ""
      );
    }
  }, [user]);

  const handleQuantityChange = (item: any, newQuantity: number) => {
    dispatch(
      updateQuantity({
        id: item.product,
        quantity: newQuantity,
      })
    );
  };

  return (
    <>
      <Button
        type="text"
        onClick={() => setOpen(true)}
        icon={
          <Badge count={cartData?.totalQuantity || 0} offset={[8, 0]}>
            <ShoppingOutlined style={{ fontSize: "24px", color: "white" }} />
          </Badge>
        }
        style={{ marginLeft: "auto" }}
      />

      <Drawer
        title={
          <div className="text-xl font-semibold flex items-center gap-2">
            <ShoppingOutlined />
            Your Cart
          </div>
        }
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={400}
        styles={{
          header: {
            background: "#f8f9fa",
            borderBottom: "1px solid #e9ecef",
          },
          body: {
            background: "#ffffff",
            padding: "20px",
          },
          footer: {
            background: "#f8f9fa",
            borderTop: "1px solid #e9ecef",
            padding: "16px 24px",
          },
        }}
        extra={
          <div className="text-sm text-gray-600 italic">
            {cartData?.totalQuantity || 0} items in cart
          </div>
        }
        footer={
          <div className="space-y-4">
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium text-base">
                  Total Quantity:
                </span>
                <span className="font-bold text-xl text-gray-800">
                  {cartData?.totalQuantity || 0} items
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium text-base">
                  Total Price:
                </span>
                <span className="font-bold text-xl text-blue-600">
                  $
                  {Number(
                    cartData.items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => {
                handlePlaceOrder();
                setOpen(false);
              }}
              style={{
                height: "48px",
                fontSize: "16px",
                background: "linear-gradient(to right, #3B82F6, #2563EB)",
                border: "none",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Button>
          </div>
        }
      >
        {cartData.items.length > 0 ? (
          <List
            className="cart-items-list"
            itemLayout="horizontal"
            dataSource={cartData?.items}
            renderItem={(item) => (
              <List.Item
                className="hover:bg-gray-50 transition-colors rounded-lg p-2"
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(removeFromCart(item.product))}
                    className="hover:bg-red-50"
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      width={80}
                      className="rounded-md object-cover"
                      src={item?.imageUrl}
                      alt={item?.model}
                    />
                  }
                  title={
                    <div className="font-medium text-lg">{item.model}</div>
                  }
                  description={
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Button
                          type="default"
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() =>
                            handleQuantityChange(item, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        />
                        <span className="px-4 py-1 bg-gray-100 rounded min-w-[40px] text-center my-2">
                          {item.quantity}
                        </span>
                        <Button
                          type="default"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                        />
                      </div>
                    </div>
                  }
                />
                <div className="font-semibold text-lg text-green-600">
                  $ {item.price}
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description={
              <span className="text-gray-500">Your cart is empty</span>
            }
            className="my-8"
          />
        )}
      </Drawer>
    </>
  );
};

export default CartSheet;
