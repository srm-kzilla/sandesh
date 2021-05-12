import React, { useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { ActionButton } from '.';
import { DeleteMailingList, MailingList } from './Modals';

interface MailingListProps {
  id: string;
  name: string;
  description: string;
  emails: string[];
}

const MailingListCard = ({ id, name, description, emails }: MailingListProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={id} className="relative flex bg-lightGray pt-4 pb-8 my-4 sm:pb-4 px-8 rounded-lg sm:rounded-xl">
      <main className="flex-1 min-w-0">
        <h1 className="text-xl truncate font-bold">{name}</h1>
        <div className="truncate text-md">{description}</div>
        <p className={`text-darkGray text-sm ${!expanded ? 'line-clamp-3' : ''}`}>{emails.join(', ')}</p>
        {expanded && (
          <span className="text-primary text-sm font-semibold cursor-pointer" onClick={() => setExpanded(false)}>
            Show less
          </span>
        )}
        {!expanded && (
          <span className="text-primary text-sm font-semibold cursor-pointer" onClick={() => setExpanded(true)}>
            Show more
          </span>
        )}
      </main>
      <aside className="absolute right-4 bottom-2 sm:right-0 sm:bottom-0 sm:relative self-center ml-4 flex items-center">
        <ActionButton
          Type={MailingList}
          Title={<Unicons.UilEnvelopeEdit size={24} />}
          Heading="Edit Mailing List"
          className="text-primary cursor-pointer p-2 mr-2 box-content transition-all transform hover:-translate-y-1"
          MailingListData={{ id, name, description, emails }}
        />
        <ActionButton
          Type={DeleteMailingList}
          Title={<Unicons.UilTrashAlt size={24} />}
          Heading="Delete Mailing List"
          className="text-red-600 cursor-pointer p-2 box-content transition-all transform hover:-translate-y-1"
          MailingListData={{ id, name, description, emails }}
        />
      </aside>
    </div>
  );
};

export default MailingListCard;
