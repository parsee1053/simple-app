import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function EditModal({ isShow, item, closeEditModal, editItem }) {
  return (
    <Modal
      show={isShow}
      onHide={closeEditModal}
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
              id="EditInputTitle"
              defaultValue={isShow && item.title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>内容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="EditTextareaContent"
              defaultValue={isShow && item.content}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="Button"
          variant="secondary"
          onClick={closeEditModal}
        >
          キャンセル
        </Button>
        <Button
          className="Button"
          variant="primary"
          onClick={editItem}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
