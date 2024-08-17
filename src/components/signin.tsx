import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Cookies from 'js-cookie';
const defaultTheme = createTheme();
function SignIn({ setIsAuthenticated, }: any) {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPass, setInputPass] = useState<string>('');
  const [tickBox, setTickBox] = useState<boolean>(false);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInOnAction();
  };

  // // HOME VALIDATION
  
  // const cookieToken = Cookies.get('token');
    
  //   const verifyToken = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/auth/verifytoken", {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           token: cookieToken,
  //         })
  //       });

  //       if (response.ok) {
  //         setIsAuthenticated(true);
  //         navigate("/home")
  //         return;
  //       } else {
  //         console.log("Not Valid");
  //       }
  //     } catch (error) {
  //       console.error("Error verifying token:", error);
  //     }
  //   }

  //   verifyToken();

  //   // CLOSE HOME VALIDATION

  async function signInOnAction() {
    try {
      const response = await fetch("http://localhost:5000/sign-in", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPass
        })
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      const { isUsers, token } = data;
      console.log("Is User " + isUsers);

      if (isUsers) {
        Cookies.set('token', token, { expires: 7, secure: true });
        console.log(" Get Cookies Token  " + Cookies.get('token'))
        setIsAuthenticated(true);
        navigate('/home');
      }

    } catch (error) {
      console.error('Error during sign-in:', error);
    } finally {
      setInputEmail("");
      setInputPass("");
      setTickBox(false);
    }
  }

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={tickBox}
                  onChange={(e) => setTickBox(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
