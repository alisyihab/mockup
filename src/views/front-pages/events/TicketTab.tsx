import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add, Remove, InfoOutlined } from "@mui/icons-material";
import { Ticket } from "@/interfaces/ticket";

interface TicketCardProps {
  ticket: Ticket;
  addToCart: (ticket: Ticket, quantity: number) => void;
  removeFromCart: (ticketID: number) => void;
  updateCartQuantity: (ticketID: number, quantity: number) => void;
  initialQuantity?: number;
}

function TicketCard({
  ticket,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  initialQuantity = 0,
}: TicketCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const maxAvailable = ticket.initial_quantity_available - ticket.quantity_sold;

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrease = () => {
    if (quantity < ticket.max_per_order && quantity < maxAvailable) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      addToCart(ticket, 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantity(ticket.id, newQuantity);
    } else {
      setQuantity(0);
      removeFromCart(ticket.id);
    }
  };

  // Validasi apakah tooltip perlu ditampilkan
  const showTooltip =
    ticket.tax_rate ||
    ticket.tax_name ||
    ticket.tax_type ||
    ticket.price_after_tax;

  return (
    <Card
      sx={{
        mb: 3,
        p: 3,
        borderRadius: "16px",
        border: "1px solid #e0e0e0",
        background: "linear-gradient(135deg, #f9f9ff, #ffffff)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: "#7C4DFF",
          }}
        >
          {ticket.title}
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{ color: "gray", mb: 2, fontStyle: "italic" }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html:
              ticket.description && ticket.description.length > 300
                ? `${ticket.description.slice(0, 300)}...`
                : ticket.description || "No description available",
          }}
        />
      </Typography>

      {/* Sale End Info */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "#7C4DFF", fontWeight: "500" }}
        >
          Berakhir {new Date(ticket.sale_end_date).toLocaleDateString("id-ID")}{" "}
          •{" "}
          {new Date(ticket.sale_end_date).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {/* Harga dengan Tooltip */}
        {showTooltip ? (
          <Tooltip
            title={
              <>
                <Typography sx={{ fontSize: "0.875rem", color: "white" }}>
                  Harga sudah termasuk{" "}
                  <strong style={{ color: "white" }}>{ticket.tax_name}</strong>{" "}
                  ({ticket.tax_rate}%)
                </Typography>
              </>
            }
            arrow
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Rp{Number(ticket.price_after_tax || 0).toLocaleString("id-ID")}
              </Typography>
              <InfoOutlined sx={{ color: "#7C4DFF", fontSize: "18px" }} />
            </Box>
          </Tooltip>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            Rp{Number(ticket.price_after_tax || 0).toLocaleString("id-ID")}
          </Typography>
        )}

        {/* Kontrol Kuantitas */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleDecrease}
            sx={{
              color: "purple",
              border: "1px solid purple",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "rgba(124, 77, 255, 0.1)",
              },
            }}
            disabled={quantity === 0}
          >
            <Remove />
          </IconButton>

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "center",
              minWidth: "24px",
            }}
          >
            {quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={handleIncrease}
            sx={{
              color: "purple",
              border: "1px solid purple",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "rgba(124, 77, 255, 0.1)",
              },
            }}
            disabled={
              quantity >= ticket.max_per_order || quantity >= maxAvailable
            }
          >
            <Add />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default TicketCard;
