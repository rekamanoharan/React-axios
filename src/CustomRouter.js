import { useContext } from "react";
import AddUser from "./AddUser";
import { UserList } from "./UserList";
import { userContext, ACTION_TYPES } from "./App";

const CustomRouter = () => {
  const { state } = useContext(userContext);
  const renderComponent = () => {
    switch (state.actionType) {
      case ACTION_TYPES.SET_USERS:
        return <UserList />;
      case ACTION_TYPES.ADD_USER:
      case ACTION_TYPES.UPDATE_USER: {
        return <AddUser />;
      }
      default:
        return <UserList />;
    }
  };
  return <>{renderComponent()}</>;
};
export default CustomRouter;
