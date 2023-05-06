import {useState} from 'react';
import {Delete, FileUpload} from "@mui/icons-material";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/index.js";
import toast from "react-hot-toast";
import {Avatar, Box, CircularProgress} from "@mui/material";
import './uploader.css';

export const loadImageToServer = async ({file, place}) => {
  const currentRef = ref(storage, `${place}/` + file.name);
  try {
    await uploadBytes(currentRef, file);
    return await getDownloadURL(currentRef)
  } catch (e) {
    toast.error(e.message)
    return e;
  }
}

export const Uploader = ({ images, setImages }) => {
  const [loading, setLoading] = useState(false)
  const handleUploadImage = async (event) => {
    if (!event.target.files[0]) return;

    try {
      setLoading(true)
      const url = await loadImageToServer({file: event.target.files[0], place: ''});
      setImages([...images, url]);
      toast.success('Изображение загружено!');
    } catch (error) {
      toast.error('Не удалось загрузить изображение!');
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <main>
      <form
        className="uploaded-form"
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept='image/*'
          className='input-field'
          hidden
          onChange={handleUploadImage}
        />

        {loading && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '5px',
              top: 0
            }}
          >
            <CircularProgress/>
          </Box>
        )}

        <FileUpload size={60}/>
        <p>Кликните, чтобы загрузить изображения</p>

      </form>

      {images.map((image) => (
        <section className='uploaded-row'>
          <Avatar alt="" src={image}/>
          <span className='upload-content'>
            загружено!
          <Delete
            onClick={() => {
              setImages(state => state.filter(val => val !== image))
            }}
          />
        </span>
        </section>
      ))}

    </main>
  )
}
