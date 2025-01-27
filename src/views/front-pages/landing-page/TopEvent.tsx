"use client";

import React, { useState, useRef, useEffect, use } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import frontCommonStyles from "@views/front-pages/styles.module.css";
import httpClient from "@/utils/httpClient";
import Link from "next/link";
import { EventResponse } from "@/interfaces/EventResponse";
import formatRupiah from "@/utils/formatRupiah";

const PopularEvents = () => {
  // Refs for navigation buttons
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
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
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        padding: "30px 20px",
        position: "relative",
      }}
    >
      <section className="plb-[20px]">
        <div className={frontCommonStyles.layoutSpacing}>
          {/* Header Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* Title with Dropdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <h3 style={{ margin: 0 }}>Top 8</h3>
            </div>

            {/* Slider Navigation */}
            {events.length == 0 ? (
              ""
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  ref={prevRef}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <i
                    className="ri-arrow-left-s-line"
                    style={{ color: "#000" }}
                  />
                </button>
                <button
                  ref={nextRef}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <i
                    className="ri-arrow-right-s-line"
                    style={{ color: "#000" }}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            // onBeforeInit={(swiper) => {
            //   swiper.params.navigation.prevEl = prevRef.current;
            //   swiper.params.navigation.nextEl = nextRef.current;
            // }}
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              600: { slidesPerView: 2, spaceBetween: 15 },
              960: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {/* Kondisi untuk menampilkan "Tidak ada data" jika filteredEvents kosong */}
            {events.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  textAlign: "center",
                  color: "#6a1b9a",
                }}
              >
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginBottom: "16px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9V7.5a2.25 2.25 0 014.5 0V9m-7.5 0h10.5M6.375 9l-.36 10.04a2.25 2.25 0 002.25 2.21h7.5a2.25 2.25 0 002.25-2.21L17.625 9m-9.75 0h9.75"
                  />
                </svg>
                {/* Teks "Tidak ada data" */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tidak ada data yang tersedia
                </Typography>
              </div>
            ) : (
              events.map((event, index) => (
                <SwiperSlide
                  key={`top-${event?.id}`}
                  style={{ paddingBottom: 10 }}
                >
                  <Link href={event.link} passHref legacyBehavior>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={`top-${event?.id}`}
                      sx={{ position: "relative", cursor: "pointer" }}
                    >
                      {/* Large Number (Behind the Card) */}
                      <Typography
                        variant="h3"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "-10px",
                          transform: "translateY(-50%)",
                          fontWeight: "bold",
                          fontSize: "5rem",
                          color: "#6a1b9a",
                          zIndex: 1,
                          opacity: 0.5,
                        }}
                      >
                        {index + 1}
                      </Typography>

                      {/* Card */}
                      <Card
                        sx={{
                          width: "80%",
                          margin: "0 auto",
                          borderRadius: "15px",
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                          zIndex: 2,
                          position: "relative",
                          "&:hover": {
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                      >
                        {/* Event Image */}
                        <CardMedia
                          component="img"
                          height="150"
                          image={
                            event.image
                              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${event.image}`
                              : "https://placehold.co/140x140.png?text=No+Image"
                          }
                          alt={event.title}
                        />
                        {/* Event Details */}
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(event.start_date).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}{" "}
                            · {event.city} · {event.region}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1, color: "#333", mt: 2 }}
                          >
                            {formatRupiah(event?.price)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </section>
    </Box>
  );
};

export default PopularEvents;
