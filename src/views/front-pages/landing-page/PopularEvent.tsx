import React from "react";
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

// Generate 8 dummy events dynamically
const events = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: `Event Title ${index + 1}`,
  date: `Date ${index + 1}`,
  location: `Location ${index + 1}`,
  price: `From $${(index + 1) * 10}`,
  followers: `${(index + 1) * 100} followers`,
  image: "https://placehold.co/400x200",
  promoted: index % 2 === 0, // Alternate between promoted and non-promoted
}));

const EventCard = ({ event }: { event: (typeof events)[0] }) => {
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
        image={event.image}
        alt={event.title}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 1 }}
          noWrap
        >
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.location}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
          {event.price}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {event.followers}
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
              Popular Online Event
            </Typography>
            <Link
              href="/explore"
              underline="hover"
              sx={{ fontSize: "14px", color: "#6A5ACD" }}
            >
              Explore more events &rarr;
            </Link>
          </Box>

          {/* Event Grid */}
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={3} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </section>
  );
};

export default EventList;
