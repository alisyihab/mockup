"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
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
import httpClient from "@/utils/httpClient";
import formatRupiah from "@/utils/formatRupiah";

// Define types
interface Event {
  id: number;
  title: string;
  start_date: string;
  price: number;
  location_details: string;
  is_online_event: boolean;
  topic_id: number;
  organizer_name: string;
  image: string;
  link: string;
}

interface Filters {
  online: boolean;
  format: string[];
  topics: number[];
}

const ExploreEventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);
  const [filters, setFilters] = useState<Filters>({
    online: false,
    format: [],
    topics: [],
  });

  const formats: string[] = ["Online", "Offline"];

  // Load events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/explore");
        setEvents(response.data.data || []);
        setFilteredEvents(response.data.data || []);
        setHasMore(response.data.next_page_url !== null);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Load topics from API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await httpClient.get("/get-topic");
        setTopics(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    fetchTopics();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = events.filter((event) => {
      if (filters.online && !event.is_online_event) return false;
      if (filters.format.length > 0) {
        const isOnline = filters.format.includes("Online");
        const isOffline = filters.format.includes("Offline");
        if (
          (isOnline && !event.is_online_event) ||
          (isOffline && event.is_online_event)
        )
          return false;
      }
      if (filters.topics.length > 0 && !filters.topics.includes(event.topic_id))
        return false;
      return true;
    });

    setFilteredEvents(filtered);
  }, [filters, events]);

  // Handle filter changes
  const handleFilterChange = (
    key: keyof Filters,
    value: boolean | string[] | number[],
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
              <ListItem key={topic.id} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        const value = e.target.checked
                          ? [...filters.topics, topic.id]
                          : filters.topics.filter((tp) => tp !== topic.id);
                        handleFilterChange("topics", value);
                      }}
                    />
                  }
                  label={topic.name}
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
                    image={
                      event.image
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${event.image}`
                        : "https://placehold.co/140x140.png?text=No+Image"
                    }
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
                      {event.start_date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#000", mb: 1 }}>
                      {formatRupiah(event.price)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#999" }}>
                      {event.organizer_name}
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
