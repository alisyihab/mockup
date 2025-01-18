"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";

import frontCommonStyles from "@views/front-pages/styles.module.css";

// Define types
interface Event {
  id: number;
  title: string;
  date: string;
  price: string;
  location: string;
  format: string;
  topic: string;
  organizer: string;
  image: string;
}

interface Filters {
  online: boolean;
  locations: string[];
  format: string[];
  topics: string[];
}

const ExploreEventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    online: false,
    locations: [],
    format: [],
    topics: [],
  });

  const locations: string[] = [
    "Semua Lokasi",
    "Bali",
    "Bandung",
    "DKI Jakarta",
    "Surabaya",
  ];
  const formats: string[] = ["Online", "Offline"];
  const topics: string[] = [
    "Education",
    "Art",
    "Sports",
    "Music",
    "Technology",
  ];

  // Dummy API fetch for events
  const fetchEvents = (start: number, limit: number): Event[] => {
    return Array.from({ length: limit }, (_, i) => ({
      id: start + i,
      title: `Event Title ${start + i}`,
      date: "2025-01-19",
      price: `${(start + i) * 10000}`,
      location: locations[(start + i) % locations.length],
      format: formats[(start + i) % formats.length],
      topic: topics[(start + i) % topics.length],
      organizer: `Organizer ${start + i}`,
      image: "https://placehold.co/400x200",
    }));
  };

  // Load initial events
  useEffect(() => {
    loadMoreEvents();
  }, []);

  const loadMoreEvents = (): void => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const newEvents = fetchEvents(events.length, 8);
      setEvents((prev) => [...prev, ...newEvents]);
      setFilteredEvents((prev) => [...prev, ...newEvents]);
      if (newEvents.length < 8) setHasMore(false);
      setLoading(false);
    }, 1000);
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        loadMoreEvents();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Apply filters
  useEffect(() => {
    const filtered = events.filter((event) => {
      if (filters.online && event.format !== "Online") return false;
      if (
        filters.locations.length > 0 &&
        !filters.locations.includes(event.location)
      )
        return false;
      if (filters.format.length > 0 && !filters.format.includes(event.format))
        return false;
      if (filters.topics.length > 0 && !filters.topics.includes(event.topic))
        return false;
      return true;
    });

    setFilteredEvents(filtered);
  }, [filters, events]);

  // Handle filter changes
  const handleFilterChange = (
    key: keyof Filters,
    value: boolean | string[],
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className={frontCommonStyles.layoutSpacing}
      style={{ marginBottom: "100px", marginTop: "70px" }}
    >
      <Box sx={{ display: "flex", padding: "20px", gap: "20px" }}>
        {/* Filter Sidebar */}
        <Box
          sx={{
            width: "300px",
            background: "#f8f9fa",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Filter
          </Typography>

          {/* Event Online Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={filters.online}
                onChange={(e) => handleFilterChange("online", e.target.checked)}
              />
            }
            label="Event Online"
          />

          {/* Location Filter */}
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Lokasi
          </Typography>
          <TextField
            placeholder="Cari lokasi..."
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <List dense>
            {locations.map((location) => (
              <ListItem key={location} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        const value = e.target.checked
                          ? [...filters.locations, location]
                          : filters.locations.filter((loc) => loc !== location);
                        handleFilterChange("locations", value);
                      }}
                    />
                  }
                  label={location}
                  sx={{ ml: 1 }}
                />
              </ListItem>
            ))}
          </List>

          {/* Format Filter */}
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Format
          </Typography>
          <List dense>
            {formats.map((format) => (
              <ListItem key={format} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        const value = e.target.checked
                          ? [...filters.format, format]
                          : filters.format.filter((fmt) => fmt !== format);
                        handleFilterChange("format", value);
                      }}
                    />
                  }
                  label={format}
                  sx={{ ml: 1 }}
                />
              </ListItem>
            ))}
          </List>

          {/* Topic Filter */}
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Topik
          </Typography>
          <List dense>
            {topics.map((topic) => (
              <ListItem key={topic} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        const value = e.target.checked
                          ? [...filters.topics, topic]
                          : filters.topics.filter((tp) => tp !== topic);
                        handleFilterChange("topics", value);
                      }}
                    />
                  }
                  label={topic}
                  sx={{ ml: 1 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
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
                    >
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                      {event.date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#000", mb: 1 }}>
                      Rp{event.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#999" }}>
                      {event.organizer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Loading Indicator */}
          {loading && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          )}
          {!hasMore && !loading && (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 3 }}>
              Tidak ada lagi event yang tersedia.
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ExploreEventPage;
