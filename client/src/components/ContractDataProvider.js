import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useSecureCode } from "../hooks/useSecureCode";

const ContractDataProvider = ({ children }) => {
  const { account } = useWeb3React();
  const {
    fetchCodeOwnerAccts,
    fetchOwner,
    fetchPaused,
    fetchPipelines,
    fetchAllPipelinesByOwner,
    codeOwnerAccts,
    setHasSecNFT
  } = useSecureCode();
  useEffect(() => {
    if (account) {
      fetchCodeOwnerAccts();
      fetchOwner();
      fetchPaused();
      fetchPipelines();
      setHasSecNFT();
    }
  }, [account]);
  useEffect(() => {
    if (codeOwnerAccts.length > 0) {
      fetchAllPipelinesByOwner();
    }
  }, [codeOwnerAccts]);
  return <>{children}</>;
};

export default ContractDataProvider;
