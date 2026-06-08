import { checkAuth } from "../actions/UserActions";
import { UserDTO } from "../models/User";
import HeaderNav from "./HeaderNav";

const Header = async () => {
  const authUser: UserDTO | null = await checkAuth();
  return <HeaderNav authUser={authUser} />;
};

export default Header;
