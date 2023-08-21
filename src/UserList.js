import { useContext } from "react";
import { userContext, ACTION_TYPES } from "./App";
import UserListItem from "./UserListItem";
export const UserList = () => {
  const { state, dispatch } = useContext(userContext);

  const renderUsers = () => {
    if (!state.users.length) return <p>Loading...</p>;
    return state.users.map((user) => {
      return <UserListItem key={user.id} {...user} />;
    });
  };

  const addUserOnClickHandler = () => {
    dispatch({
      type: ACTION_TYPES.SET_ACTION_TYPE,
      payload: ACTION_TYPES.ADD_USER,
    });
  };

  return (
    <section className="p-5">
      <div className="d-flex justify-content-between">
        <h4 class="h4">React Axios Task</h4>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={addUserOnClickHandler}
        >
          Add User
        </button>
      </div>
      <ul className="list-group">{renderUsers()}</ul>
    </section>
  );
};
