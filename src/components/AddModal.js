import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function AddModal({ isShow, closeAddModal, addItem }) {
  return (
    <Modal
      show={isShow}
      onHide={closeAddModal}
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
          onClick={closeAddModal}
        >
          キャンセル
        </Button>
        <Button
          className="Button"
          variant="primary"
          onClick={addItem}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
