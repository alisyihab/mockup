// React Imports
import { useState } from "react";

// MUI Imports
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Rating from "@mui/material/Rating";

// Third-party Imports
import type { TrackDetails } from "keen-slider/react";
import { useKeenSlider } from "keen-slider/react";
import classnames from "classnames";

// Styled Component Imports
import AppKeenSlider from "@/libs/styles/AppKeenSlider";

// SVG Imports
import Lines from "@assets/svg/front-pages/landing-page/Lines";
import Levis from "@assets/svg/front-pages/landing-page/Levis";
import Continental from "@assets/svg/front-pages/landing-page/Continental";
import Eckerd from "@assets/svg/front-pages/landing-page/Eckerd";
import Dribbble from "@assets/svg/front-pages/landing-page/Dribbble";
import Airbnb from "@assets/svg/front-pages/landing-page/Airbnb";

// Styles Imports
import frontCommonStyles from "@views/front-pages/styles.module.css";

// Data
const data = [
  {
    svg: <Eckerd color="#2882C3" />,
    name: "Eugenia Moore",
    position: "Founder of Hubspot",
    followers: 14274,
  },
  {
    svg: <Levis color="#A8112E" />,
    name: "Tommy haffman",
    position: "Founder of Levis",
    followers: 1984,
  },
  {
    svg: <Airbnb color="#FF5A60" />,
    name: "Eugenia Moore",
    position: "CTO of Airbnb",
    followers: 18886,
  },
  {
    svg: <Continental color="#F39409" />,
    name: "Sara Smith",
    position: "Founder of Continental",
    followers: 530,
  },
  {
    svg: <Dribbble color="#ea4c89" />,
    name: "Tommy haffman",
    position: "Founder of Hubspot",
    followers: 2085,
  },
  {
    svg: <Eckerd color="#2882C3" />,
    name: "Eugenia Moore",
    position: "Founder of Hubspot",
    followers: 14274,
  },
  {
    svg: <Levis color="#A8112E" />,
    name: "Tommy haffman",
    position: "Founder of Levis",
    followers: 1984,
  },
  {
    svg: <Airbnb color="#FF5A60" />,
    name: "Eugenia Moore",
    position: "CTO of Airbnb",
    followers: 18886,
  },
  {
    svg: <Continental color="#F39409" />,
    name: "Sara Smith",
    position: "Founder of Continental",
    followers: 530,
  },
  {
    svg: <Dribbble color="#ea4c89" />,
    name: "Tommy haffman",
    position: "Founder of Levis",
    followers: 2085,
  },
];

const CustomerReviews = () => {
  // States
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [details, setDetails] = useState<TrackDetails>();

  // Hooks
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
      created: () => setLoaded(true),
      detailsChanged: (s) => setDetails(s.track.details),
      slides: {
        perView: 4,
        origin: "center",
      },
      breakpoints: {
        "(max-width: 1200px)": {
          slides: {
            perView: 3,
            spacing: 26,
            origin: "center",
          },
        },
        "(max-width: 900px)": {
          slides: {
            perView: 2,
            spacing: 26,
            origin: "center",
          },
        },
        "(max-width: 600px)": {
          slides: {
            perView: 1,
            spacing: 26,
            origin: "center",
          },
        },
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        const mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }

        slider.on("created", nextTimeout);
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  const scaleStyle = (idx: number) => {
    if (!details) return {};
    const activeSlideIndex = details.rel;

    return {
      transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
      ...(activeSlideIndex === idx
        ? { transform: "scale(1)", opacity: 1 }
        : { transform: "scale(0.9)", opacity: 0.5 }),
    };
  };

  return (
    <section className="plb-[20px] gap-16">
      <div className={frontCommonStyles.layoutSpacing}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Featured Organizer
        </Typography>
        <AppKeenSlider>
          <>
            <div ref={sliderRef} className="keen-slider mbe-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex p-6 sm:p-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Card
                    elevation={8}
                    className="flex items-center"
                    style={{
                      width: "200px", // Ukuran kartu
                      height: "auto", // Biarkan tinggi menyesuaikan
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent className="p-8 items-center">
                      <div className="flex flex-col gap-4 items-center text-center">
                        {item.svg}
                        <Typography
                          color="text.primary"
                          variant="body1"
                          className="font-medium"
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                          style={{ marginBottom: "8px" }}
                        >
                          {item.followers} followers
                        </Typography>
                        <button
                          style={{
                            backgroundColor: "#6200ea", // Warna tombol
                            color: "#fff",
                            border: "none",
                            borderRadius: "20px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          Follow
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {loaded && instanceRef.current && (
                <div
                  className="swiper-dots"
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {[
                    ...Array(
                      instanceRef.current.track.details.slides.length,
                    ).keys(),
                  ].map((idx) => (
                    <Badge
                      key={idx}
                      variant="dot"
                      component="div"
                      className={classnames({ active: currentSlide === idx })}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor:
                          currentSlide === idx ? "#1976d2" : "#ccc",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        </AppKeenSlider>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 mli-3"
        style={{ marginTop: "50px", marginBottom: "30px" }}
      >
        <Levis color="var(--mui-palette-text-secondary)" />
        <Continental color="var(--mui-palette-text-secondary)" />
        <Airbnb color="var(--mui-palette-text-secondary)" />
        <Eckerd color="var(--mui-palette-text-secondary)" />
        <Dribbble color="var(--mui-palette-text-secondary)" />
      </div>
    </section>
  );
};

export default CustomerReviews;
