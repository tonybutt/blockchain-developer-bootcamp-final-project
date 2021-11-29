import { useContract } from "./useContract";
import SECURE_CODE_ABI from "../static/secureCodeABI";
import useIsValidNetwork from "./useIsValidNetwork";
import { useWeb3React } from "@web3-react/core";
import { useAppContext } from "../AppContext";
import { BigNumber } from "@ethersproject/bignumber";

export const useSecureCode = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const secureCodeContractAddr = "0xF8EB359847E1ACeF7d0208ACdb0D1EE0a9eD3B82";
  const contract = useContract(secureCodeContractAddr, SECURE_CODE_ABI);
  const {
    paused,
    pipelines,
    codeOwnerAccts,
    hasSecureCode,
    isOwner,
    allPipelinesByOwner,
    setAllPipelines,
    setHasSecureCode,
    setTxnStatus,
    setCodeOwnerAccts,
    setPipelines,
    setIsOwner,
    setPaused,
  } = useAppContext();
  
  const fetchPaused = () => {
    if (account && isValidNetwork) {
      contract
        .paused()
        .then((paused) => setPaused(paused))
        .catch((e) => console.log(e));
    }
  };

  const fetchOwner = () => {
    if (account && isValidNetwork) {
      contract
        .owner()
        .then((owner) => setIsOwner(owner === account))
        .catch((error) => console.log(error));
    }
  };

  const setHasSecNFT = () => {
    if (account && isValidNetwork) {
      contract
        .balanceOf(account)
        .then((balance) => setHasSecureCode(balance > 0))
        .catch((error) => console.log(error));
    }
  };

  const fetchCodeOwnerAccts = () => {
    if (account && isValidNetwork) {
      contract
        .getCodeOwnerAccts()
        .then((accounts) => setCodeOwnerAccts(Array.from(new Set(accounts))))
        .catch((error) => console.log(error));
    }
  };
  const fetchAllPipelinesByOwner = () => {
    if (account && isValidNetwork) {
      const newArr = [];
      codeOwnerAccts.forEach((acct) =>
        contract
          .getPipelines(acct)
          .then((pipelines) => {
            newArr.push({
              owner: acct,
              pipelines: convertPipelinesToArrayOfObjects(pipelines),
            });
          })
          .catch((error) => console.log(error))
      );
      setAllPipelines(newArr);
    }
  };

  const fetchPipelines = () => {
    if (account && isValidNetwork) {
      contract
        .getPipelines(account)
        .then((pipelines) => setPipelines(convertPipelinesToArrayOfObjects(pipelines)))
        .catch((error) => console.log(error));
    }
  };

  const pause = async () => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus("LOADING");
        const txn = await contract.pause();
        await txn.wait(1);
        setPaused(true);
        setTxnStatus("DONE");
      } catch (err) {
        setTxnStatus("ERROR");
      }
    }
  };

  const unpause = async () => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus("LOADING");
        const txn = await contract.unpause();
        await txn.wait(1);
        setPaused(false);
        setTxnStatus("DONE");
      } catch (err) {
        setTxnStatus("ERROR");
      }
    }
  };
  
  const approveCode = async (index, address) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus("LOADING");
        const txn = await contract.approveCode(BigNumber.from(index), address);
        await txn.wait(1);
        setTxnStatus("DONE");
      } catch (err) {
        setTxnStatus("ERROR");
      }
    }
  };

  const mintNFT = async (to, uri) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus("LOADING");
        const txn = await contract.safeMint(to, uri);
        await txn.wait(1);
        setTxnStatus("DONE");
      } catch (err) {
        setTxnStatus("ERROR");
      }
    }
  };

  const setCodeOwnerPipeline = async (id, sha, status) => {
    if (account && isValidNetwork) {
      const bigNumberId = BigNumber.from(id)
      try {
        setTxnStatus("LOADING");
        console.log(
          bigNumberId, id)
        const txn = await contract.setPipeline(sha, status, bigNumberId);
        await txn.wait(1);
        setTxnStatus("DONE");
      } catch (err) {
        setTxnStatus("ERROR");
        console.log(err)
      }
    }
  };
  const convertPipelinesToArrayOfObjects = (array) => {
    return array.map((innerArray) => ({
      id: innerArray['id'].toNumber(),
      sha: innerArray['commitSha'],
      status: innerArray['status'],
      approved: innerArray['approved']
    }))
  }
  return {
    paused,
    isOwner,
    pipelines,
    hasSecureCode,
    codeOwnerAccts,
    allPipelinesByOwner,
    pause,
    unpause,
    approveCode,
    mintNFT,
    fetchCodeOwnerAccts,
    fetchOwner,
    fetchPaused,
    fetchPipelines,
    fetchAllPipelinesByOwner,
    setHasSecNFT,
    setCodeOwnerPipeline,
    setPaused,
  };
};
