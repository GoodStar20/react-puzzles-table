import { createActions } from "redux-actions";

/* Define actions here */
const options = {
  prefix: "AUTH",
};

export const authActions = createActions(
  {
    SET_USER: undefined,
  },
  options
);

export default authActions;
