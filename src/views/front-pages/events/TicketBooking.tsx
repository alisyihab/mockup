"use client";

import Link from "@/components/Link";
import httpClient from "@/utils/httpClient";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Divider,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface TicketBookingProps {
  cart: any[];
}

export default function TicketBooking({ cart }: TicketBookingProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [showCouponField, setShowCouponField] = useState<boolean>(false);

  const router = useRouter();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 150);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleApplyCoupon = async () => {
    try {
      const response = await httpClient.get(
        `/events/${cart[0]?.event_id}/promo-codes/${couponCode}`,
      );

      if (response.data.valid === true) {
        setIsCouponValid(true);
      } else {
        setIsCouponValid(false);
      }
      setShowSnackbar(true);
    } catch (e) {
      console.error("Error validating coupon:", e);
      setIsCouponValid(false);
      setShowSnackbar(true);
    }
  };

  const handlePurchase = async () => {
    try {
      const payload = {
        tickets: cart.map((item) => ({
          ticket_id: item.ticket_id,
          quantities: [
            {
              quantity: item.quantity,
              price_id: item.price_id,
            },
          ],
        })),
        promo_code: couponCode,
      };

      const response = await httpClient.post(
        `/events/${cart[0]?.event_id}/order`,
        payload,
      );

      if (response.status === 201) {
        const { short_id: orderId, reserved_until } = response.data.data;
        const eventId = cart[0]?.event_id;

        const expires = new Date(reserved_until);

        Cookies.set("orderId", orderId, { expires });
        Cookies.set("eventId", eventId, { expires });

        router.push("/checkout");
      } else {
        alert("Order gagal dibuat, coba lagi.");
      }
    } catch (error) {
      console.error("Error saat melakukan pemesanan:", error);
      alert("Terjadi kesalahan saat memproses order.");
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleToggleCouponField = () => {
    if (isCouponValid) {
      setCouponCode(null);
      setIsCouponValid(null);
    }
    setShowCouponField(!showCouponField);
  };

  if (cart.length === 0) {
    return (
      <Card
        sx={{
          position: isSticky ? "sticky" : "static",
          top: isSticky ? 80 : "auto",
          zIndex: isSticky ? 1000 : "auto",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Anda Belum memilih tiket
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        position: isSticky ? "sticky" : "static",
        top: isSticky ? 80 : "auto",
        zIndex: isSticky ? 1000 : "auto",
      }}
    >
      <CardContent>
        {cart.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  color: "#000",
                }}
              >
                Rp{item.price.toLocaleString("id-ID")}
              </Typography>
            </Box>

            <Typography variant="body2">{item.quantity} Tiket</Typography>
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}

        {/* Total harga */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Total {cart.reduce((total, item) => total + item.quantity, 0)} Tiket
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "#000",
            }}
          >
            Rp{calculateTotal().toLocaleString("id-ID")}
          </Typography>
        </Box>

        {/* Kupon Code */}
        {!showCouponField ? (
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 3,
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={handleToggleCouponField}
          >
            Punya Kode Kupon?
          </Button>
        ) : (
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                size="small"
                variant="outlined"
                placeholder="Masukan kode kupon"
                value={couponCode || ""}
                onChange={(e) => setCouponCode(e.target.value)}
                sx={{ flex: 1 }}
                InputProps={{
                  readOnly: isCouponValid === true,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={
                  isCouponValid ? handleToggleCouponField : handleApplyCoupon
                }
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {isCouponValid ? "Ubah" : "Apply"}
              </Button>
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 8,
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            padding: "12px",
            borderRadius: "8px",
          }}
          onClick={handlePurchase}
        >
          Beli Tiket
        </Button>
      </CardContent>
    </Card>
  );
}
