import React, { useEffect } from 'react';
import '../form-modal/styles.css';
import Form from '../form/form';

const FormModal = ({ title, form, onSubmit, onClose, isOppened }) => {
  useEffect(() => {
    if (!isOppened && onClose) {
      onClose(false);
    }
  }, [isOppened, onClose]);

  const closeModal = () => {
    onClose(false);
  };

  return (
    <div>
      {isOppened && (
        <div className="backdrop" onClick={closeModal}></div>
      )}
      <div className={`form-modal container ${isOppened ? 'd-flex' : 'd-none'}`}>
        <Form title={title} fields={form} onSubmit={onSubmit} toggleModal={closeModal} />
      </div>
    </div>
  );
};

export default FormModal;
