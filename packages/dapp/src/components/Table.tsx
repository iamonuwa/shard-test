import { Metadata } from "hooks/useIPFS";
import { FC } from "react";
import { useTable } from "react-table";

interface TableProps {
  columns: any;
  data: any[];
  onRowSelect?: (item: any) => void;
}

const Table: FC<TableProps> = ({ columns, data, onRowSelect }) => {
  console.log(data);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table className="min-w-full divide-y divide-gray-300" {...getTableProps()}>
      <thead className="text-sm">
        {headerGroups.map((headerGroup, i) => (
          <tr key={i}>
            {headerGroup.headers.map((column, j) => {
              return (
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  key={j}
                >
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white" {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr key={idx} onClick={() => onRowSelect && onRowSelect(row)}>
              {row.cells.map((cell, jdx) => {
                return (
                  <td key={jdx} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
