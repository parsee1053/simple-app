import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ItemCard({ item, showEditModal, deleteItem }) {
  return (
    <Card className="my-3">
      <Card.Header as="h3">{item.title}</Card.Header>
      <Card.Body className="CardBody">{item.content}</Card.Body>
      <Card.Footer>
        <Button
          className="Button me-2"
          variant="primary"
          onClick={showEditModal}
        >
          <i className="fas fa-edit me-2"></i>
          編集
        </Button>
        <Button
          className="Button"
          variant="danger"
          onClick={deleteItem}
        >
          <i className="fas fa-trash-alt me-2"></i>
          削除
        </Button>
      </Card.Footer>
    </Card>
  );
}
