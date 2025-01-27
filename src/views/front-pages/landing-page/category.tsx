"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import frontCommonStyles from "@views/front-pages/styles.module.css";
import styles from "./style/slider.module.css";
import httpClient from "@/utils/httpClient";

interface Category {
  name: string;
  image?: string;
}

interface ApiResponse {
  data: Category[];
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchCategories = async () => {
      try {
        const response = await httpClient.get<ApiResponse>("/get-format");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
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
                      background: `url(${
                        category.image ||
                        `https://placehold.co/200x200?text=${encodeURIComponent(category.name)}`
                      })`,
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
