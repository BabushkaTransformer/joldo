import {Fragment, useEffect, useState} from 'react';
import {TileLayer, Marker, Tooltip, LayersControl, MapContainer} from 'react-leaflet';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {ComplaintPopup} from "./components/complaint-popup.jsx";
import {useDispatch, useSelector} from "react-redux";
import {LocationMarker} from "./components/location-marker.jsx";
import {fetchComplaints, fetchPrompts, getUserProfile} from "./store/slices/index.js";
import {AdminPopup} from "./components/admin-popup.jsx";
import {Authorization} from "./components/authorization.jsx";
import {ComplaintList} from "./components/complaint-list.jsx";
import {PromptsList} from "./components/prompts-list.jsx";
import {Menu} from "./components/menu.jsx";
import {Backdrop, Typography} from "@mui/material";
import {ItemDrawer} from "./components/item-drawer.jsx";
import * as L from 'leaflet';

const layers = {
  bicycle: true,
  publicTransport: true,
  other: true
};

const {BaseLayer} = LayersControl;

const priorityToColor = {
  'Низкий': 'blue',
  'Средний': 'yellow',
  'Высокий': 'red'
}

export const App = () => {
  const dispatch = useDispatch()
  const {complaints, prompts, currentPosition} = useSelector(state => state.main)

  const [mode, setMode] = useState(null)
  const [open, setOpen] = useState(null)
  const [item, setItem] = useState(null)

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
      <Menu
        mode={mode}
        setMode={setMode}
        setOpen={setOpen}
      />

      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, pointerEvents: 'none'}}
        open={(mode === 'admin' || mode === 'complaint') && !currentPosition}
      >
        <Typography variant="h5">Выберите точку где хотите оставить комментарий!</Typography>
      </Backdrop>

      <MapContainer center={[42.869170, 74.5944]} zoom={13}>
        <ComplaintList open={open === 'complaint-list'} setItem={setItem} onClose={closeDrawer}/>
        <PromptsList open={open === 'prompt-list'} setItem={setItem} onClose={closeDrawer}/>
        <ComplaintPopup open={open === 'complaint'} onClose={closeDrawer}/>
        <AdminPopup open={open === 'admin'} onClose={closeDrawer}/>
        <Authorization open={open === 'auth'} onClose={closeDrawer}/>
        <ItemDrawer item={item} onClose={() => setItem(null)}/>

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
          onClose={closeDrawer}
          onOpen={setOpen}
          mode={mode}
        />

        {complaints?.map((complaint) => {
          let icon = new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${complaint.color || 'green'}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          return (
            <Marker
              key={complaint.id}
              position={complaint.position}
              icon={icon}
              eventHandlers={{
                click: () => setItem(complaint),
              }}
            >
              <Tooltip>{complaint.title}</Tooltip>
            </Marker>
          )
        })}
        {prompts?.map((prompt) => {
          let icon = new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${priorityToColor[prompt.priority] || 'blue'}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          return (
            <Marker
              key={prompt.id}
              position={prompt.position}
              icon={icon}
              eventHandlers={{
                click: () => setItem(prompt),
              }}
            >
              <Tooltip>{prompt.title}</Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </Fragment>
  );
}
