import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';

function ResponseModal(props: any) {
  const [show, setShow] = useState(props.modalState);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{props.status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column align-items-center'>
            {props.status === "success" ?
              < CheckCircle color="green" size={60} />
              :
              <XCircle color="red" size={60} />
            }
            <h3 className={`text-${props.status}`}>{props.response}</h3>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ResponseModal;