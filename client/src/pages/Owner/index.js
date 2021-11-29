import { useEffect } from "react";
import { Box, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { useSecureCode } from "../../hooks/useSecureCode";
import PipelineApprovalTable from "./PipelineApprovalTable";

const Owner = () => {
  const { paused, pause, unpause, fetchPaused } = useSecureCode();
  useEffect(() => {
    fetchPaused();
  }, []);
  const handleChange = (e) => {
    if (e.target.checked) {
      pause();
    }
    unpause();
  };
  const renderPauseSwitch = () => {
    if (!paused) {
      return (
        <FormControlLabel
          control={<Switch checked={paused} />}
          label="Pause Contract"
          onChange={handleChange}
        />
      );
    }
    return (
      <FormControlLabel
        control={<Switch checked={paused} />}
        label="Unpause Contract"
        onChange={handleChange}
      />
    );
  };
  return (
    <Box ml={10} mt={10} width='65%'>
      <FormGroup>{renderPauseSwitch()}</FormGroup>
      <PipelineApprovalTable/>
    </Box>
  );
};

export default Owner;
