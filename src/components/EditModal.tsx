import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import type { Item } from '../types/item';

interface EditModalProps {
  isShow: boolean;
  item: Item;
  handleCloseEditModal: () => void;
  handleEditItem: () => void;
  titleRef: React.RefObject<HTMLInputElement>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
}

export default function EditModal({
  isShow,
  item,
  handleCloseEditModal,
  handleEditItem,
  titleRef,
  contentRef,
}: EditModalProps) {
  return (
    <Modal
      show={isShow}
      onHide={handleCloseEditModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>項目を編集</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              ref={titleRef}
              defaultValue={isShow ? item.title : ""}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>内容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={contentRef}
              defaultValue={isShow ? item.content : ""}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="Button"
          variant="secondary"
          onClick={handleCloseEditModal}
        >
          キャンセル
        </Button>
        <Button
          className="Button"
          variant="primary"
          onClick={handleEditItem}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
