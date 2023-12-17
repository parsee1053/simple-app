import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppNavbar({ showAddModal, startSearch, search, endSearch }) {
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
              onClick={showAddModal}
            >
              <i className="fas fa-plus me-2"></i>
              追加
            </Button>
          </Nav>
          <Form>
            <Form.Control
              type="text"
              placeholder="検索"
              onFocus={startSearch}
              onChange={search}
              onBlur={endSearch}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
