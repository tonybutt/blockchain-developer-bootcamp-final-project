import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSecureCode } from "../../hooks/useSecureCode";
import Check from "@material-ui/icons/Check";
import Cancel from "@material-ui/icons/Cancel";
import useTransaction from "../../hooks/useTransaction";
import { useEffect } from "react";

const UserPipelines = () => {
  const { pipelines, fetchPipelines } = useSecureCode();
  const { txnStatus } = useTransaction();
  const rows = pipelines;
  useEffect(() => {
    if(txnStatus === "DONE"){
      fetchPipelines();
    }
  }, [txnStatus])
  return (
    <>
      <Box pt={14} width="75%" pr={5}>
        <Typography>Pipelines You've Submitted for Approval: </Typography>
        <TableContainer>
          {txnStatus === "LOADING" && <LinearProgress />}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pipeline ID: </TableCell>
                <TableCell>Commit Sha: </TableCell>
                <TableCell>Status: </TableCell>
                <TableCell>Approved: </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, index) => (
                  <TableRow key={row.id + index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.sha}</TableCell>
                    <TableCell>
                      {row.status === "success" ? (
                        <Check style={{ color: "green" }} />
                      ) : (
                        <Cancel style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {row.approved ? (
                        <Check style={{ color: "green" }} />
                      ) : (
                        <Cancel style={{ color: "red" }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserPipelines;
