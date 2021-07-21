import { useState } from 'react';
import { Modal } from './';

interface ActionButtonProps {
  Type: any; //The Modal to be displayed on Button Click.
  Title: any; //The Label of the button to be shown.
  className?: string; //className for the Button to display.
  Heading?: string; //Heading to be displayed on the Modal.

  //Register/Login Modal Only
  showModal?: string; //showModal state for Login/Register Modals.
  setShowModal?: React.Dispatch<React.SetStateAction<'HIDDEN' | 'REGISTER' | 'LOGIN'>>; //Change state for Login/RegisterModal

  //Edit Mailing List/Campaign
  MailingListData?: any;
  CampaignData?: any;

  // to delete/edit Campaign/Keys/Mailing List
  payload?: any;
  toDo?: string;
  apiCall?: (payload?: any) => Promise<any>;

  //update Data without reloading page
  updateData?: () => {};
}

const ActionButton = (props: ActionButtonProps) => {
  const [modal, setModal] = useState(false); //Displays and Hides the Modal Background

  return (
    <>
      <div
        className={
          props.className
            ? props.className
            : 'w-max rounded-full m-4 p-4 bg-primary cursor-pointer flex items-center justify-center '
        }
        onClick={() => setModal(true)}
      >
        {props.Title}
      </div>
      {modal ? (
        <div className={modal ? 'modal fixed z-50' : 'hidden'}>
          <Modal setModal={setModal} {...props} />
        </div>
      ) : null}
    </>
  );
};

export default ActionButton;
