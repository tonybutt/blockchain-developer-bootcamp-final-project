import React from "react";
import { useWeb3React } from "@web3-react/core";
import MMLogo from "../static/metamask-logo.svg";
import { injected } from "../connectors";
import { shortenAddress } from "../utils/shortenAddress";
import { Box, Button, Typography, SvgIcon } from "@material-ui/core";

const MetamaskConnectButton = () => {
  const { activate, active, account, deactivate } = useWeb3React();

  if (active) {
    return (
      <>
        <img component={"img"} src={MMLogo} />
        <Typography>{shortenAddress(account)}</Typography>
        <Button onClick={deactivate}>Log Out</Button>
      </>
    );
  }

  return (
    <>
      <img src={MMLogo} />
      <Typography>Metamask</Typography>
      <Button onClick={() => activate(injected)}>Connect</Button>
    </>
  );
};

export default MetamaskConnectButton;
