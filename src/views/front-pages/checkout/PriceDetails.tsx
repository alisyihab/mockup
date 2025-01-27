"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

interface PriceDetailsCardProps {
  order: Order | null;
  timeLeft: number | null;
  attendees: Attendee[];
  onSubmit: () => void;
  validateAllFields: () => boolean;
}

const PriceDetailsCard = ({
  order,
  timeLeft,
  attendees,
  onSubmit,
  validateAllFields,
}: PriceDetailsCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTime = (milliseconds: number | null): string => {
    if (!milliseconds || milliseconds <= 0) return "00:00";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const formatRupiah = (value: number) => {
    if (typeof value !== "number") return value;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace("IDR", "Rp")
      .trim();
  };

  const handleSubmit = () => {
    if (!validateAllFields()) {
      alert("Harap lengkapi semua detail peserta dengan benar.");
      return;
    }

    setIsSubmitting(true);
    onSubmit();
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {/* Timer */}
        <Box
          sx={{
            backgroundColor: "yellow",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {formatTime(timeLeft)}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            Segera selesaikan pesananmu
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Detail Harga */}
        <Typography variant="h6" gutterBottom>
          Detail Harga
        </Typography>
        {order?.order_items?.map((item) => (
          <Box key={item.id} sx={{ marginBottom: "0.5rem" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="body1">
                {item.quantity} x {item.item_name}
              </Typography>
              <Box>
                {item.price_before_discount && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "gray",
                      marginRight: "0.5rem",
                      display: "inline-block",
                    }}
                  >
                    {formatRupiah(item.price_before_discount * item.quantity)}
                  </Typography>
                )}
                <Typography variant="body1" display="inline">
                  {formatRupiah(item.price * item.quantity)}
                </Typography>
              </Box>
            </Grid>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Subtotal */}
        <Grid container justifyContent="space-between">
          <Typography variant="body1">
            <b>Subtotal</b>
          </Typography>
          <Typography variant="body1">
            {formatRupiah(order?.total_before_additions ?? 0)}
          </Typography>
        </Grid>

        {/* Taxes */}
        {order?.taxes_and_fees_rollup?.taxes?.map((tax, index) => (
          <Grid container justifyContent="space-between" key={index}>
            <Typography variant="body1">{tax.name}</Typography>
            <Typography variant="body1">{formatRupiah(tax.value)}</Typography>
          </Grid>
        ))}

        {/* Fees */}
        {order?.taxes_and_fees_rollup?.fees?.map((fee, index) => (
          <Grid container justifyContent="space-between" key={index}>
            <Typography variant="body1">{fee?.name}</Typography>
            <Typography variant="body1">{formatRupiah(fee?.value)}</Typography>
          </Grid>
        ))}

        {/* Refund (Optional) */}
        {order?.total_refunded && order?.total_refunded > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between">
              <Typography variant="body1">Refunded</Typography>
              <Typography variant="body1" sx={{ color: "red" }}>
                -{formatRupiah(order?.total_refunded)}
              </Typography>
            </Grid>
          </>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Grid container justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {formatRupiah(
              order?.total_refunded
                ? (order?.total_gross ?? 0) - (order?.total_refunded ?? 0)
                : (order?.total_gross ?? 0),
            )}
          </Typography>
        </Grid>

        {/* Pay Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1rem" }}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Memproses..." : "Bayar Tiket"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceDetailsCard;
