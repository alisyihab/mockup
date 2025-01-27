import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface AttendeeDetailsListProps {
  attendees: Attendee[];
  setAttendees: React.Dispatch<React.SetStateAction<Attendee[]>>;
}

const AttendeeDetailsList = ({ attendees, setAttendees }: AttendeeDetailsListProps) => {
  // State untuk menyimpan pesan error tiap field
  const [errors, setErrors] = useState<{ [key: number]: { [field: string]: string } }>({});

  // Fungsi untuk memvalidasi field peserta
  const validateField = (index: number, field: string, value: string): string => {
    let errorMessage = "";
    if (!value.trim()) {
      errorMessage = "Field ini wajib diisi.";
    } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = "Format email tidak valid.";
    }
    return errorMessage;
  };

  // Fungsi untuk memperbarui field peserta dan memvalidasi
  const handleAttendeeChange = (
    index: number,
    field: "first_name" | "last_name" | "email",
    value: string
  ) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index][field] = value;
    setAttendees(updatedAttendees);

    // Validasi field saat pengguna mengetik
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: {
        ...prevErrors[index],
        [field]: validateField(index, field, value),
      },
    }));
  };

  // Validasi saat field kehilangan fokus
  const handleBlur = (
    index: number,
    field: "first_name" | "last_name" | "email",
    value: string
  ) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: {
        ...prevErrors[index],
        [field]: validateField(index, field, value),
      },
    }));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Detail Peserta
      </Typography>
      {attendees.map((attendee, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
              Peserta {index + 1}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nama Depan"
                  fullWidth
                  size="small"
                  value={attendee.first_name}
                  onChange={(e) =>
                    handleAttendeeChange(index, "first_name", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur(index, "first_name", e.target.value)
                  }
                  error={!!errors[index]?.first_name}
                  helperText={errors[index]?.first_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nama Belakang"
                  fullWidth
                  size="small"
                  value={attendee.last_name}
                  onChange={(e) =>
                    handleAttendeeChange(index, "last_name", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur(index, "last_name", e.target.value)
                  }
                  error={!!errors[index]?.last_name}
                  helperText={errors[index]?.last_name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  size="small"
                  value={attendee.email}
                  onChange={(e) =>
                    handleAttendeeChange(index, "email", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur(index, "email", e.target.value)
                  }
                  error={!!errors[index]?.email}
                  helperText={errors[index]?.email}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AttendeeDetailsList;
