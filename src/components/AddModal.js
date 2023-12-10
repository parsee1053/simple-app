import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export default function AddModal({ isShow, closeAddModal, addItem }) {
  return (
    <Modal show={isShow} onHide={closeAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>項目を追加</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="center-block">
          <FormGroup>
            <ControlLabel>タイトル</ControlLabel>
            <FormControl type="text" id="AddInputTitle" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>内容</ControlLabel>
            <FormControl className="Textarea" componentClass="textarea" id="AddTextareaContent" />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="Button" onClick={closeAddModal}>キャンセル</Button>
        <Button className="Button" bsStyle="primary" onClick={addItem}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
