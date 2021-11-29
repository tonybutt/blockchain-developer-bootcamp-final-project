import React from "react";
import GitLabForm from "./GitLabForm";

import UserPipelines from "./UserPipelines";
import { Box } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Box display="flex" height={'100%'}>
        <GitLabForm />
        <UserPipelines />
      </Box>
    </>
  );
};

export default Home;
