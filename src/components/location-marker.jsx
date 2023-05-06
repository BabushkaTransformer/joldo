import {Marker, Popup, useMapEvents} from "react-leaflet";
import {useEffect} from "react";
import {Button, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addCurrentPosition, removeCurrentPosition} from "../store/slices/index.js";
import {Close} from "@mui/icons-material";

export const LocationMarker = ({onOpen, mode, onClose}) => {
  const dispatch = useDispatch()
  const currentPosition = useSelector(state => state.main.currentPosition)

  useMapEvents({
    click(e) {
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
      setTimeout(() => {
        marker.openPopup()
      }, 0)
    }
  }

  return currentPosition === null ? null : (
    <Marker position={currentPosition} ref={openPopup}>
      <Popup>
        {mode === 'complaint' &&
          <Button
            style={{backgroundColor: 'transparent'}}
            size='small'
            onClick={() => onOpen('complaint')}>
            Добавить
            жалобу
          </Button>
        }
        {mode === 'admin' &&
          <Button
            style={{backgroundColor: 'transparent'}}
            size='small'
            onClick={() => onOpen('admin')}>
            Добавить
            напоминание
          </Button>
        }

        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={(e) => {
            e.stopPropagation()
            dispatch(removeCurrentPosition())
            onClose()
          }}
        >
          <Close sx={{fontSize: 15}}/>
        </IconButton>
      </Popup>
    </Marker>
  )
}