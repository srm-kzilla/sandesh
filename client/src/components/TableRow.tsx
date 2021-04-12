interface TableRowProps {
  elements: {
    id: number;
    title: string;
    mailingList: string;
    startFrom: string;
    endAt: string;
    typeOfCampaign: 'all' | 'multiple' | 'single';
  }[];
  fields: string[];
  headings: string[];
  type: 'all' | 'multiple' | 'single';
}
const TableRow = ({ elements, fields, headings, type }: TableRowProps) => {
  return (
    <>
      {elements.map((element: any) => {
        if (type === 'all' || type === element.typeOfCampaign) {
          return (
            <>
              <tr className="h-5"></tr>
              <tr key={element.id} className="grid grid-cols-1 sm:grid-cols-2 md:table-row mx-auto">
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
            </>
          );
        }
        return null;
      })}
    </>
  );
};
export default TableRow;
