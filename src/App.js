import "./styles.css";
import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import CustomRouter from "./CustomRouter";

export const ACTION_TYPES = {
  SET_USERS: "SET_USERS",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  ADD_USER: "ADD_USER",
  SET_ACTION_TYPE: "SET_ACTION_TYPE",
};

const initialState = {
  users: [],
  updateUserEmail: null,
  actionType: ACTION_TYPES.SET_USERS,
};

export const userContext = createContext(null);

const userReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS: {
      return { ...state, users: action.payload };
    }
    case ACTION_TYPES.ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
        actionType: ACTION_TYPES.SET_USERS,
      };
    }
    case ACTION_TYPES.UPDATE_USER: {
      const updateUserWithExistingUsers = state.users.map((user) => {
        if (user.email === state.updateUserEmail) {
          return action.payload;
        }
        return user;
      });

      return {
        ...state,
        users: updateUserWithExistingUsers,
        actionType: ACTION_TYPES.SET_USERS,
        updateUserEmail: null,
      };
    }
    case ACTION_TYPES.DELETE_USER: {
      const deleteUserWithExistingUsers = state.users.filter((user) => {
        return user.email !== action.payload;
      });
      return {
        ...state,
        users: deleteUserWithExistingUsers,
        actionType: ACTION_TYPES.SET_USERS,
      };
    }
    case ACTION_TYPES.SET_ACTION_TYPE: {
      if (typeof action.payload === "object") {
        return {
          ...state,
          actionType: action.payload.type,
          updateUserEmail: action.payload.data,
        };
      }
      return { ...state, actionType: action.payload };
    }
    default:
      return state;
  }
};

function UserContextProvider(props) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  // const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("./mock/users.json").then((data) => {
      dispatch({ type: ACTION_TYPES.SET_USERS, payload: data.data });
    });
  }, []);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {props.children}
    </userContext.Provider>
  );
}

export default function App() {
  return (
    <UserContextProvider>
      <CustomRouter />
    </UserContextProvider>
  );
}
