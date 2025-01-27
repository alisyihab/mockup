import { Typography, Button, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";
import styles from "./style/slider.module.css";
import httpClient from "@/utils/httpClient";

interface Slide {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  isVideo: boolean;
}

const HeaderWithHeroSection = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await httpClient.get<Slide[]>("/slides");
        const slidesWithFallback = response.data;
        setSlides(slidesWithFallback);
        setCurrentSlide(slidesWithFallback[0] || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching slides:", error);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const duplicatedSlides =
    slides.length < 3 ? [...slides, ...slides, ...slides] : slides;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (slides.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
        }}
      >
        <Typography variant="h6">No slides available</Typography>
      </Box>
    );
  }

  const truncateText = (text: any, maxLength: any) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Box sx={{ position: "relative", height: "65vh" }}>
      <div className={styles.swiperContainer}>
        <Swiper
          onSlideChange={(swiper) => setCurrentSlide(slides[swiper.realIndex])}
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
          {duplicatedSlides.map((slide, index) => (
            <SwiperSlide key={`slide-${index}`}>
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
                      backgroundImage: `url(${
                        slide.image
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${slide.image}`
                          : `https://placehold.co/600x400?text=${slide.title}`
                      })`,
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
                    dangerouslySetInnerHTML={{
                      __html: truncateText(slide.description, 200),
                    }}
                  />
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
