import { Typography, Button, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { useState } from "react";
import styles from "./style/slider.module.css";

const HeaderWithHeroSection = () => {
  const slides = [
    {
      id: 1,
      title: "Rock On Stage",
      description:
        "Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording!",
      link: "/events/healthtech-innovation-summit",
      image: "/videos/hero.mp4",
      date: "20-08-2024",
      type: "Concert",
      category: "Rock",
      isVideo: true,
    },
    {
      id: 2,
      title: "SBS MTV The Kpop Show Ticket Package",
      description:
        "Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording!",
      link: "/events/healthtech-innovation-summit",
      image: "/images/front/2.jpg",
      date: "20-08-2024",
      type: "Concert",
      category: "Rock",
      isVideo: false,
    },
    {
      id: 3,
      title: "Jazz Concert Experience",
      description:
        "Enjoy a world-class jazz concert featuring top artists in the industry!",
      link: "/events/healthtech-innovation-summit",
      image: "/images/front/3.jpg",
      isVideo: false,
    },
    {
      id: 4,
      title: "Rock Night Festival",
      description:
        "Get ready to rock! Experience an unforgettable night of live music and energy.",
      link: "/events/healthtech-innovation-summit",
      image: "/images/front/1.jpg",
      isVideo: false,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(slides[0]);

  return (
    <Box sx={{ position: "relative", height: "65vh" }}>
      <div className={styles.swiperContainer}>
        <Swiper
          navigation={{
            nextEl: `.${styles.swiperButtonNextHero}`,
            prevEl: `.${styles.swiperButtonPrevHero}`,
          }}
          modules={[Navigation, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  position: "relative",
                  height: "65vh",
                  overflow: "hidden",
                }}
              >
                {slide.isVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source src={slide.image} type="video/mp4" />
                  </video>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    textAlign: "center",
                    color: "#fff",
                    maxWidth: "600px",
                    padding: "20px",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      color: "#fff",
                      textShadow: "0px 2px 5px rgba(0,0,0,0.7)",
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "#fff",
                      textShadow: "0px 2px 5px rgba(0,0,0,0.7)",
                    }}
                  >
                    {slide.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mr: 2, px: 4 }}
                    href={slide.link}
                  >
                    Get Ticket
                  </Button>
                  <Button variant="outlined" sx={{ px: 4 }} href={slide.link}>
                    Learn More
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className={`${styles.swiperButtonPrevHero} ${styles.customNav}`}>
          <i
            className="ri-arrow-drop-left-line"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </div>
        <div className={`${styles.swiperButtonNextHero} ${styles.customNav}`}>
          <i
            className="ri-arrow-drop-right-line"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </div>
      </div>
    </Box>
  );
};

export default HeaderWithHeroSection;
