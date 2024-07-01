// MyModal.tsx
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set this to your app's root element

interface MyModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const HistoryModal: React.FC<MyModalProps> = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={customStyles}
    >
      <button onClick={onRequestClose} style={styles.closeButton}>Close</button>
      {children}
    </Modal>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const styles = {
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
  },
};

export default HistoryModal;
