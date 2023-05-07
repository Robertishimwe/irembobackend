import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AppHeader from './AppHeader'
import Copyright from "./Copyright";
import api from "../utils/apiForm";


// multipart/form-data

const theme = createTheme();

export default function AddDocument() {

  const navigate = useNavigate();

  const documentOptions = [
    {
      value: 'NID',
      label: 'NID',
    },
    {
      value: 'PASSPORT',
      label: 'PASSPORT',
    }

  ]
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({images: data.get("images")})
    api
      .post(`/docs/add`, {
        images: data.get("images"),
        documentType: data.get("documentType"),
        documentNumber: data.get("documentNumber")
      })
      .then((res) => {
        console.log(res);
        
          toast.success("doc added successful. you are going to be redirected to home page", {
            position:'bottom-right',
            autoClose: 4000,
          })
          setTimeout(()=>{
            navigate('/')
  
          },4000)
        
      
      })
      .catch((err) => {
        console.log(err)
        toast.error((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message, {
          position:'bottom-right',
          autoClose: 5000,
        })
      
      })
  };

  return (<>
  <AppHeader/>
  
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
            Add Document
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
                  autoComplete="documentType"
                  select
                  name="documentType"
                  required
                  fullWidth
                  id="documentType"
                  label="Document Type"
                  autoFocus
                >

{documentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="Document number"
                  name="documentNumber"
                  required
                  fullWidth
                  id="documentNumber"
                  label="Document number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="images"
                  name="images"
                  autoComplete="images"
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
              Submit for review
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}
