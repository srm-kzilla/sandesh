interface TableHeadingProps {
  headings: string[];
}
const TableHeading = ({ headings }: TableHeadingProps) => {
  return (
    <tr className="md:table-row capitalize hidden text-left">
      {headings.map((heading, id) => (
        <th className="px-4" key={id}>
          {heading}
        </th>
      ))}
    </tr>
  );
};
export default TableHeading;