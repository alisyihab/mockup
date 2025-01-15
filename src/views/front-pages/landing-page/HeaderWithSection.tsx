import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { useState } from "react";
import NavCustom from "./NavCustom";

const HeaderWithHeroSection = () => {
  const slides = [
    {
      id: 1,
      title: "SBS MTV The Kpop Show Ticket Package",
      description:
        "Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording!",
      link: "/events/healthtech-innovation-summit",
      image: "/images/front/2.jpg",
    },
    {
      id: 2,
      title: "Jazz Concert Experience",
      description:
        "Enjoy a world-class jazz concert featuring top artists in the industry!",
      link: "/events/healthtech-innovation-summit",
      image: "/images/front/3.jpg",
    },
    {
      id: 3,
      title: "Rock Night Festival",
      description:
        "Get ready to rock! Experience an unforgettable night of live music and energy.",
      link: "/events/healthtech-innovation-summit",
      image: "/images/front/1.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(slides[0]);

  return (
    <Box sx={{ position: "relative", height: "60vh", overflow: "visible" }}>
      {/* Navbar */}
      {/* <NavCustom /> */}

      {/* Hero Section */}
      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        onSlideChange={(swiper) => setCurrentSlide(slides[swiper.activeIndex])}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                height: "60vh",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              />
              {/* Content */}
              <Box
                sx={{
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
        {/* Custom Navigation Buttons */}
        <div
          className="custom-prev"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            color: "#BF7A96",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          <i
            className="ri-arrow-drop-left-line"
            style={{ fontSize: "5rem" }}
          ></i>
        </div>
        <div
          className="custom-next"
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            color: "#BF7A96",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          <i
            className="ri-arrow-drop-right-line"
            style={{ fontSize: "5rem" }}
          ></i>
        </div>
      </Swiper>

      {/* Search Box */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-75px", // Atur posisi agar berada di bagian bawah hero section
          left: "50%",
          transform: "translateX(-50%) !important",
          width: "90%",
          maxWidth: "1200px",
          padding: 10,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          zIndex: 10,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Event"
              variant="outlined"
              defaultValue="Konser Jazz"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Place"
              variant="outlined"
              select
              defaultValue="Indonesia"
            >
              <MenuItem value="Indonesia">Indonesia</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Korea">Korea</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Time"
              variant="outlined"
              select
              defaultValue="Any date"
            >
              <MenuItem value="Any date">Any date</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Tomorrow">Tomorrow</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeaderWithHeroSection;
