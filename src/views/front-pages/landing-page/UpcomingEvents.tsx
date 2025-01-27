"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Grid,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import httpClient from "@/utils/httpClient";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import styles from "./style/slider.module.css";
import formatRupiah from "@/utils/formatRupiah";

SwiperCore.use([Navigation, Pagination]);

interface Event {
  id: number;
  title: string;
  description: string;
  end_date: string;
  start_date: string;
  image: string;
  link: string;
  organizer_name: string;
  price: number;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await httpClient.get("/events-upcoming");
        setEvents(response.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
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

  if (events.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          style={{ width: 80, height: 80, color: "#ccc" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5M14.25 9.75l-4.5 4.5"
          />
        </svg>
        <Typography variant="h6" sx={{ color: "#aaa", marginTop: 2 }}>
          No Events Available
        </Typography>
      </Box>
    );
  }

  return (
    <section id="upcomingEvent" className="plb-[40px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Upcoming Events
        </Typography>
        <div className={styles.swiperContainer}>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              600: { slidesPerView: 2, spaceBetween: 15 },
              960: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {events.slice(0, 7).map((event) => (
              <SwiperSlide
                key={`event-${event.id}`}
                style={{ paddingBottom: "20px" }}
              >
                <Link href={event.link} passHref legacyBehavior>
                  <Card
                    sx={{
                      flex: 1,
                      borderRadius: "15px",
                      overflow: "hidden",
                      paddingBottom: "20px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      "&:hover": {
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                      },
                      cursor: "pointer",
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
                      alt={event.title || "Placeholder Image"}
                      sx={{
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />

                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", mb: 4 }}
                      >
                        {new Date(event.start_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}{" "}
                        {" - "}
                        {new Date(event.end_date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                      >
                        {formatRupiah(event?.price)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "0.8rem", color: "grey" }}
                      >
                        {event.organizer_name}
                      </Typography>
                    </CardActions>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
