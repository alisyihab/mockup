"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import styles from "./style/slider.module.css";

SwiperCore.use([Navigation, Pagination]);

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
          {/* Tabs Skeleton */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={60}
                height={40}
                sx={{ borderRadius: "8px" }}
              />
            ))}
          </Box>

          {/* Cards Skeleton */}
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
                  {/* Image Skeleton */}
                  <Skeleton
                    variant="rectangular"
                    height={140}
                    sx={{ width: "100%" }}
                  />
                  <Box sx={{ padding: 2 }}>
                    {/* Date Skeleton */}
                    <Skeleton variant="text" width="40%" />
                    {/* Title Skeleton */}
                    <Skeleton variant="text" width="80%" />
                    {/* Description Skeleton */}
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

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: any) => {
    setCategory(newValue);
  };

  const formatDate = (date: string | number): string => {
    const dateString = typeof date === "string" ? date : date.toString();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [day, month, year] = dateString.split("-");
    const formattedMonth = months[parseInt(month, 10) - 1];
    return `${parseInt(day, 10)} ${formattedMonth} ${year}`;
  };

  const filteredEvents = allEvents.filter((event) => {
    if (category !== "All" && event.category !== category) return false;

    const eventDate = new Date(event.date);
    const now = new Date();

    if (subFilter === "new" && eventDate < now) return false;
    if (subFilter === "past" && eventDate >= now) return false;

    return true;
  });

  const uniqueCategories = [
    "All",
    ...new Set(allEvents.map((event) => event.category)),
  ];

  return (
    <section id="upcomingEvent" className="plb-[20px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: '20px' }}>
          Upcoming Event
        </Typography>
        <Box>
          {/* Tabs for Categories */}
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            sx={{
              mb: 4,
              borderBlockEnd: "none",
              "& .MuiTabs-flexContainer": {
                justifyContent: "left",
                gap: 2,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize:'12px',
                minWidth: "unset",
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
              "& .Mui-selected": {
                backgroundColor: "#be7a95",
                color: "#fff !important",
              },
            }}
          >
            {uniqueCategories.map((cat, i) => (
              <Tab key={i} label={cat} value={cat} />
            ))}
          </Tabs>

          {/* Event Slider */}
          <div className={styles.swiperContainer}>
            <Swiper
              slidesPerView={4} // Default untuk desktop
              spaceBetween={20}
              navigation={{
                nextEl: `.${styles.swiperButtonNext}`,
                prevEl: `.${styles.swiperButtonPrev}`,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                960: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {filteredEvents.map((event) => (
                <SwiperSlide key={`event-${event.id}`}>
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
                          sx={{ color: "#7C4DFF", fontWeight: "bold", mb: 4 }}
                        >
                          {formatDate(event.date)}
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
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            {filteredEvents.length > 4 ? (
              <>
                <div
                  className={`${styles.swiperButtonPrev} ${styles.customNav}`}
                >
                  <i
                    className="ri-arrow-drop-left-line"
                    style={{ fontSize: "1.8rem" }}
                  />
                </div>
                <div
                  className={`${styles.swiperButtonNext} ${styles.customNav}`}
                >
                  <i
                    className="ri-arrow-drop-right-line"
                    style={{ fontSize: "1.8rem" }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </Box>
      </div>
    </section>
  );
};

export default UpcomingEvents;
