import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import frontCommonStyles from "@views/front-pages/styles.module.css";
import Link from "next/link";

const UpcomingEvents = () => {
  const allEvents = [
    {
      id: 1,
      date: "APR 14",
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We'll get you directly seated and inside for you to enjoy the show.",
      image: "/images/front/1.jpg",
      type: "Concert",
      category: "Rock",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 2,
      date: "AUG 20",
      title: "JVJ 2011 JVJ Worldwide Concert Barcelona",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/2.jpg",
      type: "Concert",
      category: "Rock",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 3,
      date: "SEP 18",
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/3.jpg",
      type: "Show",
      category: "Pop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 4,
      date: "APR 14",
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We'll get you directly seated and inside for you to enjoy the show.",
      image: "/images/front/3.jpg",
      type: "Show",
      category: "Pop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 5,
      date: "AUG 20",
      title: "JVJ 2011 JVJ Worldwide Concert Barcelona",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/2.jpg",
      type: "Special",
      category: "Kpop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 6,
      date: "SEP 18",
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/1.jpg",
      type: "Special",
      category: "Kpop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 7,
      date: "SEP 18",
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/1.jpg",
      type: "Special",
      category: "Kpop",
      link: "/events/healthtech-innovation-summit",
    },
  ];

  const [filters, setFilters] = useState({
    weekdays: "",
    eventType: "",
    category: "",
  });

  const [displayedEvents, setDisplayedEvents] = useState(allEvents.slice(0, 6));

  const handleFilterChange = (key: any, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    applyFilters({ ...filters, [key]: value });
  };

  const applyFilters = (updatedFilters: any) => {
    const filtered = allEvents.filter((event) => {
      const matchWeekdays =
        !updatedFilters.weekdays ||
        event.date.startsWith(updatedFilters.weekdays);
      const matchType =
        !updatedFilters.eventType || event.type === updatedFilters.eventType;
      const matchCategory =
        !updatedFilters.category || event.category === updatedFilters.category;
      return matchWeekdays && matchType && matchCategory;
    });
    setDisplayedEvents(filtered);
  };

  // Generate unique filter options from the data
  const uniqueWeekdays = [
    ...new Set(allEvents.map((event) => event.date.split(" ")[0])),
  ];
  const uniqueEventTypes = [...new Set(allEvents.map((event) => event.type))];
  const uniqueCategories = [
    ...new Set(allEvents.map((event) => event.category)),
  ];

  const handleLoadMore = () => {
    const nextEvents = allEvents.slice(
      displayedEvents.length,
      displayedEvents.length + 6,
    );
    setDisplayedEvents([...displayedEvents, ...nextEvents]);
  };

  return (
    <section id="upcomingEvent" className="plb-[150px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        <Box>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
              flexDirection: {
                xs: "column", // Stack vertically on small screens
                sm: "row", // Align horizontally on medium and larger screens
              },
              gap: {
                xs: 2, // Add spacing between elements on small screens
                sm: 0, // No gap on medium and larger screens
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: {
                  xs: "center", // Center align text on small screens
                  sm: "left", // Left align text on medium and larger screens
                },
                mb: {
                  xs: 2, // Add margin-bottom on small screens
                  sm: 0, // No margin-bottom on medium and larger screens
                },
              }}
            >
              Upcoming Events
            </Typography>

            {/* Filters */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap", // Wrap filters to new lines on smaller screens
                justifyContent: {
                  xs: "center", // Center align on small screens
                  sm: "flex-end", // Align to the end on medium and larger screens
                },
              }}
            >
              <TextField
                select
                label="Weekdays"
                value={filters.weekdays}
                onChange={(e) => handleFilterChange("weekdays", e.target.value)}
                sx={{
                  borderRadius: "20px",
                  minWidth: {
                    xs: "120px", // Smaller width on small screens
                    sm: "150px", // Larger width on medium and larger screens
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueWeekdays.map((weekday) => (
                  <MenuItem key={weekday} value={weekday}>
                    {weekday}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Event Type"
                value={filters.eventType}
                onChange={(e) =>
                  handleFilterChange("eventType", e.target.value)
                }
                sx={{
                  borderRadius: "20px",
                  minWidth: {
                    xs: "120px",
                    sm: "150px",
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueEventTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Any Category"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                sx={{
                  borderRadius: "20px",
                  minWidth: {
                    xs: "120px",
                    sm: "150px",
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* Event List */}
          <Grid container spacing={3}>
            {displayedEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Link href={event.link} passHref legacyBehavior>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image}
                      alt={event.title}
                      sx={{
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: "#7C4DFF",
                          mb: 1,
                        }}
                      >
                        {event.date}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#333",
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                        }}
                      >
                        {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          {/* Load More Button */}
          {displayedEvents.length < allEvents.length && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 20,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                sx={{
                  padding: "10px 40px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </section>
  );
};

export default UpcomingEvents;
