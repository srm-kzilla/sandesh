import * as Unicons from '@iconscout/react-unicons';
import { ActionButton } from '.';
import { deleteCampaign, deleteKey, resetKey, toggleKey } from '../utils/api';
import { toFrontend } from '../utils/FormatDate';
import { CreateCampaign, YesNo } from './Modals';

interface TableRowProps {
  elements: any[];
  fields: string[];
  headings: string[];
  from: 'sends' | 'keys';
  updateData?: () => {};
}

const TableRow = ({ elements, fields, headings, from, updateData }: TableRowProps) => {
  return (
    <>
      {elements.map((element: any) => {
        return (
          <>
            <tr key={element._id + 'blank'} className="h-5"></tr>
            <tr key={element._id} className={`grid  grid-cols-1 md:table-row mx-auto pt-5`}>
              {MakeRows(fields, headings, element)}
            </tr>
            {from === 'sends' ? EditDeleteCampagin(element, updateData!) : null}
            {from === 'keys' ? ToggleResetKey(element, updateData!) : null}
          </>
        );
      })}
    </>
  );
};

const MakeRows = (fields: string[], headings: string[], element: any) => {
  return fields.map((field, idx) => {
    return (
      <td key={idx} className={`${field === 'senderMail' ? 'md:col-span-2 ' : ''} table-data`}>
        <span key={element._id} className="capitalize font-bold inline-block md:hidden">
          {headings[idx]}:&nbsp;
        </span>
        {field === 'key' ? (
          <span
            className="cursor-pointer"
            onClick={(e: any) => {
              e.target.innerHTML = e.target.innerHTML !== '**********' ? '**********' : element[field].toString();
            }}
          >
            **********
          </span>
        ) : (
          <span>
            {field === 'startTime'
              ? element.scheduled
                ? toFrontend(element[field].toString(), 'display').date +
                  ' at ' +
                  toFrontend(element[field].toString(), 'display').time
                : ''
              : element[field].toString()}
          </span>
        )}
      </td>
    );
  });
};

const EditDeleteCampagin = (element: any, updateData: () => {}) => (
  <tr
    key={element._id + 'actions'}
    className="flex items-center bg-lightGray rounded-b-lg md:w-max md:rounded-b-2xl py-2 md:p-2 text-sm"
  >
    <td>
      <ActionButton
        Type={YesNo}
        toDo="delete campaign"
        apiCall={deleteCampaign}
        payload={element._id}
        Title={
          <div className="flex items-center">
            <Unicons.UilTrashAlt size={20} />
            &nbsp; Delete
          </div>
        }
        Heading="Delete Campaign"
        className="text-red-600 cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
        updateData={updateData}
      />
    </td>
    <td>
      {element.scheduled ? (
        <ActionButton
          Type={CreateCampaign}
          Title={
            <div className="flex items-center">
              <Unicons.UilEdit size={20} />
              &nbsp;Edit
            </div>
          }
          CampaignData={element}
          Heading="Edit Campaign"
          className="text-primary cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
          updateData={updateData}
          createOrUpdate="update"
        />
      ) : null}
    </td>
  </tr>
);

const ToggleResetKey = (element: any, updateData: () => {}) => (
  <tr
    key={element._id + 'actions'}
    className="flex items-center bg-lightGray rounded-b-lg md:w-max md:rounded-b-2xl py-2 md:p-2 text-sm"
  >
    <td>
      <ActionButton
        Type={YesNo}
        toDo="Reset Key"
        apiCall={resetKey}
        payload={element._id}
        Title={
          <div className="flex items-center">
            <Unicons.UilHistoryAlt size={20} />
            &nbsp; Reset
          </div>
        }
        Heading="Reset Key"
        className="text-red-600 cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
        updateData={updateData}
      />
    </td>
    <td>
      <ActionButton
        Type={YesNo}
        toDo="Toggle Key"
        apiCall={toggleKey}
        payload={{ _id: element._id, isEnabled: element.isEnabled }}
        Title={
          <div className="flex items-center">
            <Unicons.UilToggleOff size={20} />
            &nbsp;Toggle
          </div>
        }
        Heading="Toggle Key"
        className="text-primary cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
        updateData={updateData}
      />
    </td>
    <td>
      <ActionButton
        Type={YesNo}
        toDo="Delete Key"
        apiCall={deleteKey}
        payload={element._id}
        Title={
          <div className="flex items-center">
            <Unicons.UilTrashAlt size={20} />
            &nbsp;Delete
          </div>
        }
        Heading="Delete Key"
        className="text-red-600 cursor-pointer px-2 box-content transition-all transform hover:-translate-y-1"
        updateData={updateData}
      />
    </td>
  </tr>
);

export default TableRow;
