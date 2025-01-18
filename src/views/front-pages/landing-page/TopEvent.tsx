import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

import frontCommonStyles from "@views/front-pages/styles.module.css";

const popularEvents = [
  {
    id: 1,
    title: "Hollywood Music Festival",
    date: "19 Feb 2025",
    location: "Hollywood Bowl, Los Angeles",
    image: "https://placehold.co/600x300?text=Hollywood+Music+Festival",
  },
  {
    id: 2,
    title: "Symphony of Dreams",
    date: "25 Jan 2025",
    location: "Walt Disney Concert Hall, Los Angeles",
    image: "https://placehold.co/600x300?text=Symphony+of+Dreams",
  },
  {
    id: 3,
    title: "Chinese New Year Festival",
    date: "10 Feb 2025",
    location: "Chinatown, Los Angeles",
    image: "https://placehold.co/600x300?text=Chinese+New+Year+Festival",
  },
];

const PopularEvents = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FBB4A5",
        color: "#fff",
        padding: "30px 20px",
      }}
    >
      <div className={frontCommonStyles.layoutSpacing}>
        {/* Section Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#fff",
            textAlign: "left",
            paddingLeft: "30px",
          }}
        >
          Popular Event
        </Typography>

        {/* Events List */}
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {popularEvents.map((event, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={event.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Number */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                {index + 1}
              </Typography>

              {/* Event Card */}
              <Card
                sx={{
                  flex: 1,
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default PopularEvents;
