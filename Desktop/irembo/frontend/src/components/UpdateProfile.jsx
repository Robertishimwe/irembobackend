import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import Copyright from "../components/Copyright";

import { useSelector } from "react-redux";
import { thisUser } from "../redux/features/auth/loginSlice";

import api from "../utils/apiForm";

const theme = createTheme();

export default function UpdateProfile() {
  const navigate = useNavigate();
  const authenticated = useSelector(thisUser);
  const { email, firstName, lastName, gender,maritalStatus, nationality } = authenticated.user.payload;

  const genderOptions = [
    {
      value: "MALE",
      label: "MALE",
    },
    {
      value: "FEMALE",
      label: "FEMALE",
    },
  ];

  const maritalStatusOptions = [
    {
      value: "SINGLE",
      label: "SINGLE",
    },

    {
      value: "MARRIED",
      label: "MARRIED",
    },
    {
      value: "DIVORCED",
      label: "DIVORCED",
    },
    {
      value: "WIDOWED",
      label: "WIDOWED",
    },
  ];

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .patch(`/user/update`, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dateOfBirth: data.get("dob"),
        nationality: data.get("nationality"),
        maritalStatus: data.get("maritalStatus"),
        images: data.get("profilePicture"),
      })
      .then((res) => {
        console.log(res);
        console.log(res);

        toast.success(
          "account created successful. you are going to be redirected to login page",
          {
            position: "bottom-right",
            autoClose: 4000,
          }
        );
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data.error
            ? err?.response?.data.error
            : err?.response?.data.Message,
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
      });
  };

  return (
    <>
      <AppHeader />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    disabled
                    value={firstName}
                    fullWidth
                    id="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled
                    value={lastName}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                      <DateField
                        label="Date of Birth"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        fullWidth
                        sx={{ top: -8 }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="gender"
                    select
                    defaultValue={gender}
                    disabled
                    name="gender"
                    required
                    fullWidth
                    id="gender"
                    value={gender}
                    autoFocus
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    id="email"
                    value={email}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={nationality}
                    id="nationality"
                    label="Nationality"
                    name="nationality"
                    autoComplete="nationality"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="maritalStatus"
                    select
                    name="maritalStatus"
                    defaultValue={maritalStatus}
                    fullWidth
                    id="maritalStatus"
                    label="Marital Status"
                    autoFocus
                  >
                    {maritalStatusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="profilePicture"
                    name="profilePicture"
                    autoComplete="profilePicture"
                    type="file"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
