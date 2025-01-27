import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const paymentMethods = [
  {
    category: "E Wallet",
    options: [
      {
        id: "67",
        name: "GoPay",
        image: "https://assets.loket.com/images/bank/gopay_v2.png",
        fee: 0,
        accountNumber: "VA-12345678",
      },
      {
        id: "82",
        name: "LinkAja",
        image: "https://assets.loket.com/images/bank/logo-linkaja.png",
        fee: 3000,
        accountNumber: "VA-98765432",
      },
      {
        id: "87",
        name: "ShopeePay",
        image: "https://assets.loket.com/images/bank/logo-shopeepay.png",
        fee: 0,
        accountNumber: "VA-11223344",
      },
    ],
  },
  {
    category: "Virtual Account",
    options: [
      {
        id: "34",
        name: "BCA",
        image: "https://assets.loket.com/images/bank/bca.png",
        fee: 5000,
        accountNumber: "BCA-56789012",
      },
    ],
  },
];

const PaymentMethod: React.FC<{ onPaymentSelect: (payment: any) => void }> = ({
  onPaymentSelect,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = event.target.value;
    const payment = paymentMethods
      .flatMap((method) => method.options)
      .find((option) => option.id === selectedId);

    setSelectedPayment(selectedId);
    if (payment) {
      onPaymentSelect(payment);
    }
  };

  return (
    <Card sx={{ mt: 3, p: 2, borderRadius: "12px" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Metode Pembayaran
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {paymentMethods.map((method) => (
          <Accordion key={method.category} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {method.category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                name="payment-method"
                value={selectedPayment}
                onChange={handlePaymentChange}
              >
                {method.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={2}>
                        <img
                          src={option.image}
                          alt={option.name}
                          style={{ width: 100 }}
                        />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {option.name}
                          </Typography>
                          {option.fee > 0 && (
                            <Typography
                              variant="body2"
                              sx={{ color: "gray", fontSize: "0.9rem" }}
                            >
                              Biaya: Rp{option.fee.toLocaleString("id-ID")}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    }
                    sx={{
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      mb: 2,
                    }}
                  />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        ))}
        <Divider sx={{ mt: 4, mb: 3 }} />
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Pilih metode pembayaran yang sesuai untuk melanjutkan proses
          pembayaran.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
