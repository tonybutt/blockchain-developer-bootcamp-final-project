import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetamaskConnectButton from "./MetamaskConnectButton";
import { Tabs, Tab, AppBar, Box, Toolbar } from "@material-ui/core";
import { useAppContext } from "../AppContext";
import HomeIcon from "@material-ui/icons/Home";
import TrashPanda from "../static/trash-panda.svg"

const Header = () => {
  const [value, setValue] = useState(0);
  const { isOwner, hasSecureCode } = useAppContext();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <AppBar>
        <Toolbar style={{justifyContent: "space-between"}}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              component={Link}
              to="/"
              icon={<HomeIcon />}
              aria-label="Home"
            />
            <Tab
              component={Link}
              to="/owner"
              label={`Owner Area`}
              disabled={!isOwner}
            />
            <Tab
              component={Link}
              to="/deployment"
              label="Deployment"
              disabled={!hasSecureCode}
            />
          </Tabs>
          <Box display="flex" justifyContent="space-evenly" alignItems="center" width={300}>
            <img src={TrashPanda} height="40px"/>
            <MetamaskConnectButton />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
