import { Card, CardContent, Grid, Typography } from "@mui/material";

const OrderDetailsCard = ({ event }: { event: Event | null }) => {
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Invalid date";
    const isoFormattedDate = dateString.replace(" ", "T");
    const date = new Date(isoFormattedDate);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={event?.images[0]?.url}
              alt={event?.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
              {event?.title}
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {formatDate(event?.start_date)} - {formatDate(event?.end_date)}
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {event?.settings.location_details?.venue_name ?? 'no vanue'},{" "}
              {event?.settings.location_details?.city ?? 'no location' }
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsCard;
