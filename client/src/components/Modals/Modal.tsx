import React from 'react';
import * as Unicons from '@iconscout/react-unicons';

interface ModalProps extends JSX.IntrinsicAttributes {
  setModal: React.Dispatch<React.SetStateAction<boolean>>; // Hides the Modal on Clicking close Button
  setShowModal?: React.Dispatch<React.SetStateAction<'HIDDEN' | 'REGISTER' | 'LOGIN'>>; //Change state for Login/Register Modal
  showModal?: string; //showModal State for Login/Register Modal
  Type: () => JSX.Element; //The Modal to be displayed on Button Click.
  Title: any; //The Heading to be shown if Heading prop is Missing.
  Heading?: string; //Heading to be displayed on the Modal.
  createOrUpdate?: 'create' | 'update'; //create or update in campagin or mailing list
}

const Modal = (props: ModalProps) => {
  return (
    <>
      <dialog
        open
        className="fixed inset-0 z-50 bg-white rounded-xl p-4 mx-auto overflow-y-auto max-h-full w-full max-w-lg text-base"
      >
        <div className="flex justify-between">
          <h3 className="text-3xl font-semibold capitalize">{props.Heading || props.Title}</h3>
          <span
            className="cursor-pointer outline-none focus:outline-none hover:scale-125 duration-200 transform"
            onClick={() => {
              if (props.showModal) {
                props.setShowModal!('HIDDEN');
              }
              props.setModal(false);
            }}
          >
            <Unicons.UilTimesCircle />
          </span>
        </div>
        <props.Type {...props} />
      </dialog>
      <div className="opacity-75 fixed inset-0 z-30 bg-black"></div>
    </>
  );
};

export default Modal;
