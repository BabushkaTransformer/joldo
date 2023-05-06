import {Box, Button, Drawer, Typography} from "@mui/material";
import {useLayoutEffect, useState} from "react";
import {useMapEvents} from "react-leaflet";


const priorityToColor = {
  'Низкий': 'blue',
  'Средний': 'yellow',
  'Высокий': 'red'
}

export const ItemDrawer = ({item, onClose}) => {
  const map = useMapEvents({})

  const [localItem, setLocalItem] = useState(item)

  console.log(localItem)
  useLayoutEffect(() => {
    if (item) {
      setLocalItem(item)
    }
  }, [item])
  return (
    <Drawer
      PaperProps={{
        sx: {width: 400},
      }}
      open={!!item}
      onClose={onClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginY: 4,
          marginX: 2
        }}
      >
        <Typography variant="h5">Подробности</Typography>

        {localItem?.images && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap'
            }}
          >
            {localItem?.images?.map(url => (
              <img
                key={url}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  boxShadow: '0px 3px 8px 0px rgba(0,0,0,0.75)'
                }}
                alt=''
                src={url}
              />
            ))}
          </Box>
        )}
        <Box>
          <Typography>Заголовок</Typography>
          <Typography fontWeight='bold'>{localItem?.title}</Typography>
        </Box>

        <Box>
          <Typography>Описание</Typography>
          <Box
            sx={{
              borderRadius: 2,
              background: 'silver',
              padding: '10px 20px'
            }}
          >
            <Typography>{localItem?.complaint || localItem?.description}</Typography>
          </Box>
        </Box>

        {item?.priority && (
          <Box>
            <Typography>Приоритет</Typography>
            <Typography><span style={{ background: priorityToColor[item?.priority] || 'blue', borderRadius: '50%', width: 15, height: 15, display: 'inline-block', marginRight: 5 }} />{item?.priority}</Typography>
          </Box>
        )}

        <Box>
          <Typography>Автор</Typography>
          <Typography>Была создана {item?.user?.firstName ? `${item?.user?.lastName} ${item?.user?.firstName}` : 'Анонимус'}</Typography>
        </Box>


        <Button variant='contained' size="small" onClick={() => map.flyTo(item.position, map.getZoom())} >
          Показать на карте
        </Button>
      </Box>
    </Drawer>
  );
};
