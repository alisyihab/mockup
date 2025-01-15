import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import Link from "next/link";
import frontCommonStyles from "@views/front-pages/styles.module.css";

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
      date: "20-08-2024",
      title: "JVJ 2011 JVJ Worldwide Concert Barcelona",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/2.jpg",
      type: "Concert",
      category: "Rock",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 3,
      date: "21-08-2024",
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/3.jpg",
      type: "Show",
      category: "Pop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 4,
      date: "22-02-2024",
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
      date: "10-01-2025",
      title: "JVJ 2011 JVJ Worldwide Concert Barcelona",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/2.jpg",
      type: "Special",
      category: "Kpop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 6,
      date: "03-01-2025",
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/1.jpg",
      type: "Special",
      category: "Kpop",
      link: "/events/healthtech-innovation-summit",
    },
    {
      id: 7,
      date: "20-08-2023",
      title: "2011 Super Junior SM Town Live '10 World Tour New York City",
      description: "Directly seated and inside for you to enjoy the show.",
      image: "/images/front/1.jpg",
      type: "Special",
      category: "Kpop",
      link: "/events/healthtech-innovation-summit",
    },
  ];

  const [category, setCategory] = useState("All");
  const [subFilter, setSubFilter] = useState("new");

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: any) => {
    setCategory(newValue);
  };

  const handleSubFilterChange = (filter: string) => {
    setSubFilter(filter);
  };

  const filteredEvents = allEvents.filter((event) => {
    if (category !== "All" && event.category !== category) return false;

    const eventDate = new Date(event.date);
    const now = new Date();

    if (subFilter === "new" && eventDate < now) return false;
    if (subFilter === "past" && eventDate >= now) return false;

    return true;
  });

  return (
    <section id="upcomingEvent" className="plb-[50px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        <Box>
          {/* Tabs for Categories */}
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            <Tab label="All" value="All" />
            <Tab label="Rock" value="Rock" />
            <Tab label="Pop" value="Pop" />
            <Tab label="Kpop" value="Kpop" />
          </Tabs>

          {/* Sub-Filters */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "right",
              mt: 3,
              mb: 3,
            }}
          >
            <Button
              variant={subFilter === "new" ? "contained" : "outlined"}
              onClick={() => handleSubFilterChange("new")}
            >
              New
            </Button>
            <Button
              variant={subFilter === "past" ? "contained" : "outlined"}
              onClick={() => handleSubFilterChange("past")}
            >
              Past
            </Button>
            <Button
              variant={subFilter === "popular" ? "contained" : "outlined"}
              onClick={() => handleSubFilterChange("popular")}
            >
              Popular
            </Button>
            <Button
              variant={
                subFilter === "recommendation" ? "contained" : "outlined"
              }
              onClick={() => handleSubFilterChange("recommendation")}
            >
              Recommendation
            </Button>
          </Box>

          {/* Event List */}
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
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
                        sx={{ fontWeight: "bold", color: "#7C4DFF", mb: 1 }}
                      >
                        {event.date}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                      >
                        {event.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </section>
  );
};

export default UpcomingEvents;
