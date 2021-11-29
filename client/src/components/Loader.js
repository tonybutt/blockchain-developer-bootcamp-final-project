import { LinearProgress, CircularProgress } from "@material-ui/core";
import useTransaction from "../hooks/useTransaction";

const Loader = ({ children, circular }) => {
  const { txnStatus } = useTransaction();
  if (circular) {
    return <>{txnStatus === "LOADING" ? <CircularProgress /> : children}</>;
  }
  return <>{txnStatus === "LOADING" ? <LinearProgress /> : <></>}</>;
};

export default Loader;
