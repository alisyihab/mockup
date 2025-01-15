"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import classnames from "classnames";
import { toast } from "react-hot-toast";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import DirectionalIcon from "@components/DirectionalIcon";
import { SelectChangeEvent } from "@mui/material";

const countries = [
  "Indonesia",
  "Australia",
  "Brazil",
  "Canada",
  "India",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];

export default function Payment() {
  const [subtotal, setSubtotal] = useState(0);
  const [selectCountry, setSelectCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    zipCode: "",
  });

  // Load subtotal from localStorage
  useEffect(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    if (storedSubtotal) {
      setSubtotal(JSON.parse(storedSubtotal));
    }
  }, []);

  // Handlers
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectCountry(event.target.value as string);
  };

  const handlePaymentMethodChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value);
  };

  const handleBillingDetailsChange = (field: string, value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validasi
    if (!billingDetails.email || !billingDetails.zipCode || !selectCountry) {
      toast.error("Please fill in all billing details.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    // Jika validasi sukses
    toast.success("Payment successful!");
    localStorage.removeItem("cart"); // Kosongkan cart
    localStorage.removeItem("subtotal"); // Hapus subtotal
    setTimeout(() => {
      window.location.href = "/"; // Redirect ke halaman home
    }, 2000);
  };

  return (
    <section
      className={classnames(
        "md:plb-[100px] plb-6",
        frontCommonStyles.layoutSpacing,
      )}
    >
      <Card>
        <Grid container>
          {/* Checkout Details */}
          <Grid item md={12} lg={7}>
            <CardContent className="flex flex-col max-sm:gap-y-5 gap-y-8 sm:p-8 border-be lg:border-be-0 lg:border-e bs-full">
              <div className="flex flex-col gap-2">
                <Typography variant="h4">Checkout</Typography>
                <Typography>
                  All plans include 40+ advanced tools and features to boost
                  your product. Choose the best plan to fit your needs.
                </Typography>
              </div>
              <div className="flex gap-5">
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-method-label">
                        Payment Method
                      </InputLabel>
                      <Select
                        labelId="payment-method-label"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        label="Payment Method"
                      >
                        <MenuItem value="credit-card">Credit Card</MenuItem>
                        <MenuItem value="paypal">PayPal</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Typography variant="h4" className="mbe-6">
                  Billing Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      placeholder="admin@master.com"
                      type="email"
                      value={billingDetails.email}
                      onChange={(e) =>
                        handleBillingDetailsChange("email", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="country-select-label">
                        Billing Country
                      </InputLabel>
                      <Select
                        labelId="country-select-label"
                        value={selectCountry}
                        onChange={handleCountryChange}
                      >
                        {countries.map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Billing Zip / Postal Code"
                      placeholder="123456"
                      fullWidth
                      type="number"
                      value={billingDetails.zipCode}
                      onChange={(e) =>
                        handleBillingDetailsChange("zipCode", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Grid>

          {/* Order Summary */}
          <Grid item md={12} lg={5}>
            <CardContent className="flex flex-col gap-8 sm:p-8">
              <div className="flex flex-col gap-2">
                <Typography variant="h4">Order Summary</Typography>
                <Typography>
                  It can help you manage and service orders before, during, and
                  after fulfillment.
                </Typography>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex gap-2 items-center justify-between mbe-2">
                    <Typography>Subtotal</Typography>
                    <Typography color="text.primary" className="font-medium">
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="flex gap-2 items-center justify-between">
                    <Typography>Tax</Typography>
                    <Typography color="text.primary" className="font-medium">
                      $0.00
                    </Typography>
                  </div>
                  <Divider className="mlb-4" />
                  <div className="flex gap-2 items-center justify-between">
                    <Typography>Total</Typography>
                    <Typography color="text.primary" className="font-medium">
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </div>
                </div>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  endIcon={
                    <DirectionalIcon
                      ltrIconClass="ri-arrow-right-line"
                      rtlIconClass="ri-arrow-left-line"
                    />
                  }
                >
                  Proceed With Payment
                </Button>
              </div>
              <Typography>
                By continuing, you accept to our Terms of Services and Privacy
                Policy. Please note that payments are non-refundable.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </section>
  );
}
