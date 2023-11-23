// components/ModalDialog.tsx

import React, { ReactNode } from 'react';
import Modal from 'react-modal';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customStyles: object;
  children: ReactNode;
}

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// Modal.setAppElement('#__next');

const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  onClose,
  customStyles,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel='Example Modal'>
      {children}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ModalDialog;
