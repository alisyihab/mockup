"use client";

import { useState } from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

interface EventDetailsProps {
  description: string;
  gallery: string[];
  terms: string;
  refundPolicy: string;
}

export default function EventDetails({
  description,
  gallery,
  terms,
  refundPolicy,
}: EventDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleImageClick = (index: number) => {
    if (!isOpen) {
      setPhotoIndex(index);
      setIsOpen(true);
    }
  };

  const handleCloseLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4">About This Event</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>

      <Box mb={4}>
        <Typography variant="h4">Gallery</Typography>
        <Grid container spacing={2}>
          {gallery.map((image, index) => (
            <Grid item xs={4} key={index}>
              <Card
                onClick={() => handleImageClick(index)}
                sx={{
                  cursor: "pointer",
                  overflow: "hidden",
                  height: "150px",
                }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4">Terms and Conditions</Typography>
          <Typography>{terms}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4">Refund Policy</Typography>
          <Typography>{refundPolicy}</Typography>
        </CardContent>
      </Card>

      {/* Lightbox */}
      {isOpen && gallery.length > 0 && (
        <Lightbox
          mainSrc={gallery[photoIndex]}
          nextSrc={gallery[(photoIndex + 1) % gallery.length]}
          prevSrc={gallery[(photoIndex + gallery.length - 1) % gallery.length]}
          onCloseRequest={handleCloseLightbox}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % gallery.length)
          }
        />
      )}
    </>
  );
}
