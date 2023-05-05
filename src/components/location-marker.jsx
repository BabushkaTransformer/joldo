import {Marker, Popup, useMapEvents} from "react-leaflet";
import {useEffect} from "react";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addCurrentPosition, removeCurrentPosition} from "../store/slices/index.js";

export const LocationMarker = ({onOpen, mode}) => {
  const dispatch = useDispatch()
  const currentPosition = useSelector(state => state.main.currentPosition)


  useMapEvents({
    click(e) {
      console.log(e.target._layers)
      if (mode) {
        dispatch(addCurrentPosition({...e.latlng}))
      }
    },
  })

  useEffect(() => {
    if (!mode) {
      dispatch(removeCurrentPosition())
    }
  }, [mode]);

  const openPopup = (marker) => {
    if (marker) {
      marker.openPopup()
    }
  }

  return currentPosition === null ? null : (
    <Marker position={currentPosition} ref={openPopup}>
      <Popup>
        {mode === 'complaint' && <Button size='sm' onClick={() => onOpen('complaint')}>Добавить жалобу</Button>}
        {mode === 'admin' && <Button size='sm' onClick={() => onOpen('admin')}>Добавить что то</Button>}
      </Popup>
    </Marker>
  )
}