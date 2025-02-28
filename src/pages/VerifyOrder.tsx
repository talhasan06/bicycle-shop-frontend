import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Container,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useVerifyOrderQuery } from "../redux/services/order/order";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1),
  "& .label": {
    fontWeight: 500,
    minWidth: 120,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  minWidth: 100,
}));

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

const VerifyOrder: React.FC = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const orderData: OrderData = data?.data;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Order Details</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link to="/">
              <Button variant="outlined" color="primary">
                Back to Home
              </Button>
            </Link>
            {orderData?.status === "Paid" ? (
              <StatusChip label="Paid" color="success" variant="outlined" />
            ) : (
              <StatusChip label="Pending" color="warning" variant="outlined" />
            )}
          </Box>
        </Box>

        <StyledPaper>
          <Grid container spacing={4}>
            {/* Order Information */}
            <Grid xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Order Information
              </Typography>
              <InfoRow>
                <Typography className="label">Order ID:</Typography>
                <Typography>{orderData?.transaction?.transactionId}</Typography>
              </InfoRow>
              <InfoRow>
                <Typography className="label">Date:</Typography>
                <Typography>{orderData?.transaction?.date_time}</Typography>
              </InfoRow>
              <InfoRow>
                <Typography className="label">Payment Method:</Typography>
                <Typography>{orderData?.transaction?.method}</Typography>
              </InfoRow>
            </Grid>

            {/* Customer Information */}
            <Grid xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Customer Information
              </Typography>
              <InfoRow>
                <Typography className="label">Name:</Typography>
                <Typography>{orderData?.customer?.name}</Typography>
              </InfoRow>
              <InfoRow>
                <Typography className="label">Email:</Typography>
                <Typography>{orderData?.customer?.email}</Typography>
              </InfoRow>
              <InfoRow>
                <Typography className="label">Phone:</Typography>
                <Typography>{orderData?.customer?.phone}</Typography>
              </InfoRow>
            </Grid>

            {/* Items */}
            <Grid xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Order Items
              </Typography>
              <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 2 }}>
                <Grid container spacing={2} sx={{ fontWeight: 500 }}>
                  <Grid xs={6}>Product</Grid>
                  <Grid xs={2} sx={{ textAlign: "center" }}>
                    Quantity
                  </Grid>
                  <Grid xs={2} sx={{ textAlign: "right" }}>
                    Price
                  </Grid>
                  <Grid xs={2} sx={{ textAlign: "right" }}>
                    Total
                  </Grid>
                </Grid>
              </Box>
              {orderData?.products.map((item) => (
                <Box key={item} sx={{ py: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid xs={6}>Product Name {item.product}</Grid>
                    <Grid xs={2} sx={{ textAlign: "center" }}>
                      {item.quantity}
                    </Grid>
                    <Grid xs={2} sx={{ textAlign: "right" }}>
                      $29.99
                    </Grid>
                    <Grid xs={2} sx={{ textAlign: "right" }}>
                      $59.98
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

            {/* Summary */}
            <Grid xs={12}>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ ml: "auto", width: { xs: "100%", sm: "300px" } }}>
                <InfoRow>
                  <Typography className="label">Subtotal:</Typography>
                  <Typography sx={{ ml: "auto" }}>$119.96</Typography>
                </InfoRow>
                <InfoRow>
                  <Typography className="label">Shipping:</Typography>
                  <Typography sx={{ ml: "auto" }}>$5.99</Typography>
                </InfoRow>
                <InfoRow>
                  <Typography className="label">Tax:</Typography>
                  <Typography sx={{ ml: "auto" }}>$12.00</Typography>
                </InfoRow>
                <Divider sx={{ my: 2 }} />
                <InfoRow>
                  <Typography className="label" variant="h6">
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ ml: "auto" }}>
                    {orderData?.totalPrice}
                  </Typography>
                </InfoRow>
              </Box>
            </Grid>

            {/* Actions */}
            <Grid xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button variant="contained" color="primary">
                  Print Invoice
                </Button>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default VerifyOrder;
