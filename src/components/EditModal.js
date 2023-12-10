import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export default function EditModal({ isShow, item, closeEditModal, editItem }) {
  return (
    <Modal show={isShow} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>項目を編集</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="center-block">
          <FormGroup>
            <ControlLabel>タイトル</ControlLabel>
            <FormControl type="text" id="EditInputTitle" defaultValue={isShow && item.title} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>内容</ControlLabel>
            <FormControl className="Textarea" componentClass="textarea" id="EditTextareaContent" defaultValue={isShow && item.content} />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="Button" onClick={closeEditModal}>キャンセル</Button>
        <Button className="Button" bsStyle="primary" onClick={editItem}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
