// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import NavBar from "./NavBar";
import { Userstate } from "../store/atoms/userState";
import { useSetRecoilState } from "recoil";
// import { isLoginSelector } from "../store/selectors/isLogin";
// import { useRecoilValue } from "recoil";
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const img = "https://i.postimg.cc/xjK9HVS5/19197351.jpg";
  const setUser = useSetRecoilState(Userstate);
  // const isLogin = useRecoilValue(isLoginSelector);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post(
        // "https://infinitytrade.onrender.com/auth/login",
        "https://infinitytrade.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.token);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser({
        email: email,
        isLogin: true,
      });
      navigate("/market-view");
    } catch (error) {
      alert("invalid");
      console.error("login error", error);
    }
  };
  return (
    <>
      <NavBar></NavBar>

      <div className="flex my-36 mx-6 justify-around flex-wrap">
        {/* <h1>{email}</h1>
      <h1>{password}</h1> */}
        <div className="w-1/2">
          <img src={img}></img>
        </div>
        <div>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Grid container justifyContent="flex-end"></Grid>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        New User? Sign up
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
