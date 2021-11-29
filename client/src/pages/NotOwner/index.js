import { Box, Typography } from "@material-ui/core";

const NotOwner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems='center' height='100%'>
      <Typography>Sorry, you are not the owner of this contract.</Typography>
    </Box>
  );
};

export default NotOwner;
