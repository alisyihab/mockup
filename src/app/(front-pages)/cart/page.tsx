"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { toast } from "react-hot-toast";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

interface CartItem {
  slug: string;
  title: string;
  price: number;
  quantity: number;
  date: string;
  location: string;
}

export default function CartPage() {
  const { setCartCount } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const items: CartItem[] = JSON.parse(storedCart);
      setCartItems(items);
      calculateSubtotal(items);
    }
  }, []);

  // Recalculate subtotal
  const calculateSubtotal = (items: CartItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setSubtotal(total);
  };

  // Increase item quantity
  const handleIncrease = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    calculateSubtotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
  };

  // Decrease item quantity
  const handleDecrease = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      calculateSubtotal(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  // Remove item from cart
  const handleRemove = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    calculateSubtotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    toast.success("Item removed from cart");
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
    setSubtotal(0);
    localStorage.removeItem("cart");
    setCartCount(0);
    toast.success("Cart cleared");
  };

  const handleProcced = () => {
    localStorage.setItem("subtotal", JSON.stringify(subtotal));
  };

  return (
    <>
      <div
        className={frontCommonStyles.layoutSpacing}
        style={{ marginBottom: "100px", marginTop: "200px" }}
      >
        <Box sx={{ padding: 4 }}>
          {cartItems.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 4,
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      Shopping Cart ({cartItems.length} items)
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleClearCart}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      <i className="ri-delete-bin-6-line"></i> &nbsp; Clear Cart
                    </Button>
                  </Box>
                  {cartItems.map((item, index) => (
                    <Card key={item.slug} sx={{ mb: 3 }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {item.title}
                          </Typography>
                          <IconButton
                            onClick={() => handleRemove(index)}
                            color="error"
                            sx={{ ml: 2 }}
                          >
                            <i className="ri-delete-bin-6-line"></i>
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            color: "text.secondary",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="ri-calendar-event-line"
                            style={{ marginRight: "5px" }}
                          ></i>
                          {item.date}
                          <span style={{ margin: "0 8px" }}>|</span>
                          <i
                            className="ri-road-map-line"
                            style={{ marginRight: "5px" }}
                          ></i>
                          {item.location}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography sx={{ color: "text.secondary" }}>
                              Price per ticket
                            </Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              ${item.price.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ color: "text.secondary" }}>
                              Subtotal
                            </Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 2 }}
                        >
                          <IconButton
                            onClick={() => handleDecrease(index)}
                            color="primary"
                          >
                            <i className="ri-close-circle-line"></i>
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton
                            onClick={() => handleIncrease(index)}
                            color="primary"
                          >
                            <i className="ri-add-circle-fill"></i>
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        Order Summary
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography>Subtotal</Typography>
                        <Typography>${subtotal.toFixed(2)}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography>Tax</Typography>
                        <Typography>$0.00</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography>Discount</Typography>
                        <Typography>$0.00</Typography>
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                          fontWeight: "bold",
                        }}
                      >
                        <Typography>Total</Typography>
                        <Typography>${subtotal.toFixed(2)}</Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          mt: 3,
                          textTransform: "none",
                          fontWeight: "bold",
                          color: '#fff'
                        }}
                        LinkComponent={Link}
                        href="/payment"
                        onClick={handleProcced}
                      >
                        Proceed to Checkout
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              <i
                className="ri-shopping-cart-line"
                style={{ fontSize: "100px", color: "#9e9e9e", marginBottom: 2 }}
              />

              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Your Cart is Empty
              </Typography>
              <Typography sx={{ color: "text.secondary", marginBottom: 3 }}>
                Looks like you haven’t added any events to your cart yet.
              </Typography>
              <Button variant="contained" LinkComponent={Link} href="/">
                Home
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
