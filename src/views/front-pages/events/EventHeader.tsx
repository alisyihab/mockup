"use client";

import { Box, Typography } from "@mui/material";
import frontCommonStyles from "@views/front-pages/styles.module.css";

interface EventHeaderProps {
  title: string;
  date: string;
  location: string;
  time: string;
  backgroundImage: string;
}

export default function EventHeader({
  title,
  date,
  location,
  time,
  backgroundImage,
}: EventHeaderProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "65vh",
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        color: "#fff",
        mb: 4,
      }}
    >
      {/* Overlay gelap untuk meningkatkan kontras teks */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparansi overlay
          zIndex: 1,
        }}
      />

      {/* Konten */}
      <div
        className={frontCommonStyles.layoutSpacing}
        style={{
          position: "relative",
          height: "95%",
          display: "flex",
          alignItems: "flex-end",
          zIndex: 2,
        }}
      >
        <Box sx={{ mb: 3 }}>
          {/* Kategori */}
          <Typography
            sx={{
              backgroundColor: "#BF7A96",
              color: "#fff",
              display: "inline-block",
              px: 2,
              py: 0.5,
              borderRadius: "12px",
              fontSize: "0.6rem",
              padding: '10px',
              textTransform: "uppercase",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Concerts
          </Typography>

          {/* Judul */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.7)",
            }}
          >
            {title}
          </Typography>

          {/* Informasi tambahan */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              color: "#fff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", color: "#fff" }}
              >
                <i className="ri-calendar-event-line"></i> {date}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", color: "#fff" }}
              >
                <i className="ri-time-fill"></i> {time}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", color: "#fff" }}
              >
                <i className="ri-road-map-line"></i> {location}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
