import { Box, Typography } from "@material-ui/core";

const NotTokenHolder = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography>Sorry, you are not holding any SEC NFTs.</Typography>
    </Box>
  );
};

export default NotTokenHolder;
