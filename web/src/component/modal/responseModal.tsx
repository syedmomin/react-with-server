import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';

function ResponseModal(props: any) {
  const [show, setShow] = useState(props.modalState);
  if (props.modalState) {
    setTimeout(() => {
      setShow(false)
    }, 1500)
  }

  return (
    <>
      <Modal show={show}>
        <Modal.Body className={`bg-${props.status} rounded`}>
          <div className='d-flex flex-column align-items-center '>
            {props.status === "success" ?
              <CheckCircle color="white" size={60} />
              :
              <XCircle color="white" size={60} />
            }
            <h4 className={`text-white`}>{props.response.toUpperCase()}</h4>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ResponseModal;