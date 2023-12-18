import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface AppNavbarProps {
  handleShowAddModal: () => void
  handleStartSearch: (e: React.FocusEvent<HTMLInputElement>) => void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEndSearch: () => void
}

export default function AppNavbar({ handleShowAddModal, handleStartSearch, handleSearch, handleEndSearch }: AppNavbarProps) {
  return (
    <Navbar collapseOnSelect sticky="top" className="bg-body-secondary">
      <Container>
        <Navbar.Brand>Simple App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button
              className="Button"
              variant="primary"
              onClick={handleShowAddModal}
            >
              <i className="fas fa-plus me-2"></i>
              追加
            </Button>
          </Nav>
          <Form>
            <Form.Control
              type="text"
              placeholder="検索"
              onFocus={handleStartSearch}
              onChange={handleSearch}
              onBlur={handleEndSearch}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
