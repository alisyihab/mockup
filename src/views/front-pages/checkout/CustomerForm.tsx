import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

interface CustomerDetailsFormProps {
  orderName: {
    first_name: string;
    last_name: string;
    email: string;
  };
  setOrderName: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
    }>
  >;
  attendees: Attendee[];
  setAttendees: React.Dispatch<React.SetStateAction<Attendee[]>>;
}

const CustomerDetailsForm = ({
  orderName,
  setOrderName,
  attendees,
  setAttendees,
}: CustomerDetailsFormProps) => {
  const copyOrderDetailsToAttendees = () => {
    if (attendees.length > 0) {
      const updatedAttendees = attendees.map((attendee) => ({
        ...attendee,
        first_name: orderName.first_name,
        last_name: orderName.last_name,
        email: orderName.email,
      }));
      setAttendees(updatedAttendees);
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (field: string, value: string) => {
    setOrderName((prevOrderName) => ({
      ...prevOrderName,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detail Pemesan
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Nama Depan"
              variant="outlined"
              value={orderName.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Nama Belakang"
              variant="outlined"
              value={orderName.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              variant="outlined"
              value={orderName.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            cursor: "pointer",
          }}
          onClick={copyOrderDetailsToAttendees}
        >
          <ContentCopy
            sx={{ fontSize: "20px", color: "purple", marginRight: "0.5rem" }}
          />
          <Typography
            variant="body2"
            sx={{ color: "purple", cursor: "pointer" }}
          >
            Salin detail ke semua peserta
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsForm;
