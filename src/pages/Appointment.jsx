import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DrRichard from "../assets/DrRichard.png";
import Dr2 from "../assets/Dr2.png";
import Dr3 from "../assets/Dr3.png";
import Dr4 from "../assets/Dr4.png";
import Dr5 from "../assets/Dr5.png";


const doctorProfile = {
  name: "Dr. Richard James",
  title: "MBBS - General Physician",
  experience: "2 Years",
  about:
    "Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
  fee: "$50",
};

const dateSlots = [
  { day: "MON", date: 10, active: true },
  { day: "TUE", date: 11 },
  { day: "WED", date: 12 },
  { day: "THU", date: 13 },
  { day: "FRI", date: 14 },
  { day: "SAT", date: 15 },
  { day: "SUN", date: 16 },
];

const timeSlots = [
  { label: "8.00 am" },
  { label: "8.30 am" },
  { label: "9.00 am", active: true },
  { label: "9.30 am" },
  { label: "10.00 am" },
  { label: "10.30 am" },
  { label: "11.00 am" },
  { label: "11.30 am" },
];

const relatedDoctors = [
  { id: 5, name: "Dr. Richard Jame", specialty: "Dermatologist", status: "Available", image: DrRichard },
  { id: 1, name: "Dr. Sarah Ahmed", specialty: "General physician", status: "Available", image: Dr2 },
  { id: 2, name: "Dr. Karim Ahmad", specialty: "Cardiologist", status: "Available", image: Dr3 },
  { id: 3, name: "Dr. Maya Ahmed", specialty: "Pediatrician", status: "Available", image: Dr4 },
  { id: 4, name: "Dr. Omar Kareem", specialty: "Dentist", status: "Available", image: Dr5 },
];

function Appointment() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Stack spacing={6}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
            <Card
              sx={{
                borderRadius: 6,
                overflow: "hidden",
                minHeight: 420,
                width: "100%",
                maxWidth: 340,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#5f6fff",
              }}
            >
              <Box sx={{ width: "100%", p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CardMedia
                  component="img"
                  image={DrRichard}
                  alt="Doctor"
                  sx={{
                    maxHeight: 360,
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "top center",
                    display: "block",
                    borderRadius: 4,
                  }}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={7} sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 6,
                border: 1,
                borderColor: "divider",
                p: { xs: 3, sm: 4 },
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 420,
                width: "100%",
                maxWidth: 820,
              }}
            >
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: -0.5, fontSize: { xs: 24, sm: 28 } }}>
                      {doctorProfile.name}
                    </Typography>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: "primary.main", borderRadius: 2, px: 1.5, py: 0.5, fontWeight: 700 }}>
                      <CheckCircleIcon sx={{ width: 18, height: 18,borderRadius: "50%",bgcolor: "common.white", }} />
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: 15 }}>
                      {doctorProfile.title}
                    </Typography>
                    <Chip
                      label={doctorProfile.experience}
                      variant="outlined"
                      sx={{ borderRadius: 5, px: 1.75, height: 34, borderColor: "divider", color: "text.primary", fontSize: 13 }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 13 }}>
                      About
                    </Typography>
                    <Chip label="i" size="small" sx={{bgcolor:"white",color: "black", fontSize: 11,border:"solid 1px black" }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: 14 }}>
                    {doctorProfile.about}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 14 }}>
                  Appointment fee: <Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold", fontSize: 15 }}>
                    {doctorProfile.fee}
                  </Typography>
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={0} sx={{ borderRadius: 6, p: { xs: 3, sm: 5 }, marginLeft: { xs: 0, md: 8 } }}>
          <Stack spacing={4}>
            <Typography variant="h6" sx={{ fontWeight: 500 , fontSize: "1rem",letterSpacing: "0.5px", color: "#565656"}}>
              Booking slots
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {dateSlots.map((slot) => (
                <Button
                  key={slot.date}
                  variant={slot.active ? "contained" : "outlined"}
                  sx={{
                    minWidth: 104,
                    borderRadius: 17,
                    py: 6,
                    px: 0,
                    flexDirection: "column",
                    fontSize: 14,
                    borderColor: slot.active ? "primary.main" : "divider",
                    bgcolor: slot.active ? "primary.main" : "background.paper",
                    color: slot.active ? "common.white" : "text.primary",
                    boxShadow: slot.active ? "0 18px 45px -20px rgba(95,111,255,0.8)" : "none",
                    textTransform: "none",
                    borderWidth: slot.active ? 0 : 2,
                  }}
                >
                  <Typography variant="caption" sx={{ mb: 0.5 ,fontSize: 16,fontWeight: 400, textTransform: "uppercase"}}>
                    {slot.day}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 16 }}>
                    {slot.date}
                  </Typography>
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {timeSlots.map((slot) => (
                <Button
                  key={slot.label}
                  variant={slot.active ? "contained" : "outlined"}
                  sx={{
                    minWidth: 104,
                    borderRadius: 10,
                    py: 1.5,
                    px: 2.5,
                    textTransform: "none",
                    borderColor: slot.active ? "primary.main" : "divider",
                    bgcolor: slot.active ? "primary.main" : "background.paper",
                    color: slot.active ? "common.white" : "text.secondary",
                    borderWidth: slot.active ? 0 : 2,
                  }}
                >
                  {slot.label}
                </Button>
              ))}
            </Box>
            <Button variant="contained" size="large" sx={{ borderRadius: 10, alignSelf: "flex-start", px: 6, py: 1.6, fontSize: 14 }}>
              Book an appointment
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={0} sx={{ borderRadius: 6, p: { xs: 3, sm: 5 }, bgcolor: "background.paper" }}>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 700, width: "100%" ,color:"#1F2937"}}>
              Related Doctors
            </Typography>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Typography
                variant="body2"
                align="left"
                color="text.secondary"
                sx={{ maxWidth: 420, width: "100%", whiteSpace: "nowrap",color:"#4B5563" }}
              >
                Simply browse through our extensive list of trusted doctors.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, minmax(0, 1fr))",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(220px, 1fr))",
                },
              }}
            >
              {relatedDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  sx={{
                    borderRadius: 5,
                    border: 1,
                    borderColor: "divider",
                    boxShadow: "none",
                    bgcolor: "common.white",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220, bgcolor: "#EAEFFF" }}>
                    <CardMedia
                      component="img"
                      image={doctor.image}
                      alt={doctor.name}
                      sx={{
                        maxHeight: 180,
                        width: "auto",
                        objectFit: "contain",
                        objectPosition: "top",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Box sx={{ bgcolor: "common.white", p: 3, pt: 2, borderTop: 1, borderColor: "divider" }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main" }} />
                          <Typography variant="body2" color="success.main" sx={{ fontWeight: 700 }}>
                            {doctor.status}
                          </Typography>
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>
                          {doctor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
                          {doctor.specialty}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default Appointment;
