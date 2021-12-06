interface TableHeadingProps {
  headings: string[];
}
const TableHeading = ({ headings }: TableHeadingProps) => {
  return (
    <>
      <tr key="margin" className="h-10"></tr>
      <tr className="md:table-row capitalize hidden text-left">
        {headings.map((heading, id) => (
          <th className=" pr-4 table-heading" key={id}>
            {heading}
          </th>
        ))}
      </tr>
    </>
  );
};
export default TableHeading;
