import {useSelector} from "react-redux";
import {Box, Button, Card, CardActions, CardContent, Drawer, Typography} from "@mui/material";

export const PromptsList = ({open, onClose}) => {
  const prompts = useSelector(state => state.main.prompts);

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
        <Typography variant="h5">Список проблем</Typography>
        {prompts?.map((data) => (
          <Card sx={{minWidth: 275}} key={data.id}>
            <CardContent>
              <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="body2">
                {data.complaint}
              </Typography>
              <Typography variant="body2">
                {data.priority}
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
