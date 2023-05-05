import {useState} from "react";
import {Button, Drawer, TextField} from "@mui/material";
import toast from "react-hot-toast";
import {createComplaint, removeCurrentPosition} from "../store/slices/index.js";
import {useDispatch, useSelector} from "react-redux";

export const ComplaintPopup = ({open, onClose}) => {
  const dispatch = useDispatch()
  const position = useSelector(state => state.main.currentPosition)
  const [title, setTitle] = useState('');
  const [complaint, setComplaint] = useState('')

  const onCreateComplaint = () => {
    if (!complaint || !title) {
      toast.error('Напишите жалобу!')
      return
    }

    dispatch(createComplaint({
      id: Date.now(),
      title,
      complaint,
      position,
    }))
    dispatch(removeCurrentPosition())
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
      <TextField
        placeholder="Заголовок"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        placeholder="Оставить жалобу"
        value={complaint}
        onChange={e => setComplaint(e.target.value)}
      />

      <Button onClick={onCreateComplaint}>
        Оставить жалобу
      </Button>
    </Drawer>
  );
};
