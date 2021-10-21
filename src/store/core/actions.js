import { createActions } from "redux-actions";

/* Define actions here */
const options = {
  prefix: "CORE",
};

export const coreActions = createActions(
  {
    SET_USERS: undefined,
    SET_COLUMNS: undefined,
  },
  options
);

export default coreActions;
