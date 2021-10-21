import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Table from "./components/Table";
import coreActions from "./store/core/actions";
import { getColumns, getUsers } from "./store/core/selectors";
import { Buttons, Wrapper } from "./styled";
import generateFakeUsers from "./utils/helpers/generateFakeUsers";
import { getUser } from "./store/auth/selectors";
import authActions from "./store/auth/actions";

function App() {
  const dispatch = useDispatch();
  const columnsRef = useRef([]);

  const columns = useSelector(getColumns);
  const users = useSelector(getUsers);
  const user = useSelector(getUser);

  const [parsedUsers, setParsedUsers] = useState([]);
  const [updatedColumns, setUpdatedColumns] = useState([]);

  const login = () => {
    const fakeUser = {
      id: 1,
      firstName: "test",
      emaiL: "test@test.com",
    };
    dispatch(authActions.setUser(fakeUser));
  };

  const swapColumns = (column1, column2) => {
    const column1Index = columnsRef.current.findIndex(
      (columnItem) => columnItem.accessor === column1
    );
    const column2Index = columnsRef.current.findIndex(
      (columnItem) => columnItem.accessor === column2
    );
    const newColumns = columnsRef.current.map((column, index) => {
      if (index === column1Index) {
        return columnsRef.current[column2Index];
      } else if (index === column2Index) {
        return columnsRef.current[column1Index];
      }
      return column;
    });
    setUpdatedColumns(newColumns);
    columnsRef.current = newColumns;
  };

  const load = useCallback(() => {
    setUpdatedColumns(columns);
    columnsRef.current = columns;
  }, [columns]);

  const save = useCallback(() => {
    dispatch(coreActions.setColumns(updatedColumns));
  }, [dispatch, updatedColumns]);

  useEffect(() => {
    // setup fake users
    const fakeUsers = generateFakeUsers(500);
    dispatch(coreActions.setUsers(fakeUsers));
  }, [dispatch]);

  useEffect(() => {
    const newUsers = users.map((user) => {
      const today = moment();
      const registeredDate = moment(user.registered_at);
      return {
        ...user,
        full_name: `${user.first_name} ${user.last_name}`,
        dsr: today.diff(registeredDate, "days"),
      };
    });
    setParsedUsers(newUsers);
  }, [users]);

  useEffect(() => {
    setUpdatedColumns(columns);
    columnsRef.current = columns;
  }, [columns]);

  if (!user) {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <Wrapper>
      <Buttons>
        <button onClick={save}>Save</button>
        <button onClick={load}>Load</button>
      </Buttons>
      {parsedUsers.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <Table
            columns={updatedColumns}
            data={parsedUsers}
            swapColumns={swapColumns}
          />
        </DndProvider>
      )}
    </Wrapper>
  );
}

export default App;
