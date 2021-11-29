import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { useSecureCode } from "../../hooks/useSecureCode";
import Check from "@material-ui/icons/Check";
import Cancel from "@material-ui/icons/Cancel";
import TOKEN_URI from "../../static/tokenUri";
import Loader from "../../components/Loader";
import useTransaction from "../../hooks/useTransaction";

const Row = (props) => {
  const { approveCode, mintNFT } = useSecureCode();
  const { row } = props;
  const [open, setOpen] = useState(false);
  const handleApprove = (index) => {
    approveCode(index, row.owner);
  };
  const handleMint = () => {
    mintNFT(row.owner, TOKEN_URI);
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.owner}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} colSpan={2}>
          <Collapse in={!open} timeout="auto">
            <Box sx={{ margin: 1 }}>
              {row.pipelines &&
                row.pipelines.map((pipeline, index) => (
                  <Box key={index}>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary={"Pipeline ID:"}
                          secondary={pipeline.id}
                        />
                        <ListItemText
                          primary={"Pipeline Commit Sha:"}
                          secondary={pipeline.sha}
                        />
                        <Divider orientation={"vertical"} />
                        <ListItemIcon>
                          {pipeline.status === "success" ? (
                            <Check style={{ color: "green" }} />
                          ) : (
                            <Cancel style={{ color: "red" }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={"Pipeline Status:"}
                          secondary={pipeline.status}
                        />
                        <ListItemIcon>
                          {pipeline.approved ? (
                            <Check style={{ color: "green" }} />
                          ) : (
                            <Cancel style={{ color: "red" }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={"Pipeline Approved"}
                          secondary={pipeline.approved.toString()}
                        />
                        {pipeline.approved ? (
                          <ListItemSecondaryAction>
                            <Loader circular>
                              <Button
                                size="small"
                                onClick={handleMint}
                              >
                                Mint NFT
                              </Button>
                            </Loader>
                          </ListItemSecondaryAction>
                        ) : (
                          <ListItemSecondaryAction>
                            <Loader circular>
                              <Button
                                size="small"
                                onClick={() => handleApprove(index)}
                              >
                                Approve
                              </Button>
                            </Loader>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    </List>
                    <Divider />
                  </Box>
                ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const PipelineApprovalTable = () => {
  const { allPipelinesByOwner, fetchAllPipelinesByOwner } = useSecureCode();
  const { txnStatus } = useTransaction();
  const renderTableData = () => {
    if (allPipelinesByOwner) {
      return allPipelinesByOwner.map((pipelineByOwner) => (
        <Row key={pipelineByOwner.owner} row={pipelineByOwner} />
      ));
    } else {
      return <Typography>Waiting for Data...</Typography>
    }
  };
  useEffect(() => {
    console.log(allPipelinesByOwner);
  }, []);
  useEffect(() => {
    if (txnStatus === "DONE") {
      fetchAllPipelinesByOwner();
    }
  }, [txnStatus]);
  return (
    <TableContainer>
      <Loader />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 1 }} />
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableData()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PipelineApprovalTable;
