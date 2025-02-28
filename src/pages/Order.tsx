import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrderByUserIdQuery } from "../redux/services/order/order";
import { selectCurrentUser, logout } from "../redux/services/auth/authSlice";
import { useSelector } from "react-redux";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: string;
  total: number;
}

const Order: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrderByUserIdQuery(user?.userId, {
    skip: !user?.userId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // Check for unauthorized error (token expired)
    if (error && "status" in error && error.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.error("Session expired. Please login again.");
    }
  }, [error, dispatch, navigate]);

  if (!user?.userId) {
    return <Typography>Please login to view your orders</Typography>;
  }

  if (isLoading) return <Typography>Loading orders...</Typography>;
  if (error)
    return <Typography color="error">Failed to fetch orders</Typography>;
  if (!orders?.data || orders.data.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          margin: 0,
          padding: 0,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No orders found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: "#1a1a1a",
        }}
      >
        <Header />
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 3,
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          mt: "90px", // Add margin to account for fixed header
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            My Order History
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
            "& .MuiTable-root": {
              minWidth: { xs: "650px", md: "800px" },
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Transaction ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Order Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.data?.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8f8f8",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{order?.transaction?.transactionId}</TableCell>
                  <TableCell>
                    {new Date(order?.transaction?.date_time).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor:
                          order.status === "Paid"
                            ? "#e8f5e9"
                            : order.status === "Pending"
                            ? "#fff3e0"
                            : order.status === "Processing"
                            ? "#e3f2fd"
                            : "#fafafa",
                        color:
                          order.status === "Paid"
                            ? "#2e7d32"
                            : order.status === "Pending"
                            ? "#ed6c02"
                            : order.status === "Processing"
                            ? "#1976d2"
                            : "text.primary",
                      }}
                    >
                      {order.status}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"} $
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Footer />
    </Box>
  );
};

export default Order;
