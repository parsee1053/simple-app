import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import type { Item } from '../types/item';

interface ItemCardProps {
  item: Item
  handleShowEditModal: () => void
  handleDeleteItem: () => void
}

export default function ItemCard({ item, handleShowEditModal, handleDeleteItem }: ItemCardProps) {
  return (
    <Card className="my-3">
      <Card.Header as="h3">{item.title}</Card.Header>
      <Card.Body className="CardBody">{item.content}</Card.Body>
      <Card.Footer>
        <Button
          className="Button me-2"
          variant="primary"
          onClick={handleShowEditModal}
        >
          <i className="fas fa-edit me-2"></i>
          編集
        </Button>
        <Button
          className="Button"
          variant="danger"
          onClick={handleDeleteItem}
        >
          <i className="fas fa-trash-alt me-2"></i>
          削除
        </Button>
      </Card.Footer>
    </Card>
  );
}
