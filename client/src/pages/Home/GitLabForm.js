import React, { useState } from "react";
import useTransaction from "../../hooks/useTransaction";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { useGitlab } from "../../hooks/useGitlab";

const GitLabForm = () => {
  const { getPipelineInfo } = useGitlab();
  const { txnStatus } = useTransaction();
  const [gitlabProjectID, setGitlabProjectID] = useState("");
  const handleSubmit = () => {
    getPipelineInfo(gitlabProjectID);
    setGitlabProjectID("");
  };
  return (
    <Box
      pt={14}
      m="auto"
      height="100%"
      width="50%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography>Submit code from Gitlab for approval</Typography>
      <Box my={2}>
        <TextField
          type="number"
          variant="outlined"
          value={gitlabProjectID}
          onChange={(e) => setGitlabProjectID(e.target.value)}
          label="Gitlab Project ID: "
        />
      </Box>
      {txnStatus !== "LOADING" ? (
        <Button onClick={handleSubmit}>
          SUBMIT
        </Button>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default GitLabForm;
