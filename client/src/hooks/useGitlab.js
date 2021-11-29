import { useState } from "react";
import gitlabApi from "../config/gitlabAPI";
import { useSecureCode } from "./useSecureCode";

export const useGitlab = () => {
  const [pipeline, setPipeline] = useState({});
  const { setCodeOwnerPipeline } = useSecureCode();
 
  const getPipelineInfo = (id) => {
    gitlabApi.get(`/projects/${id}/pipelines`).then((result) => {
      console.log(result);
      const { sha, status, id } = result.data[0];
      setPipeline({ id, sha, status });
      setCodeOwnerPipeline(id, sha, status);
    });
  };

  return {
    pipeline,
    getPipelineInfo,
  };
};
