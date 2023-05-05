import {Fragment, useEffect, useState} from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  CssBaseline,
  Dialog,
  IconButton
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {signIn, signUp} from "../store/slices/index.js";
import {Close} from "@mui/icons-material";
import toast from "react-hot-toast";

const authErrorTexts = {
  'auth/invalid-email': 'Неккоретный email',
  'auth/user-not-found': 'Пользователь не найден',
  'auth/wrong-password': 'Неправильный пароль'
};

const formData = [
  {
    type: 'text',
    name: 'firstName',
    label: 'Ваше имя',
    required: true
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Ваша фамилия',
    required: true
  },
  {
    type: 'email',
    name: 'email',
    label: 'Ваше email',
    required: true,
    isSignIn: true
  },
  {
    type: 'text',
    name: 'password',
    label: 'Ваш пароль',
    required: true,
    isSignIn: true
  }
];

export const Authorization = ({onClose, open}) => {
  const dispatch = useDispatch()
  const msg = useSelector(state => state.main.errorMsg)

  const [isSignIn, setIsSignIn] = useState(true)

  const handleSignIn = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const userData = Object.fromEntries([...data.entries()])

    await dispatch(signIn(userData)).unwrap()
    toast.success('Успех')
    onClose()
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const userData = Object.fromEntries([...data.entries()])
    await dispatch(signUp(userData))
    toast.success('Успех')
    onClose()
  };

  const toggleIsSignIn = () => {
    setIsSignIn(prev => !prev);
  };

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{sx: {width: 1000, minWidth: 1000, position: "relative"}}}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 15,
          right: 15
        }}
      >
        <Close/>
      </IconButton>
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              {!isSignIn ? 'Зарегистрироваться' : 'Войти'}
            </Typography>
            <Box
              component="form"
              onSubmit={isSignIn ? handleSignIn : handleSignUp}
              sx={{mt: 1}}
            >
              {formData.map(each => (
                <Fragment key={each.name}>
                  {(isSignIn && !each.isSignIn) || (
                    <TextField
                      margin="normal"
                      required={each.required}
                      fullWidth
                      id={each.name}
                      label={each.label}
                      name={each.name}
                      autoComplete={each.name}
                    />
                  )}
                </Fragment>
              ))}
              <Typography color="red" textAlign="center">
                {authErrorTexts[msg] && authErrorTexts[msg]}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                {!isSignIn
                  ? 'Зарегистрироваться'
                  : 'Войти'
                }
              </Button>
              <Grid container>
                <Link onClick={toggleIsSignIn} variant="body2">
                  {isSignIn ? 'Нет аккаунта? Создать аккаунт' : 'Есть аккунт? Войти'}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};
