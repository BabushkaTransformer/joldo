import {useState} from "react";
import {Box, Button, Drawer, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import toast from "react-hot-toast";
import {createComplaint, fetchComplaints, removeCurrentPosition} from "../store/slices/index.js";
import {useDispatch, useSelector} from "react-redux";
import {Uploader} from "./ui/uploader.jsx";

export const ComplaintPopup = ({open, onClose}) => {
  const dispatch = useDispatch()
  const position = useSelector(state => state.main.currentPosition)

  const [title, setTitle] = useState('');
  const [complaint, setComplaint] = useState('')
  const [images, setImages] = useState([])
  const [filter, setFilter] = useState('')

  const onCreateComplaint = async () => {
    if (!complaint || !title || !filter) {
      toast.error('Не все поля заполнены!')
      return
    }

    await dispatch(createComplaint({
      id: Date.now(),
      title,
      complaint,
      position,
      images,
      filter
    })).unwrap()
    dispatch(removeCurrentPosition())
    dispatch(fetchComplaints())
    onClose()
  }

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
          padding: '5px 15px',
          gap: '10px',
          marginY: 2
        }}
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InputLabel htmlFor="com-title">Заголовок</InputLabel>
          <TextField
            size="small"
            id="com-title"
            placeholder="Заголовок"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InputLabel htmlFor="com-complaint">Текст жалобы</InputLabel>
          <TextField
            multiline
            rows={3}
            size="small"
            id="com-complaint"
            placeholder="Оставить жалобу"
            value={complaint}
            onChange={e => setComplaint(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InputLabel htmlFor="com-type">Тип жалобы</InputLabel>
          <Select
            size="small"
            id="com-type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="Деффект дороги">Деффект дороги</MenuItem>
            <MenuItem value="Правонаруешние">Правонаруешние</MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InputLabel htmlFor="com-upload">Загрузить изображения</InputLabel>
          <Uploader id="com-upload" setImages={setImages} images={images}/>
        </Box>

        <Button variant='contained' onClick={onCreateComplaint}>
          Оставить жалобу
        </Button>
      </Box>
    </Drawer>
  );
};
