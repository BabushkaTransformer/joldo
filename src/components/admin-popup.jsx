import {useState} from "react";
import {Button, Drawer, MenuItem, Select, TextField} from "@mui/material";
import toast from "react-hot-toast";
import {createPrompt, fetchPrompts, removeCurrentPosition} from "../store/slices/index.js";
import {useDispatch, useSelector} from "react-redux";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase/index.js";


const loadImageToServer = async ({ file, place }) => {
  const currentRef = ref(storage, `${place}/` + file.name);
  try {
    await uploadBytes(currentRef, file);
    return await getDownloadURL(currentRef)
  } catch (e) {
    toast.error(e.message)
    return e;
  }
}

export const AdminPopup = ({open, onClose}) => {
  const dispatch = useDispatch()
  const { currentPosition, user } = useSelector(state => state.main)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Средний')
  const [images, setImages] = useState([])

  const onCreateComplaint = () => {
    if (!description || !title) {
      toast.error('Напишите жалобу!')
      return
    }

    dispatch(createPrompt({
      id: Date.now(),
      title,
      description,
      priority,
      user,
      position: currentPosition,
      images,
    }))
    dispatch(removeCurrentPosition())
    dispatch(fetchPrompts())
    onClose()
    toast.success('Жалоба оставлена!')
  }

  const handleUploadImage = async (event) => {
    if (!event.target.files[0]) return;

    try {
      const url = await loadImageToServer({ file: event.target.files[0], place: '' });
      setImages([...images, url]);
      toast.success('Изображение загружено!');
    } catch (error) {
      toast.error('Не удалось загрузить изображение!');
    }
  };

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
      Приоритет
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={priority}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="Низкий">Низкий</MenuItem>
        <MenuItem value="Средний">Средний</MenuItem>
        <MenuItem value="Высокий">Высокий</MenuItem>
      </Select>

      <TextField
        placeholder="Заголовок"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        placeholder="Оставить жалобу"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input type="file" onChange={handleUploadImage} />

      {images.map((url) => (
        <img src={url} alt=''/>
      ))}

      <Button onClick={onCreateComplaint}>
        Оставить напоминание
      </Button>
    </Drawer>
  );
};
