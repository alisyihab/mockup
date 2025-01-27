'use client'

import { Box, Typography, Container, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

const PaymentSuccessPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {/* Icon Centang */}
      <CheckCircleIcon
        sx={{
          fontSize: "8rem",
          color: "green",
          marginBottom: "1rem",
        }}
      />
      {/* Pesan Sukses */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Pembayaran Sukses!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Terima kasih atas pembelian Anda. Silakan cek email Anda untuk tiket
        yang sudah dipesan.
      </Typography>

      {/* Tombol Back to Home */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "2rem", paddingX: "2rem", color: 'white'}}
        onClick={handleBackToHome}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default PaymentSuccessPage;
