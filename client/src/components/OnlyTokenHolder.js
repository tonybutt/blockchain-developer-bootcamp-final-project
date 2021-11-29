import { useSecureCode } from "../hooks/useSecureCode";
import { Route } from "react-router-dom";
import NotTokenHolder from "../pages/NotTokenHolder.js";

const OnlyTokenHolder = ({ children }) => {
  const { hasSecureCode } = useSecureCode();
  return hasSecureCode ? children : <Route exact path="/deployment" component={NotTokenHolder}/>
};

export default OnlyTokenHolder;
