"use client";

import { useCart } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface TicketBookingProps {
  price: number;
  availableTickets: number;
  eventSlug: string;
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
}

export default function TicketBooking({
  price,
  availableTickets,
  eventSlug,
  eventTitle,
  eventLocation,
  eventDate
}: TicketBookingProps) {
  const [quantity, setQuantity] = useState(1);
  const { setCartCount } = useCart();

  const handleBook = () => {
    const storedCart = localStorage.getItem("cart");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    const newItem = { slug: eventSlug, title: eventTitle, price, quantity, date: eventDate, location: eventLocation};
    cartItems.push(newItem);

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartCount(cartItems.length);
    toast.success("Item added to cart!");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Ticket Information
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ color: "text.secondary" }}>Price</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            ${price.toFixed(2)}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography sx={{ color: "text.secondary" }}>
            Available Tickets
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {availableTickets}
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
            <Typography sx={{ color: "text.secondary", mr: 2 }}>
              Quantity:
            </Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: availableTickets } }}
              size="small"
              sx={{ width: "80px" }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleBook}
            sx={{
              width: "100%",
              textTransform: "none",
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
            }}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
