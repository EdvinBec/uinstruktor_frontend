import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="bg-white dark:bg-black p-4 w-max aspect-[2]  absolute z-20 inset-0 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl">
            <div className="flex flex-col space-y-4">{children}</div>
          </div>
          <div className="absolute z-0 w-full h-full top-0 left-0 inset-0 bg-black/60" />
        </>
      )}
    </>
  );
};

export default Modal;
