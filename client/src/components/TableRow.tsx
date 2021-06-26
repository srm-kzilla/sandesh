import * as Unicons from '@iconscout/react-unicons';
import { ActionButton } from '.';
import { DeleteCampaign, EditCampaign } from './Modals';

interface TableRowProps {
  elements: {
    id: number;
    title: string;
    mailingList: string;
    startFrom: string;
    endAt: string;
  }[];
  fields: string[];
  headings: string[];
}
const TableRow = ({ elements, fields, headings }: TableRowProps) => {
  return (
    <>
      {elements.map((element: any) => {
        return (
          <>
            <tr key={element._id + 'blank'} className="h-5"></tr>
            <tr key={element._id} className="grid  grid-cols-1 md:table-row mx-auto pt-5">
              <>
                {fields.map((field, idx) => {
                  return (
                    <td key={idx} className={`${field === 'senderMail' ? 'md:col-span-2 ' : ''} sends-table`}>
                      <span key={element._id} className="capitalize font-bold inline-block md:hidden">
                        {headings[idx]}:&nbsp;
                      </span>
                      {element[field].toString()}
                    </td>
                  );
                })}
              </>
            </tr>
            <tr
              key={element._id + 'actions'}
              className="flex items-center bg-lightGray rounded-b-lg md:w-max md:rounded-b-2xl py-2 md:p-2"
            >
              <td>
                <ActionButton
                  Type={DeleteCampaign}
                  Title={
                    <div className="flex items-center">
                      <Unicons.UilTrashAlt size={24} />
                      Delete
                    </div>
                  }
                  element={element}
                  Heading="Delete Campaign"
                  className="text-red-600 cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
                />
              </td>
              <td>
                <ActionButton
                  Type={EditCampaign}
                  Title={
                    <div className="flex items-center">
                      <Unicons.UilEdit size={24} />
                      Edit
                    </div>
                  }
                  element={element}
                  Heading="Edit Campaign"
                  className="text-primary cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
                />
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
export default TableRow;
