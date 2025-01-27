"use client";

import { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import TicketCard from "./TicketTab";
import { Ticket } from "@/interfaces/ticket";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface OrganizerProps {
  name: string;
  followers: number;
}

interface EventDetailsProps {
  description: string;
  ticketInfo: Ticket[];
  terms: string[];
  tags: string[];
  organizer: OrganizerProps;
  addToCart: (ticket: Ticket, quantity: number) => void;
  removeFromCart: (ticketID: number) => void;
  updateCartQuantity: (ticketID: number, quantity: number) => void;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EventDetails({
  description,
  ticketInfo,
  terms,
  tags,
  organizer,
  addToCart,
  removeFromCart,
  updateCartQuantity,
}: EventDetailsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ p: 3 }}>
      {/* Tabs Container */}
      <Box
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="event tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.6)",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "black",
            },
          }}
        >
          <Tab label="Deskripsi" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Tiket" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Box>

      {/* Tab Deskripsi */}
      <TabPanel value={value} index={0}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Deskripsi Acara
          </Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Syarat & Ketentuan
          </Typography>
          <ul style={{ paddingLeft: "20px", marginBottom: "2rem" }}>
            {terms.map((term, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <Typography variant="body1">{term}</Typography>
              </li>
            ))}
          </ul>
          <Divider sx={{ my: 3 }} />
        </Box>
        <Box sx={{ mt: 4 }}>
          {/* Tags Section */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, mt: 10 }}>
            Tags
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 10 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                sx={{
                  fontSize: "0.875rem",
                  padding: "8px 12px",
                  borderRadius: "16px",
                  backgroundColor: "#f7f7f7",
                  color: "#333",
                  fontWeight: "500",
                }}
              />
            ))}
          </Box>

          {/* Organizer Section */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 10 }}>
            Organized by
          </Typography>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#faf8ff",
              padding: "50px",
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {organizer.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                {organizer.followers.toLocaleString("id-ID")} followers
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  color: "purple",
                }}
              >
                Contact
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Follow
              </Button>
            </Box>
          </Card>
        </Box>
      </TabPanel>

      {/* Tab Tiket */}
      <TabPanel value={value} index={1}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Tiket dan Pemesanan
        </Typography>
        {ticketInfo.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
          />
        ))}
      </TabPanel>
    </Card>
  );
}
