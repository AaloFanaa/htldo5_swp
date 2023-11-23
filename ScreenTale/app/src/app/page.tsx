'use client';

import Link from 'next/link';
import styles from './page.module.css';
import ModalDialog from './components/modalDialog';
import { useState } from 'react';

export default async function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button onClick={openModal}>Open Modal</button>
      </div>
      <ModalDialog isOpen={modalIsOpen} onClose={closeModal} customStyles={}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </ModalDialog>
    </>
  );
}
