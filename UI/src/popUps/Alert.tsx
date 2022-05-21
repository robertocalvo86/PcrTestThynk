import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { setNotification } from '../service/IdentityUsers';

const Alert = () => {

  const notification = useSelector(state => state.notification);
  const __dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }
  const closeAndClear = () => {
    toggleModal();
    setNotification(__dispatch);
  }

  const arrayEmpty = notification.length === 0;

  useEffect(() => {
    if (!arrayEmpty)
      toggleModal();
    //eslint-disable-next-line
  }, [notification]);


  return (

    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalBody>
        <Label className={`text-${notification[0]}`} style={{ fontSize: 'medium' }}>
          <strong> {!arrayEmpty && notification[1].map(n => (
          <div key={n.code}>{
          n.description 
          }
            </div>))}</strong>
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button color={notification[0]} onClick={closeAndClear}>OK</Button>
      </ModalFooter>
    </Modal>
  );
}

export default Alert;