import { Box, Typography } from "@material-ui/core";

const TokenHolder = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography>
        Congrats! You have been approved to push code to our environments!
      </Typography>
      <Typography>
        Step 1: Blah :D
      </Typography>
    </Box>
  );
};

export default TokenHolder;
