import React from 'react';
import * as Unicons from '@iconscout/react-unicons';

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>; // Hides the Modal on Clicking close Button
  setShowModal?: React.Dispatch<React.SetStateAction<'HIDDEN' | 'REGISTER' | 'LOGIN'>>; //Change state for Login/Register Modal
  showModal?: string; //showModal State for Login/Register Modal
  Type: any; //The Modal to be displayed on Button Click.
  Title: any; //The Heading to be shown if Heading prop is Missing.
  Heading?: string; //Heading to be displayed on the Modal.
}

const Modal = (props: ModalProps) => {
  return (
    <div>
      <div className="bg-transparent fixed inset-0 flex justify-center z-50 w-screen">
        <div className="z-50 text-base lg:text-lg relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl p-4 mx-4 overflow-y-auto max-h-full w-full max-w-lg ">
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
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-30 bg-black"></div>
    </div>
  );
};

export default Modal;
