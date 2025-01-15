import { Card, CardContent, Typography, Box } from "@mui/material";

interface VenueAndContactInfoProps {
  venue: string;
  address: string;
  city: string;
  contactEmail: string;
  contactPhone: string;
}

export default function VenueAndContactInfo({
  venue,
  address,
  city,
  contactEmail,
  contactPhone,
}: VenueAndContactInfoProps) {
  return (
    <>
      {/* Venue Details */}
      <Card sx={{ mb: 3, boxShadow: 1, borderRadius: 2, mt: 5 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Venue Details
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
            <i className="ri-building-4-line" style={{ marginRight: "20px" }} />
            <Box>
              <Typography>{venue}</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {address}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>{city}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Information
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
            <i className="ri-mail-fill" style={{ marginRight: "20px" }} />
            <Typography>{contactEmail}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
            <i className="ri-phone-fill" style={{ marginRight: "20px" }} />
            <Typography>{contactPhone}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
