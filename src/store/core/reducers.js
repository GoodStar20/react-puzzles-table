import { handleActions } from "redux-actions";

import coreActions from "./actions";

const coreReducer = handleActions(
  new Map([
    [
      coreActions.setUsers,
      (state, action) => ({
        ...state,
        users: action.payload,
      }),
    ],
    [
      coreActions.setColumns,
      (state, action) => ({
        ...state,
        columns: action.payload,
      }),
    ],
  ]),
  {
    users: [],
    columns: [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Full Name",
        accessor: "full_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Days Since Registered",
        accessor: "dsr",
      },
    ],
  }
);

export default coreReducer;
