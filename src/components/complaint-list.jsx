import {useSelector} from "react-redux";
import {Box, Button, Card, CardActions, CardContent, Drawer, Typography} from "@mui/material";

export const ComplaintList = ({open, onClose}) => {
  const complaints = useSelector(state => state.main.complaints);

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
          gap: 4,
          marginY: 4,
          marginX: 1
        }}
      >
        <Typography variant="h5">Список жалоб</Typography>
        {complaints?.map((data) => (
          <Card sx={{minWidth: 275}} key={data.id}>
            <CardContent>
              <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="body2">
                {data.complaint}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Подробнее</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Drawer>
  );
};
