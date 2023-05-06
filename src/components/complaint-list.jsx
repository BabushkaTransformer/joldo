import {useSelector} from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import {FilterAlt} from "@mui/icons-material";
import {useMemo, useState} from "react";

export const ComplaintList = ({open, onClose, setItem}) => {
  const complaints = useSelector(state => state.main.complaints);

  const [filter, setFilter] = useState('Все')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleSelect = (value) => () => {
    setFilter(value)
    setAnchorEl(null)
  }

  const filtered = useMemo(() => {
    if (filter === 'Все') {
      return complaints;
    }
    return complaints.filter((value) => value.filter === filter)
  })

  return (
    <Drawer
      PaperProps={{
        sx: {width: 400},
      }}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginY: 4,
          marginX: 1
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Список жалоб</Typography>
          <IconButton onClick={handleClick}>
            <FilterAlt/>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem selected={filter === 'Все'} onClick={handleSelect('Все')}>Все</MenuItem>
            <MenuItem selected={filter === 'Деффект дороги'} onClick={handleSelect('Деффект дороги')}>Деффект дороги</MenuItem>
            <MenuItem selected={filter === 'Правонарушение'} onClick={handleSelect('Правонарушение')}>Правонарушение</MenuItem>
          </Menu>
        </Box>
        {filtered?.map((data) => (
          <Card sx={{minWidth: 275}} key={data.id}>
            <CardContent>
              <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="body2">
                {data.complaint}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setItem(data)}>Подробнее</Button>
            </CardActions>
          </Card>
        ))}
        {!filtered?.length &&  <Typography>Нет данных</Typography>}
      </Box>
    </Drawer>
  );
};
