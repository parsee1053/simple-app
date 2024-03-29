import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface AddModalProps {
  isShow: boolean
  handleCloseAddModal: () => void
  handleAddItem: () => void
}

export default function AddModal({ isShow, handleCloseAddModal, handleAddItem }: AddModalProps) {
  return (
    <Modal
      show={isShow}
      onHide={handleCloseAddModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>項目を追加</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              id="AddInputTitle"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>内容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="AddTextareaContent"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="Button"
          variant="secondary"
          onClick={handleCloseAddModal}
        >
          キャンセル
        </Button>
        <Button
          className="Button"
          variant="primary"
          onClick={handleAddItem}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
