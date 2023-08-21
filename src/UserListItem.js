import { useContext } from "react";
import { userContext, ACTION_TYPES } from "./App";
const UserListItem = (props) => {
  const { dispatch } = useContext(userContext);
  const updateOnClickHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTION_TYPES.SET_ACTION_TYPE,
      payload: { type: ACTION_TYPES.UPDATE_USER, data: props.email },
    });
  };
  const deleteOnClickHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTION_TYPES.DELETE_USER,
      payload: props.email,
    });
  };
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.name}
      <div>
        <button
          type="button"
          className="btn btn-light me-2"
          onClick={updateOnClickHandler}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteOnClickHandler}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
export default UserListItem;
