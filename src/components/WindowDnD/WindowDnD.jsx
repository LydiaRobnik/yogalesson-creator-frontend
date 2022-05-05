import './windowDnD.scss';
import React from 'react';
import Modal from 'react-modal';

const WindowDnD = ({ show, onClose, asana }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className=""
      overlayClassName={''}
    >
      <div>
        <h1 className="color-blue-darkest"></h1>
      </div>
    </Modal>
  );
};

export default WindowDnD;
