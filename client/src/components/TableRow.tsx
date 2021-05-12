interface TableRowProps {
  elements: {
    id: number;
    title: string;
    mailingList: string;
    startFrom: string;
    endAt: string;
    typeOfCampaign: 'ALL' | 'MULTIPLE' | 'SINGLE';
  }[];
  fields: string[];
  headings: string[];
  type: 'ALL' | 'MULTIPLE' | 'SINGLE';
}
const TableRow = ({ elements, fields, headings, type }: TableRowProps) => {
  return (
    <>
      {elements.map((element: any) => {
        if (type === 'ALL' || type === element.typeOfCampaign) {
          return (
            <>
              <tr key={element._id + 'blank'} className="h-5"></tr>
              <tr key={element._id} className="grid grid-cols-1 sm:grid-cols-2 md:table-row mx-auto">
                <>
                  {fields.map((field, idx) => {
                    return (
                      <td key={idx}>
                        <span key={element._id} className="capitalize font-bold inline-block md:hidden">
                          {headings[idx]}:&nbsp;
                        </span>
                        {element[field]}
                      </td>
                    );
                  })}
                </>
              </tr>
            </>
          );
        }
        return null;
      })}
    </>
  );
};
export default TableRow;
