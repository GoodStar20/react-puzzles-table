import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { HeaderTitle } from "./styled";

const TableHeadItem = ({ column, swapColumns }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ColumnHead",
    item: {
      id: column.id,
    },
  }));
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "ColumnHead",
    drop: (item) => {
      swapColumns(item.id, column.id);
      return { name: "ColumnHeadDrop" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  drag(drop(ref));
  return (
    <th ref={ref} {...column.getHeaderProps(column.getSortByToggleProps())}>
      <HeaderTitle>{column.render("Header")}</HeaderTitle>
      <span>
        {column.isSorted && column.isSortedDesc && (
          <FontAwesomeIcon icon={faArrowDown} />
        )}
        {column.isSorted && !column.isSortedDesc && (
          <FontAwesomeIcon icon={faArrowUp} />
        )}
      </span>
    </th>
  );
};

export default TableHeadItem;
