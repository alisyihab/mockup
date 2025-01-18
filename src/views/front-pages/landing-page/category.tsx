"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import styles from "./style/slider.module.css";

const categories = [
  {
    name: "Festival Fair Bazaar",
    image: "https://placehold.co/200x200?text=Festival&font=roboto",
  },
  {
    name: "Konser",
    image: "https://placehold.co/200x200?text=Konser&font=roboto",
  },
  {
    name: "Pertandingan",
    image: "https://placehold.co/200x200?text=Pertandingan&font=roboto",
  },
  {
    name: "Exhibition Expo Pameran",
    image: "https://placehold.co/200x200?text=Exhibition&font=roboto",
  },
  {
    name: "Konferensi",
    image: "https://placehold.co/200x200?text=Konferensi&font=roboto",
  },
  {
    name: "Workshop",
    image: "https://placehold.co/200x200?text=Workshop&font=roboto",
  },
  {
    name: "Pertunjukan",
    image: "https://placehold.co/200x200?text=Pertunjukan&font=roboto",
  },
  {
    name: "Atraksi dan Theme Park",
    image: "https://placehold.co/200x200?text=Theme+Park&font=roboto",
  },
];

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

  if (isLoading) {
    return (
      <>
        <div className={frontCommonStyles.layoutSpacing}>
          <Box sx={{ width: "100%", padding: "20px" }}>
            <Skeleton
              variant="rectangular"
              width={1200}
              height={80}
              sx={{
                borderRadius: "8px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
          </Box>
        </div>
      </>
    );
  }

  return (
    <section className="plb-[20px] bg-backgroundPaper">
      <div className={frontCommonStyles.layoutSpacing}>
        <Box sx={{ textAlign: "center", mt: "20px", mb: "20px" }}>
          {/* Swiper Carousel */}
          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: `.${styles.swiperButtonCategoryNext}`,
                prevEl: `.${styles.swiperButtonCategoryPrev}`,
              }}
              spaceBetween={20}
              slidesPerView={5}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={`cateory-${index}`}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      background: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {/* Overlay Text */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "11px",
                        textAlign: "center",
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "10px 0",
                      }}
                    >
                      {category.name}
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Navigation */}

            <div
              className={`${styles.swiperButtonCategoryPrev} ${styles.customNav}`}
            >
              <i
                className="ri-arrow-drop-left-line"
                style={{ fontSize: "1.8rem" }}
              />
            </div>
            <div
              className={`${styles.swiperButtonCategoryNext} ${styles.customNav}`}
            >
              <i
                className="ri-arrow-drop-right-line"
                style={{ fontSize: "1.8rem" }}
              />
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default CategoryList;
