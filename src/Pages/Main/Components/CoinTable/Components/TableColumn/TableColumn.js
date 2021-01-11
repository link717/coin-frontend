import React from "react";

function TableColumn() {
  return (
    <tr>
      {COLUMNS.map((column) => (
        <th scope="col" colspan={column.colspan}>
          {column.name}
        </th>
      ))}
    </tr>
  );
}

export default TableColumn;

const COLUMNS = [
  { id: 0, name: "자산", colspan: 3 },
  { id: 1, name: "Price", colspan: 1 },
  { id: 2, name: "1H", colspan: 1 },
  {
    id: 3,
    name: "24H",
    colspan: 1,
  },
  { id: 4, name: "7D", colspan: 1 },
  {
    id: 5,
    name: "24H Volume",
    colspan: 2,
  },
];
