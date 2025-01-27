"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { EventResponse } from "@/interfaces/EventResponse";
import httpClient from "@/utils/httpClient";
import formatRupiah from "@/utils/formatRupiah";

const PopularByCountry = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get("/top-event");
        setEvents(response.data || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  if (isLoading) {
    return (
      <div className={frontCommonStyles.layoutSpacing}>
        <Box sx={{ width: "100%", padding: "20px" }}>
          <Skeleton
            variant="rectangular"
            width={400}
            height={40}
            sx={{
              borderRadius: "8px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Grid container spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={140}
                    sx={{ width: "100%" }}
                  />
                  <Box sx={{ padding: 2 }}>
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="100%" />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }

  return (
    <section className="plb-[20px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        {/* Dropdown Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <h3 style={{ margin: 0 }}>Event Lainnya</h3>
          </div>
          <Link href="/explore" passHref>
            <span
              style={{
                color: "#6A5ACD",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Explore more events →
            </span>
          </Link>
        </div>

        {/* Event List */}
        <Grid container spacing={10}>
          {events.map((event) => (
            <Grid item xs={6} md={3} lg={3} key={event.id}>
              <Card
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={
                    event.image
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${event.image}`
                      : "https://placehold.co/140x140.png?text=No+Image"
                  }
                  alt={event.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: "8px" }}
                  >
                    {new Date(event.start_date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })} {" - "}
                    {new Date(event.end_date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography variant="h6">
                    {formatRupiah(event.price)}{" "}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {event.organizer_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default PopularByCountry;
