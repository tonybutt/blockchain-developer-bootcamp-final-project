import { useSecureCode } from "../hooks/useSecureCode";
import { Route } from "react-router-dom";
import NotOwner from "../pages/NotOwner";

const OnlyOwner = ({ children }) => {
  const { isOwner } = useSecureCode();

  return isOwner ? (
    children
  ) : (
    <Route exact path="/owner" component={NotOwner} />
  );
};

export default OnlyOwner;
