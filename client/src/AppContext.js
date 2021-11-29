import React, { createContext, useReducer } from "react";

const initialContext = {
  allPipelinesByOwner: [],
  setAllPipelines: () => {},
  paused: false,
  setPaused: () => {},
  isOwner: false,
  setIsOwner: () => {},
  pipelines: [],
  setPipelines: () => {},
  codeOwnerAccts: [],
  setCodeOwnerAccts: () => {},
  hasSecureCode: false,
  setHasSecureCode: () => {},
  isWalletConnectionModalOpen: false,
  setWalletConnectModal: () => {},
  txnStatus: "NOT_SUBMITTED",
  setTxnStatus: () => {},
};

const appReducer = (state, { type, payload }) => {
  console.log("Setting State", type, payload);
  switch (type) {
    case "SET_ALL_PIPELINES":
      return {
        ...state,
        allPipelinesByOwner: payload,
      };
    case "SET_PAUSED":
      return {
        ...state,
        paused: payload,
      };
    case "SET_IS_OWNER":
      return {
        ...state,
        isOwner: payload,
      };
    case "SET_PIPELINES":
      return {
        ...state,
        pipelines: payload,
      };
    case "SET_CODE_OWNER_ACCTS":
      return {
        ...state,
        codeOwnerAccts: payload,
      };
    case "SET_HAS_SECURE_CODE":
      return {
        ...state,
        hasSecureCode: payload,
      };
    case "SET_WALLET_MODAL":
      return {
        ...state,
        isWalletConnectModalOpen: payload,
      };

    case "SET_TXN_STATUS":
      return {
        ...state,
        txnStatus: payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext(initialContext);
export const useAppContext = () => React.useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialContext);

  const contextValue = {
    allPipelinesByOwner: store.allPipelinesByOwner,
    setAllPipelines: (allPipelines) => {
      dispatch({ type: "SET_ALL_PIPELINES", payload: allPipelines });
    },
    paused: store.paused,
    setPaused: (pause) => {
      dispatch({ type: "SET_PAUSED", payload: pause });
    },
    isOwner: store.isOwner,
    setIsOwner: (owns) => {
      dispatch({ type: "SET_IS_OWNER", payload: owns });
    },
    pipelines: store.pipelines,
    setPipelines: (pipelines) => {
      dispatch({ type: "SET_PIPELINES", payload: pipelines });
    },
    codeOwnerAccts: store.codeOwnerAccts,
    setCodeOwnerAccts: (accts) => {
      dispatch({ type: "SET_CODE_OWNER_ACCTS", payload: accts });
    },
    hasSecureCode: store.hasSecureCode,
    setHasSecureCode: (hasSecureCode) => {
      dispatch({ type: "SET_HAS_SECURE_CODE", payload: hasSecureCode });
    },
    isWalletConnectModalOpen: store.isWalletConnectModalOpen,
    setWalletConnectModal: (open) => {
      dispatch({ type: "SET_WALLET_MODAL", payload: open });
    },
    txnStatus: store.txnStatus,
    setTxnStatus: (status) => {
      dispatch({ type: "SET_TXN_STATUS", payload: status });
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
