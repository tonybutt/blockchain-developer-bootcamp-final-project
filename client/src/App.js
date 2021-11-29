import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import Header from "./components/Header";
import OnlyOwner from "./components/OnlyOwner";
import { AppContextProvider } from "./AppContext";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./config/theme";
import { injected } from "./connectors";
import ContractDataProvider from "./components/ContractDataProvider";
import { Box } from "@material-ui/core";
import OnlyTokenHolder from "./components/OnlyTokenHolder";
import TokenHolder from "./pages/TokenHolder";

const App = () => {
  const { activate } = useWeb3React();
  useEffect(() => {
    activate(injected);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <ContractDataProvider>
          <Box height='100%'>
            <Header />
            <Route exact path="/" component={Home} />
            <OnlyOwner>
              <Route exact path="/owner" component={Owner} />
            </OnlyOwner>
            <OnlyTokenHolder>
              <Route exact path="/deployment" component={TokenHolder}></Route>
            </OnlyTokenHolder>
          </Box>
        </ContractDataProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
