"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import EventHeader from "@/views/front-pages/events/EventHeader";
import EventDetails from "@/views/front-pages/events/EventDetails";
import TicketBooking from "@/views/front-pages/events/TicketBooking";
import VenueAndContactInfo from "@/views/front-pages/events/AdditionalInfo";
import httpClient from "@/utils/httpClient";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import { Ticket } from "@/interfaces/ticket";

interface EventProps {
  params: {
    id: string;
  };
}

interface LocationDetails {
  city: string;
  country: string;
  venue_name: string;
  address_line_1: string;
  address_line_2: string;
  state_or_region: string;
  zip_or_postal_code: string;
}

interface EventData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location_details: LocationDetails;
  tags: string[];
  image: string;
  organizer_name: string;
  organizer_phone: string | null;
  organizer_email: string;
  link: string;
  is_online_event: boolean;
  order_timeout_in_minutes: number;
}

export default function EventDetailPage({ params }: EventProps) {
  const { id } = params;

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const response = await httpClient.get(`/event/${id}`);
        setEventData(response.data?.event);
        setTickets(response.data?.tickets || []);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setEventData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const addToCart = (ticket: Ticket, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.ticket_id === ticket.id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.ticket_id === ticket.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [
          ...prevCart,
          {
            event_id: eventData?.id,
            ticket_id: ticket.id,
            title: ticket.title,
            price: ticket.price_after_tax,
            price_id: ticket.ticket_prices_id,
            quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (ticketID: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.ticket_id !== ticketID),
    );
  };

  const updateCartQuantity = (ticketID: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.ticket_id === ticketID ? { ...item, quantity } : item,
      ),
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  if (!eventData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Typography variant="h6">Event not found</Typography>
      </Box>
    );
  }

  return (
    <>
      <EventHeader
        title={eventData.title}
        date={`${eventData.start_date} - ${eventData.end_date}`}
        location={eventData.location_details?.venue_name || "No Location"}
        time={""}
        backgroundImage={
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${eventData.image}` ||
          "/images/placeholder.png"
        }
      />
      <div
        className={frontCommonStyles.layoutSpacing}
        style={{ marginBottom: "100px" }}
      >
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <EventDetails
              description={eventData.description || "No Description"}
              terms={["No Terms Available"]}
              tags={eventData.tags?.length ? eventData.tags : ["No Tags"]}
              organizer={{
                name: eventData.organizer_name,
                followers: 0,
              }}
              ticketInfo={tickets}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TicketBooking cart={cart} />
            <VenueAndContactInfo
              venue={eventData.location_details?.venue_name || ""}
              address={[
                eventData.location_details?.address_line_1,
                eventData.location_details?.address_line_2,
              ]
                .filter(Boolean)
                .join(", ")}
              contactEmail={eventData.organizer_email}
              contactPhone={eventData.organizer_phone || "No Phone"}
              city={eventData.location_details?.city || "No City"}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
