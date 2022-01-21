import React from 'react';
import TableHeading from './TableHeading';
import TableRow from './TableRow';

interface TableRowProps {
  children?: React.ReactNode;
  headings: string[];
  elements: any;
  from: 'sends' | 'keys';
  fields: string[];
  updateData: () => Promise<void>;
}

const TableLayout = ({ children, headings, elements, fields, from, updateData }: TableRowProps) => {
  return (
    <table className="w-full table-fixed">
      {children}
      <thead>
        <TableHeading headings={headings} />
      </thead>
      <tbody>
        <TableRow elements={elements} fields={fields} headings={headings} from={from} updateData={updateData} />
      </tbody>
    </table>
  );
};

export default TableLayout;
