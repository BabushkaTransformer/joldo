import {Alert, Box, Button} from "@mui/material";
import {logOut, removeCurrentPosition} from "../store/slices/index.js";
import {useDispatch, useSelector} from "react-redux";
import logo from '../assets/logo.png';

export const Menu = ({setMode, mode, setOpen}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.main.user)

  const onClickMenu = (value) => () => {
    dispatch(removeCurrentPosition())
    setMode(value)
  }

  return (
    <Box
      sx={{
        padding: '10px 20px',
        display: 'flex',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white',
      }}
    >
      <img style={{width: 35, height: 35}} src={logo} alt=''/>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Button size="small" variant="contained" onClick={onClickMenu('complaint')}>
          Оставить жалобу
        </Button>

        {user && (
          <Button size="small" variant="contained" onClick={onClickMenu('admin')}>
            Оставить напоминание?
          </Button>
        )}

        <Button size="small" variant="contained" onClick={() => setOpen('complaint-list')}>
          Список жалоб
        </Button>

        <Button size="small" variant="contained" onClick={() => setOpen('prompt-list')}>
          Список проблем
        </Button>

        {user ? (
          <Button size="small" variant="contained" color="secondary" onClick={() => dispatch(logOut())}>
            Выйти
          </Button>
        ) : (
          <Button size="small" variant="contained" color="secondary" onClick={() => setOpen('auth')}>
            Войти / Регистрация
          </Button>
        )}
      </Box>
    </Box>
  );
};
