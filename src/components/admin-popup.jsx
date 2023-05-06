import {useState} from "react";
import {Box, Button, Drawer, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import toast from "react-hot-toast";
import {createPrompt, fetchPrompts, removeCurrentPosition} from "../store/slices/index.js";
import {useDispatch, useSelector} from "react-redux";
import {Uploader} from "./ui/uploader.jsx";

export const AdminPopup = ({open, onClose}) => {
  const dispatch = useDispatch()
  const {currentPosition, user} = useSelector(state => state.main)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Средний')
  const [images, setImages] = useState([])

  const onCreateComplaint = async () => {
    if (!description || !title) {
      toast.error('Не все поля заполнены!')
      return
    }

    await dispatch(createPrompt({
      id: Date.now(),
      title,
      description,
      priority,
      user,
      position: currentPosition,
      images,
    })).unwrap()
    dispatch(removeCurrentPosition())
    dispatch(fetchPrompts())
    onClose()
  }


  const handleChange = (event) => {
    setPriority(event.target.value);
  };

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
          <InputLabel htmlFor="prompt-title">Заголовок</InputLabel>
          <TextField
            size="small"
            id="prompt-title"
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
          <InputLabel htmlFor="prompt-description">Описание</InputLabel>
          <TextField
            multiline
            rows={3}
            size="small"
            id="prompt-description"
            placeholder="Оставить напоминание"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InputLabel htmlFor="prompt-select">Приоритет</InputLabel>
          <Select
            size="small"
            id="prompt-select"
            value={priority}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="Низкий">Низкий <span style={{ background: 'blue', borderRadius: '50%', width: 15, height: 15, marginLeft: 'auto' }} /></MenuItem>
            <MenuItem value="Средний">Средний <span style={{ background: 'yellow', borderRadius: '50%', width: 15, height: 15, marginLeft: 'auto' }} /></MenuItem>
            <MenuItem value="Высокий">Высокий <span style={{ background: 'red', borderRadius: '50%', width: 15, height: 15, marginLeft: 'auto' }} /></MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InputLabel htmlFor="prompt-complaint">Загрузить изображения</InputLabel>
          <Uploader images={images} setImages={setImages} id="prompt-complaint"fiare/>
        </Box>

        <Button variant="contained" onClick={onCreateComplaint}>
          Оставить напоминание
        </Button>
      </Box>
    </Drawer>
  );
};
