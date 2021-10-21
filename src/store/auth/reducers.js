import { handleActions } from "redux-actions";

import authActions from "./actions";

const authReducer = handleActions(
  new Map([
    [
      authActions.setUser,
      (state, action) => ({
        ...state,
        user: action.payload,
      }),
    ],
  ]),
  {
    user: null,
  }
);

export default authReducer;
