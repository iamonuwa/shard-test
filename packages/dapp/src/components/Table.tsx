import { FC } from "react";
import { useTable } from "react-table";

interface TableProps {
  columns: any;
  data: any;
  onRowSelect?: (item: any) => void;
}

const Table: FC<TableProps> = ({ columns, data, onRowSelect }) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table className="min-w-full divide-y divide-gray-300" {...getTableProps()}>
      <thead className="text-sm">
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => {
              return (
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white" {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => onRowSelect && onRowSelect(row)}>
              {row.cells.map((cell, j) => {
                return (
                  <td
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    {...cell.getCellProps()}
                  >
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
