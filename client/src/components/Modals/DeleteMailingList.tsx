import React from 'react';
import { postCampaigns } from '../../utils/api';

const DeleteMailingList = ({ MailingListData, setModal }: any) => {
  return (
    <div className="text-lg my-8 self-center w-full">
      Are You Sure You want to delete '{MailingListData.name}' Mailing List?
      <div className="w-full flex justify-center items-center mt-4 ">
        <button
          className="actionBtn mx-4"
          onClick={async () => {
            //Todo: Delete Mailing List
            const result = await postCampaigns(MailingListData.id);
            if (result.success) {
              setModal(false);
            }
          }}
        >
          Yes
        </button>
        <button
          className="actionBtn mx-4"
          onClick={() => {
            setModal(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteMailingList;
