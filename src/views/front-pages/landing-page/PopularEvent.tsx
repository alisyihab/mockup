import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Link,
} from "@mui/material";

import frontCommonStyles from "@views/front-pages/styles.module.css";
import httpClient from "@/utils/httpClient";

const EventCard = ({ event }: { event: any }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${event.image}` || "https://placehold.co/400x200"}
        alt={event.title || "Event Image"}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 1 }}
          noWrap
        >
          {event.title || "Untitled Event"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.date || "No date available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.location || "No location provided"}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
          {event.price ? `From ${event.price}` : "Free"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {event.followers || "No followers"}
        </Typography>
        {event.promoted && (
          <Typography
            variant="caption"
            color="secondary"
            sx={{ display: "block", mt: 1 }}
          >
            Promoted
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get("/event-online");
        setEvents(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="plb-[20px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        <Box sx={{ padding: "20px" }}>
          {/* Heading Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Popular Online Events
            </Typography>
            <Link
              href="/explore"
              underline="hover"
              sx={{ fontSize: "14px", color: "#6A5ACD" }}
            >
              Explore more events &rarr;
            </Link>
          </Box>

          {/* Loading and Error States */}
          {loading && (
            <Typography variant="body1" color="text.secondary">
              Loading events...
            </Typography>
          )}
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}

          {/* Event Grid */}
          {!loading && !error && events.length > 0 && (
            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} sm={6} md={3} key={event.id}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>
          )}

          {/* No Data Available */}
          {!loading && !error && events.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              No events available at the moment.
            </Typography>
          )}
        </Box>
      </div>
    </section>
  );
};

export default EventList;
