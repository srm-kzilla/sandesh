import React, { useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { ActionButton } from '.';
import { YesNo, MailingList } from './Modals';
import { deleteMailingLists } from '../utils/api';

interface MailingListProps {
  id: string;
  name: string;
  description: string;
  updateData: () => {};
  emails: string[];
}

const MailingListCard = ({ id, name, description, emails, updateData }: MailingListProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={id} className="relative flex bg-lightGray pt-4 pb-8 my-4 sm:pb-4 px-8 rounded-lg sm:rounded-xl">
      <main className="flex-1 min-w-0">
        <h1 className="text-xl truncate font-bold">{name}</h1>
        <div className="truncate text-md">{description}</div>
        {!expanded ? (
          <p className={`text-darkGray text-sm line-clamp-3`}>{emails.join(', ')}</p>
        ) : (
          <div key={id + 'full list'} className="text-gray-700 text-sm grid grid-cols-1 md:grid-cols-3">
            {emails.map((mail, id) => {
              return (
                <span key={id}>
                  <span aria-hidden="true" className="text-darkGray select-none">
                    {id + 1 > 9 ? id + 1 : '0' + (id + 1)})&nbsp;
                  </span>
                  {mail}
                </span>
              );
            })}
          </div>
        )}

        <span
          className="text-primary text-sm font-semibold cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </span>
      </main>
      <aside className="absolute right-4 bottom-2 sm:right-0 sm:bottom-0 sm:relative self-center ml-4 flex items-center">
        <ActionButton
          Type={MailingList}
          Title={<Unicons.UilEnvelopeEdit size={24} />}
          Heading="Edit"
          className="text-primary cursor-pointer p-2 mr-2 box-content transition-all transform hover:-translate-y-1"
          MailingListData={{ id, name, description, emails }}
          updateData={updateData}
        />
        <ActionButton
          Type={YesNo}
          toDo="delete mailing list"
          apiCall={deleteMailingLists}
          payload={{ id }}
          Title={<Unicons.UilTrashAlt size={24} />}
          Heading="Delete"
          className="text-red-600 cursor-pointer p-2 box-content transition-all transform hover:-translate-y-1"
          MailingListData={{ id, name, description, emails }}
          updateData={updateData}
        />
      </aside>
    </div>
  );
};

export default MailingListCard;
