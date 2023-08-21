import { useContext, useState } from "react";
import { userContext, ACTION_TYPES } from "./App";

const AddUser = () => {
  const { dispatch, state } = useContext(userContext);
  const findUser =
    state.actionType == ACTION_TYPES.UPDATE_USER
      ? state.users.find((user) => {
          return state.updateUserEmail === user.email;
        })
      : null;
  const [email, setEmail] = useState(findUser ? findUser.email : "");
  const [name, setName] = useState(findUser ? findUser.name : "");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (findUser) {
      dispatch({ type: ACTION_TYPES.UPDATE_USER, payload: { email, name } });
    } else {
      dispatch({ type: ACTION_TYPES.ADD_USER, payload: { email, name } });
    }
  };

  const onChangeEmailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const onChangeNameHandler = (e) => {
    const value = e.target.value;
    setName(value);
  };

  return (
    <form className="p-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="name"
          name="name"
          value={name}
          onChange={onChangeNameHandler}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          disabled={findUser ? true : false}
          onChange={onChangeEmailHandler}
          className="form-control"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <button
        type="submit"
        onClick={onSubmitHandler}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};
export default AddUser;
