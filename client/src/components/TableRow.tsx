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
              <tr key={element.id} className="grid grid-cols-1 m-4 sm:grid-cols-2 md:table-row mx-auto">
                <>
                  {fields.map((field, idx) => {
                    return (
                      <td>
                        <span key={element.id} className="capitalize font-bold inline-block md:hidden">
                          {headings[idx]}:&nbsp;
                        </span>
                        {element[field]}
                      </td>
                    );
                  })}
                </>
              </tr>
              <tr className="h-5"></tr>
            </>
          );
        }
        return null;
      })}
    </>
  );
};
export default TableRow;
