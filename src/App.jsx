import {Fragment, useEffect, useState} from 'react';
import {TileLayer, Marker, Tooltip, LayersControl, MapContainer} from 'react-leaflet';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {ComplaintPopup} from "./components/complaint-popup.jsx";
import {Alert, Box, Button, IconButton} from "@mui/material";
import {Menu, Navigation} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {LocationMarker} from "./components/location-marker.jsx";
import {fetchComplaints, fetchPrompts, getUserProfile, logOut} from "./store/slices/index.js";
import {AdminPopup} from "./components/admin-popup.jsx";
import {Authorization} from "./components/authorization.jsx";
import {ComplaintList} from "./components/complaint-list.jsx";
import {PromptsList} from "./components/prompts-list.jsx";

const layers = {
  bicycle: true,
  publicTransport: true,
  other: true
};

const {BaseLayer} = LayersControl;

export const App = () => {
  const dispatch = useDispatch()
  const {complaints, prompts, user} = useSelector(state => state.main)

  const [mode, setMode] = useState(null)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    dispatch(fetchComplaints())
    dispatch(fetchPrompts())
  }, [dispatch, fetchComplaints])

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(getUserProfile(user.uid))
      }
    });
  }, []);

  const closeDrawer = () => {
    setOpen(null)
    setMode(null)
  }

  return (
    <Fragment>
      <Box
        sx={{
           width: '100%',
          padding: '10px 20px',
          display: 'flex',
          gap: 30,
          background: 'white'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            minHeight: 50,
            gap: 1
          }}
        >
          <Button size="small" variant="contained" onClick={() => setMode('complaint')}>
            Оставить жалобу
          </Button>

          {user && (
            <Button size="small" variant="contained" onClick={() => setMode('admin')}>
              Оставить напоминание?
            </Button>
          )}

          {user ? (
            <Button size="small" variant="contained" onClick={() => dispatch(logOut())}>
              Выйти
            </Button>
          ) : (
            <Button size="small" variant="contained" onClick={() => setOpen('auth')}>
              Войти / Регистрация
            </Button>
          )}

          <Button size="small" variant="contained" onClick={() => setOpen('complaint-list')}>
            Список жалоб
          </Button>

          <Button size="small" variant="contained" onClick={() => setOpen('prompt-list')}>
            Список проблем
          </Button>
        </Box>

        {(mode === 'admin' || mode === 'complaint') && (
          <Alert severity="warning">Выберите точку на карте!</Alert>
        )}
      </Box>

      <MapContainer center={[42.869170, 74.5944]} zoom={13}>
        <ComplaintList open={open === 'complaint-list'} onClose={closeDrawer}/>
        <PromptsList open={open === 'prompt-list'} onClose={closeDrawer}/>
        <ComplaintPopup open={open === 'complaint'} onClose={closeDrawer}/>
        <AdminPopup open={open === 'admin'} onClose={closeDrawer}/>
        <Authorization open={open === 'auth'} onClose={closeDrawer}/>

        <LayersControl position="topright">
          <BaseLayer checked={layers.bicycle} name="Bicycle">
            <TileLayer url="https://{s}.tile.openstreetmap.org/cycle/{z}/{x}/{y}.png"/>
          </BaseLayer>
          <BaseLayer checked={layers.publicTransport} name="Public Transport">
            <TileLayer url="https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png"/>
          </BaseLayer>
          <BaseLayer checked={layers.other} name="Other">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          </BaseLayer>
        </LayersControl>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onOpen={setOpen}
          mode={mode}
        />
        {complaints?.map((complaint) => (
          <Marker key={complaint.id} position={complaint.position}>
            <Tooltip>{complaint.title}</Tooltip>
          </Marker>
        ))}
        {prompts?.map((prompt) => (
          <Marker key={prompt.id} position={prompt.position}>
            <Tooltip>{prompt.title}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </Fragment>
  );
}
